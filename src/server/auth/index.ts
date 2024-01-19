/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { lucia } from "lucia";
import { planetscale } from "@lucia-auth/adapter-mysql";
import { nextjs_future } from "lucia/middleware";
import { connection } from "../db";
import { env } from "@/env";
import { tableName } from "../db/schema";
import * as context from "next/headers";
import { cache } from "react";

export const getSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

export const auth = lucia({
  adapter: planetscale(connection, {
    user: tableName("user"),
    key: tableName("user_key"),
    session: tableName("user_session"),
  }),

  env: env.LUCIA_ENV,
  // gives us a bunch of helper functions
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },

  getUserAttributes: (databaseUser) => {
    return {
      first_name: databaseUser.first_name,
      last_name: databaseUser.last_name,
      email: databaseUser.email,
    };
  },
});
