
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return new Response("User not found", { status: 404 })
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .insert([{ id: user.id, email: user.email, full_name: user.user_metadata.full_name }])
      .select()

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ profile }), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})
