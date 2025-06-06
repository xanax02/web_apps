"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Logo from "../../../../public/cypresslogo.svg";
import { Input } from "../../../components/ui/input";
import Loader from "@/components/global/Loader";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";
import { actionSignupUser } from "@/lib/server-actions/authActions";

const SignupFormSchema = z
  .object({
    email: z.string().describe("Email").email({ message: "Invalid Email" }),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must be minimum 6 characters"),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(6, "Password must be minimum 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesnot match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error_description");
  }, [searchParams]);

  const confimationAndErrorStyles = useMemo(() => {
    return clsx("bg-primary", {
      "bg-red-500/10": codeExchangeError,
      "border-red-500/50": codeExchangeError,
      "text-red-700": codeExchangeError,
    });
  }, [codeExchangeError]);

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignupFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async ({
    email,
    password,
  }: z.infer<typeof SignupFormSchema>) => {
    const { error } = await actionSignupUser({ email, password });
    if (error && error.message) {
      setSubmitError(error.message);
      form.reset();
      return;
    }
    setConfirmation(true);
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      >
        <Link
          href="/"
          className="
          w-full
          flex
          justify-left
          items-center"
        >
          <Image src={Logo} alt="cypress Logo" width={50} height={50} />
          <span
            className="font-semibold
          dark:text-white text-4xl first-letter:ml-2"
          >
            SyncSpace
          </span>
        </Link>
        <FormDescription
          className="
        text-foreground/60"
        >
          An all-In-One Collaboration and Productivity Platform
        </FormDescription>
        {!confirmation && !codeExchangeError && (
          <>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full p-6" disabled={isLoading}>
              {!isLoading ? "Create Account" : <Loader />}
            </Button>
          </>
        )}
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <span className="self-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </span>

        {(confirmation || codeExchangeError) && (
          <>
            <Alert className={confimationAndErrorStyles}>
              {!codeExchangeError && <MailCheck className="h-4 w-4" />}
              <AlertTitle>
                {codeExchangeError ? "Invalid Link" : "Check you email"}
              </AlertTitle>
              <AlertDescription>
                {codeExchangeError || "An email confirmation has been sent"}
              </AlertDescription>
            </Alert>
          </>
        )}
      </form>
    </Form>
  );
};

export default Signup;
