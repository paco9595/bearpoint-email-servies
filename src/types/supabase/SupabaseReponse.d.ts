import { PostgrestError } from "@supabase/supabase-js";

export interface SupabaseResponse<T> {
    error: PostgrestError | null,
    data: T[] | null
}