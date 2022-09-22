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



export default function Editor({ data,saveForm }) {
  const { session } = useSession();
  const [initial_data, setInitialData] = useState()

  const editorCore = React.useRef(null)

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const handleChange = React.useCallback(async () => {
    console.log("handleChange")
    const savedData = await editorCore.current.save();
    
    console.log("savedData")
    console.log(savedData)

    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    
    const response = await supabase
      .from("rave")
      .update({ review: JSON.stringify(savedData), author_id: session.user.id }).match({ id: 6 });

    console.log("update response",response.body[0].review)
    
  }, [])

 useEffect(() => {
    
  const loadData = async () => {
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);

    var rave = await supabase.from("rave").select().eq('id', 6);
    rave = rave.data[0]
    setInitialData(JSON.parse(rave.review))
    

  }


  
   

  //load data on page load

    loadData()
 },[])


  // try {
  //     initial_data=JSON.parse(initial_data);
  // } catch (e) {
  //     initial_data={}
  // }


  

  return (
    <>
      {initial_data&&<ReactEditorJS defaultValue={initial_data} onInitialize={handleInitialize} autofocus={true} onChange={handleChange} tools={EDITOR_JS_TOOLS} placeholder="Tell us the awesome things about the awesome thing" />}
    </>
  )
}
