import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from 'react'
import { createClient } from "@supabase/supabase-js";




//import Editor
import dynamic from "next/dynamic";
import FocusMenu from "./FocusMenu";
const Editor = dynamic(() => import("./Editor"), { ssr: false });

//supabaseClient init
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






export default function EditRave() {
  const { session } = useSession();

  const [raveTitle, setRaveTitle] = useState("");
  const [postData, setPostData] = useState();
  
  
  //function to load data into editor
  const loadData = async () => {
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);

    var rave = await supabase.from("rave").select().eq('id', 6);
    rave = rave.data[0]
    setPostData(rave)
    setRaveTitle(rave.title)
  }


  
   

  //load data on component mount
  useEffect(() => {
    loadData()
  }, [])


  //function to save title
  const saveTitle =async (e) => {
    //update title in supabase  
    setRaveTitle(e.target.value)
  
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    
    await supabase
      .from("rave")
      .update({ title: e.target.value,author_id: session.user.id }).match({ id: 6 });
    
  }

  
  //function to save title
  const publishPost =async (e) => {
    console.log('publishing post')
  
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    
    await supabase
      .from("rave")
      .update({ status: 'published',author_id: session.user.id }).match({ id: 6 });
    
  }


  



  return (
    <div>
      <FocusMenu handleClick={publishPost}/>
      <div className="content-center	">

        <div className="md:grid md:grid-cols-1 md:gap-6 mx-auto	lg:w-[52rem]">
          <div  className="pl-2">

            <div className="sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                <div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">

                      <div className="mt-3">
                        <input
                          type="text"
                          key="raveTitle1"
                          name="raveTitle1"
                          className="block w-full flex-1 border-none focus:border-transparent focus:ring-0 font-serif	text-5xl placeholder-gray-300 ml-[0.5em] lg:ml-20 lg:placeholder:ml-20"
                          placeholder="The awesome thing"
                          onChange={saveTitle}
                          value={raveTitle}
                        />
                      </div>
                    </div>
                  </div>
                </div>
        

              </div>

              {postData&&<Editor data={postData}  />}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}