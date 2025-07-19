import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../shared/schema.js';

const client = createClient({
  url: 'file:nexssio.db'
});

export const db = drizzle(client, { schema });