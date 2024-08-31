import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code !== null) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
    const { data } = await supabase.from('project').select('id')
    if(data?.length) {
      return NextResponse.redirect(`${requestUrl.origin}/dashboard/${data && data[0] ? data[0].id : ''}`)
    } else {
      return NextResponse.redirect(`${requestUrl.origin}/dashboard/createNewProject`)  
    }
  }
  return NextResponse.error()
}