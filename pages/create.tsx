import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { createClient } from "@supabase/supabase-js";



const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // set Supabase JWT on the client object, 
  // so it is sent up with all Supabase requests
  // supabase.auth.setAuth(supabaseAccessToken);
  const { user, error } = supabase.auth.setAuth(supabaseAccessToken)

  return supabase;
};




export const getServerSideProps = withServerSideAuth(async ({ req, resolvedUrl }) => {
  const supabaseAccessToken = await req.auth.getToken({
    template: "supabase",
  });
  const supabase = await supabaseClient(supabaseAccessToken);
  const { sessionId } = req.auth;
  console.log("req.auth")
  console.log(req.auth.userId)

  if (!sessionId) {
    return { redirect: { destination: "/sign-in?redirect_url=" + resolvedUrl } };
  }

  var rave = await supabase.from("rave").insert([
    { status:'draft',author_id: req.auth.userId },
    ]);
 
    console.log(rave)

  return {
    redirect: {
      permanent: false,
      destination: "rave/" + rave.data[0].id + "/edit",
    }
  }
});

export default function Create() {}