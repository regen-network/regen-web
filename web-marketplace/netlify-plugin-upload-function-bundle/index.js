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
        const resJson = await res.json();
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
              method: 'POST',
            },
          },
        );
        offset += chunk.length;
        console.log(res, `uploaded till ${offset}`);
      }
    }

    console.log('all parts done, finishing up');
    const abc = await fetch(
      'https://content.dropboxapi.com/2/files/upload_session/finish',
      {
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
      console.log(abc, abcJson);
    } catch {
      const abcText = await abc.clone().text();
      console.log(abc, abcText);
    }
  },
};
