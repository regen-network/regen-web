import { toBase64 } from '@cosmjs/encoding';
import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('http://localhost:5000/ledger', async ({ request }) => {
    const reader = request.body?.getReader();
    const result = await reader?.read();
    if (result) {
      var strValue = new TextDecoder().decode(result.value);
      const jsonValue = JSON.parse(strValue);
      const path = jsonValue?.params?.path;

      if (path === '/regen.ecocredit.v1.Query/Projects') {
        const response: QueryProjectsResponse = {
          $type: 'regen.ecocredit.v1.QueryProjectsResponse',
          projects: [
            {
              $type: 'regen.ecocredit.v1.ProjectInfo',
              admin: 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
              classId: 'C01',
              id: 'C01-001',
              jurisdiction: 'US',
              metadata:
                'regen:13toVg16x35KSZVhtWLQqaPkhaopb66FtjYi5UzUgRHCujU2fKKMruj.rdf',
              referenceId: '',
            },
          ],
        };

        return HttpResponse.json(
          {
            id: jsonValue?.id,
            jsonrpc: '2.0',
            result: {
              response: {
                value: toBase64(
                  QueryProjectsResponse.encode(response).finish(),
                ),
              },
            },
          },
          { status: 200 },
        );
      }
    }
  }),
];
