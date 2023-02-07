import { IS_DEV } from 'lib/env';

const PORT = IS_DEV ? ':3000' : '';
const PROTOCOL = IS_DEV ? 'http://' : 'https://';
export const REGEN_APP_URL = `${PROTOCOL}${window.location.hostname}${PORT}/`;
export const REGEN_APP_PROJECT_URL = REGEN_APP_URL + 'project/';
