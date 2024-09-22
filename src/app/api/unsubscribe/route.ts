import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import Joi from "joi";
import { cookies } from "next/headers";

const paramsValidator = Joi.object({
  id_project: Joi.string().required(),
  email: Joi.string().email().required(),
});

export async function DELETE(req: Request) {
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
      return Response.json({ message: verifyError.message + ' test' }, { status: 500 });
    }

    if (verifyData?.length === 1) {
      console.log(verifyData);
      return Response.json(
        { message: "the email is not subscribe" },
        { status: 400 }
      );
    }
    
    const { error, data } = await supabase
      .from("subscriber")
      .delete().ilike('email', `%${email}%`).eq('id_project', id_project)

    if (error) {
      return Response.json({ message: error.message + ' test 3', id_project, email }, { status: 500 });
    }

    return Response.json(
      { message: "the email unSubscribe successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return Response.json({ error: error.message }, { status: 422 });
    }

    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
