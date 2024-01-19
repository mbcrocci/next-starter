// app/api/signup/route.ts
import { auth } from "@/server/auth";
import * as context from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { z } from "zod";

const signupSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirm_password: z.string().min(8),
});

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const res = signupSchema.safeParse({
    first_name: formData.get("first_name")! as string,
    last_name: formData.get("last_name")! as string,
    email: formData.get("email")! as string,
    password: formData.get("password")! as string,
    confirm_password: formData.get("confirm_password")! as string,
  });

  if (!res.success) {
    console.error(res.error);
    console.error(formData);
    return NextResponse.json(
      {
        error: "Invalid username",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const user = await auth.createUser({
      key: {
        providerId: "email", // auth method
        providerUserId: res.data.email, // unique id when using "username" auth method
        password: res.data.password, // hashed by Lucia
      },
      attributes: {
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        email: res.data.email,
      },
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/", // redirect to profile page
      },
    });
  } catch (e) {
    console.error(e);
    // this part depends on the database you're using
    // check for unique constraint error in user table
    // if (
    //   e instanceof SomeDatabaseError &&
    //   e.message === USER_TABLE_UNIQUE_CONSTRAINT_ERROR
    // ) {
    //   return NextResponse.json(
    //     {
    //       error: "Username already taken",
    //     },
    //     {
    //       status: 400,
    //     },
    //   );
    // }

    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      {
        status: 500,
      },
    );
  }
};
