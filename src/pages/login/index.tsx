import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Layout } from "~/components";

const Login: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    // Add logic here to authenticate user with email and password
    // Example:
    // const res = await fetch('/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password })
    // });
    // if (res.ok) {
    //   router.push('/dashboard');
    // } else {
    //   setError('Invalid email or password');
    // }
    router.push("/");
  };

  return (
    <Layout>
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <form
          onSubmit={handleSubmit}
          className="flex h-[480px] w-[377px] flex-col gap-4 rounded-2xl bg-white p-12"
        >
          <h1 className="text-center text-5xl font-bold">chadGPT</h1>
          <div className="mt-8">
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
            className="flex w-full cursor-pointer justify-center  rounded-full bg-[#2e026d] p-3  font-semibold tracking-wide text-gray-100  shadow-lg transition duration-500 ease-in hover:bg-green-500"
          >
            Sign in
          </button>
        </form>
      </main>
    </Layout>
  );
};

export default Login;
