import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const user = {
  name: process.env.NEXT_PUBLIC_ADMIN_NAME,
  email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
};

const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (email !== user.email || password !== user.password)
          throw new Error("invalid credentials");

        return {
          id: crypto.randomUUID(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(options);
