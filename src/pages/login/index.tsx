import { type NextPage } from "next";
import { useRouter } from "next/router";
import React, { FormEventHandler, useState } from "react";
import { Layout } from "~/components";
import Image from "next/image";
import { toast } from "react-toastify";

import { signIn } from "next-auth/react";

const Login: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.status === 200) {
      router.push("/");
    }

    if (res?.error) {
      toast.error(res.error);
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-[480px] min-w-[377px] flex-col gap-4 rounded-2xl bg-white py-12 px-8"
      >
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-center text-5xl font-bold">chadGPT</h1>
          <Image
            src="https://i.ibb.co/fnJpP03/chad.png"
            alt="chad"
            height={100}
            width={100}
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="email-address"
            className="text-sm font-medium tracking-wide text-gray-700"
          >
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none"
            placeholder="Email address"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium tracking-wide text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="flex w-full cursor-pointer justify-center  rounded-full bg-[#2e026d] p-3  font-semibold tracking-wide text-gray-100  shadow-lg"
        >
          Sign in
        </button>
      </form>
    </Layout>
  );
};

export default Login;
