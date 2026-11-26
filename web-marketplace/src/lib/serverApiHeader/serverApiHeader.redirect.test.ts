// @vitest-environment node
import { createServer, IncomingHttpHeaders, Server } from 'http';
import { AddressInfo } from 'net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import {
  SERVER_REQUEST_HEADER,
  withServerRequestHeader,
} from './serverApiHeader.utils';

// Runs the wrapper over Node's real fetch, with two local servers on different
// origins: "api" (gets the header) and "other" (must never get it).
describe('withServerRequestHeader over Node fetch', () => {
  const SECRET = 'redirect-test-secret';
  const received: Record<string, IncomingHttpHeaders[]> = {
    api: [],
    other: [],
  };
  let api: Server;
  let other: Server;
  let apiUrl: string;
  let otherUrl: string;

  const listen = (server: Server) =>
    new Promise<string>(resolve =>
      server.listen(0, '127.0.0.1', () =>
        resolve(`http://127.0.0.1:${(server.address() as AddressInfo).port}`),
      ),
    );

  beforeAll(async () => {
    other = createServer((req, res) => {
      received.other.push(req.headers);
      res.end('other');
    });
    otherUrl = await listen(other);
    api = createServer((req, res) => {
      received.api.push(req.headers);
      if (req.url === '/to-other') {
        res.writeHead(302, { location: `${otherUrl}/collect` });
      } else if (req.url === '/to-same') {
        res.writeHead(308, { location: '/final' });
      }
      res.end('api');
    });
    apiUrl = await listen(api);
  });

  afterAll(async () => {
    await Promise.all(
      [api, other].map(s => new Promise(resolve => s.close(resolve))),
    );
  });

  const wrapped = () =>
    withServerRequestHeader(fetch, { apiUri: apiUrl, secret: SECRET });

  it('does not send the header to another origin through a redirect', async () => {
    received.api.length = 0;
    received.other.length = 0;
    const res = await wrapped()(`${apiUrl}/to-other`);
    expect(res.status).toBe(302);
    expect(received.api[0][SERVER_REQUEST_HEADER]).toBe(SECRET);
    expect(received.other).toHaveLength(0);
  });

  it('follows a same-origin redirect with the header', async () => {
    received.api.length = 0;
    const res = await wrapped()(`${apiUrl}/to-same`);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('api');
    expect(received.api).toHaveLength(2);
    expect(received.api[1][SERVER_REQUEST_HEADER]).toBe(SECRET);
  });
});
