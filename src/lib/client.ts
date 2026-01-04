import { treaty } from '@elysiajs/eden';

import type { App } from '../app/api/[[...slugs]]/route';
import { BASE_URL } from './env';

export const client = treaty<App>(BASE_URL).api;
