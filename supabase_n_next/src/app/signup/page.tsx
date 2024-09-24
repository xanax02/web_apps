"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function () {
  const [creds, setCreds] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: creds.email,
        password: creds.password,
      });

      if (data) console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto w-[400px]">
      <div className="grid">
        <label>Email</label>
        <input
          className="text-black"
          type="text"
          name="email"
          value={creds?.email}
          onChange={(event) =>
            setCreds((prevData) => ({ ...prevData, email: event.target.value }))
          }
        />
      </div>
      <div className="grid">
        <label>Password</label>
        <input
          className="text-black"
          type="password"
          name="password"
          value={creds?.password}
          onChange={(event) =>
            setCreds((prevData) => ({
              ...prevData,
              password: event.target.value,
            }))
          }
        />
      </div>
      <button
        className="bg-violet-600 px-2 py-1 rounded-md my-2"
        onClick={login}
      >
        Login
      </button>

      <div>
        <p>
          already have an account?{" "}
          <span>
            <a className="text-violet-300" href="/login">
              login
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}
