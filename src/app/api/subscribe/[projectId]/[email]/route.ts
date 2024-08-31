import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import Joi from "joi";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const paramsValidator = Joi.object({
  projectId: Joi.string().required(),
  email: Joi.string().email().required()
})

export async function GET(_req: NextRequest, { params }: { params: { projectId: string, email: string } }) {
  try {

    const { error: validationError, value: { projectId, email } } = paramsValidator.validate(params)
    if (validationError) throw validationError

    const supabase = createRouteHandlerClient({ cookies })
    console.log({projectId, email})
    const {error, data: project } = await supabase.from('project').select('*')

    console.log({error, project})

    return Response.json({ project, error }, { status: 200 })

  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return Response.json({ error: error.message }, { status: 422 })
    }

    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }


} 