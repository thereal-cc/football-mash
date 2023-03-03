import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const database = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export default database;