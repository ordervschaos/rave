import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useId, useState } from 'react';
import { EDITOR_JS_TOOLS } from './Editor/tools'
import {supabaseClient} from '../utils/supabaseClient'
import { createReactEditorJS } from 'react-editor-js'// documentation at: https://github.com/Jungwoo-An/react-editor-js
import React from 'react';
const ReactEditorJS = createReactEditorJS()



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
      const supabase_client= await supabaseClient(session) 

      await supabase_client
        .from("rave")
        .update({ review: JSON.stringify(savedData), author_id: session.user.id }).match({ id: post.id });
    }


  }, [session,post.id])
  



  

  return (
    <>
      <ReactEditorJS defaultValue={JSON.parse(review_data)} onInitialize={handleInitialize}  onChange={saveReview} tools={EDITOR_JS_TOOLS} placeholder="Tell us the awesome things about the awesome thing" />
    </>
  )
}
// 