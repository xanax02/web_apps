import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// if middleware is created from auth-GraphHelpers-nextjs use same package here to create clientInformation
// it will directly take vars from the .evn file
export const supabase = createClientComponentClient();
