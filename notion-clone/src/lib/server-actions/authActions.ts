"use server";

import { z } from "zod";
import { FormSchema } from "../types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const response = await supabase.auth.signInWithPassword({ email, password });

  return response;
}

export async function actionSignupUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });

  const { data } = await supabase
    .from("profile")
    .select("*")
    .eq("email", email);

  if (data?.length) return { error: { message: "User already exist", data } };

  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  });

  return response;
}
