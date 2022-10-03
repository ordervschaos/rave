import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { createClient } from "@supabase/supabase-js";

import { supabaseServerSide } from "../utils/supabaseClient";


export const getServerSideProps = withServerSideAuth(async ({ req, resolvedUrl }) => {
  
  const supabase = await supabaseServerSide(req.auth);
  
  

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