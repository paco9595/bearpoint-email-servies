import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import Joi from "joi";
import { cookies } from "next/headers";

const paramsValidator = Joi.object({
  id_project: Joi.string().required(),
  email: Joi.string().email().required(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      error: validationError,
      value: { id_project, email },
    } = paramsValidator.validate(body);

    if (validationError) throw validationError;

    const supabase = createRouteHandlerClient({ cookies });

    const { data: verifyData, error: verifyError } = await supabase
      .from("subscriber")
      .select("email")
      .ilike("email", email);

    if (verifyError) {
      return Response.json({ message: verifyError.message }, { status: 500 });
    }

    if (verifyData?.length) {
      console.log(verifyData);
      return Response.json(
        { message: "the email is already subscribe" },
        { status: 400 }
      );
    }

    const { error, data } = await supabase.from("subscriber").insert([
      {
        id_project: id_project,
        email: email,
      },
    ]);

    if (error) {
      return Response.json({ message: error.message }, { status: 500 });
    }

    return Response.json(
      { message: "the email subscribe successfully" },
      { status: 200 }
    );
    
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return Response.json({ error: error.message }, { status: 422 });
    }

    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
