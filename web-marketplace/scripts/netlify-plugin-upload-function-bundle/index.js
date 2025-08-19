const { createReadStream, statSync } = require('node:fs');
const { env } = require('node:process');
const { join } = require('node:path');

module.exports = {
  async onError(meta) {
    const fileStream = createReadStream(
      join(meta.constants.FUNCTIONS_DIST, '___netlify-server-handler.zip'),
      {
        highWaterMark: 149 * 1024 * 1024,
      },
    );
    console.log(
      statSync(
        join(meta.constants.FUNCTIONS_DIST, '___netlify-server-handler.zip'),
      ).size /
        (1024 ^ 2),
    );
    const headers = {
      authorization: `Bearer ${env.DROPBOX}`,
      'content-type': 'application/octet-stream',
    };

    let uploadSessionId = null;
    let offset = 0;

    for await (const chunk of fileStream) {
      if (!uploadSessionId) {
        const res = await fetch(
          'https://content.dropboxapi.com/2/files/upload_session/start',
          {
            body: chunk,
            headers: {
              ...headers,
              'dropbox-api-arg': JSON.stringify({
                close: false,
              }),
            },
            method: 'POST',
          },
        );
        let resJson;
        try {
          resJson = await res.clone().json();
        } catch (e) {
          const resText = await res.text();
          console.error(
            'Failed to parse Dropbox API response as JSON during session start.',
          );
          console.error('Response text:', resText);
          throw new Error(`Dropbox API Error: ${resText}`);
        }

        if (!res.ok) {
          console.error('Dropbox API Error during session start:', resJson);
          throw new Error(
            `Dropbox API Error during session start: ${JSON.stringify(
              resJson,
            )}`,
          );
        }

        console.log(resJson);
        uploadSessionId = resJson.session_id;
        offset += chunk.length;
        console.log('started', uploadSessionId);
      } else {
        console.log('came till here');
        const res = await fetch(
          'https://content.dropboxapi.com/2/files/upload_session/append_v2',
          {
            body: chunk,
            headers: {
              ...headers,
              'dropbox-api-arg': JSON.stringify({
                close: false,
                cursor: {
                  offset,
                  session_id: uploadSessionId,
                },
              }),
            },
            method: 'POST',
          },
        );
        if (!res.ok) {
          try {
            const errorJson = await res.clone().json();
            console.error('Dropbox API Error on append:', errorJson);
            throw new Error(
              `Dropbox API Error on append: ${JSON.stringify(errorJson)}`,
            );
          } catch (e) {
            const errorText = await res.text();
            console.error('Dropbox API Error on append (non-json):', errorText);
            throw new Error(`Dropbox API Error on append: ${errorText}`);
          }
        }
        offset += chunk.length;
        console.log(res, `uploaded till ${offset}`);
      }
    }

    console.log('all parts done, finishing up');
    const abc = await fetch(
      'https://content.dropboxapi.com/2/files/upload_session/finish',
      {
        body: '',
        headers: {
          ...headers,
          'dropbox-api-arg': JSON.stringify({
            commit: {
              autorename: true,
              mode: 'add',
              mute: false,
              path: `/${Date.now()}.zip`,
              strict_conflict: false,
            },
            cursor: {
              offset,
              session_id: uploadSessionId,
            },
          }),
        },
        method: 'POST',
      },
    );
    try {
      const abcJson = await abc.clone().json();
      if (!abc.ok) {
        console.error('Dropbox API Error on finish:', abcJson);
        throw new Error(
          `Dropbox API Error on finish: ${JSON.stringify(abcJson)}`,
        );
      }
      console.log(abc, abcJson);
    } catch {
      const abcText = await abc.clone().text();
      console.error('Dropbox API Error on finish (non-json):', abcText);
      throw new Error(`Dropbox API Error on finish: ${abcText}`);
    }
  },
};
