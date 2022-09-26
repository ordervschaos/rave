import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useId, useState } from 'react';
import { EDITOR_JS_TOOLS } from './Editor/tools'

import { createReactEditorJS } from 'react-editor-js'// documentation at: https://github.com/Jungwoo-An/react-editor-js
import React from 'react';
const ReactEditorJS = createReactEditorJS()

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



export default function Editor({ post }) {


  const { session } = useSession();
  const editorCore = React.useRef(null)

  var review_data=post.review

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const saveReview = React.useCallback(async () => {
    const savedData = await editorCore.current.save();
    if(savedData.blocks.length==0){
      return
    }else{
      //update the data in supabase
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken);
      console.log("saved",  post )
      await supabase
        .from("rave")
        .update({ review: JSON.stringify(savedData), author_id: session.user.id }).match({ id: post.id });
    }


  }, [])



  

  return (
    <>
      <ReactEditorJS defaultValue={JSON.parse(review_data)} onInitialize={handleInitialize} autofocus={true} onChange={saveReview} tools={EDITOR_JS_TOOLS} placeholder="Tell us the awesome things about the awesome thing" />
    </>
  )
}
// 