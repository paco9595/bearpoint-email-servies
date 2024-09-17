import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import Joi from "joi";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const paramsValidator = Joi.object({
  id_project: Joi.string().required(),
  email: Joi.string().email().required(),
});

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json()
    console.log({body})
    const {
      error: validationError,
      value: { id_project, email },
    } = paramsValidator.validate(body);
    if (validationError) throw validationError;

    const supabase = createRouteHandlerClient({ cookies });
    console.log({ id_project, email });
    // const { error, data } = await supabase.from("subscriber").insert([
    //   {
    //     id_project: id_project,
    //     email: email
    //   },
    // ]);

    // console.log({ error, data });

    return Response.json({ data: 'success'}, { status: 200 });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return Response.json({ error: error.message }, { status: 422 });
    }

    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
