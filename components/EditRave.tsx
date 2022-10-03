import { useSession } from "@clerk/nextjs";
import { useState } from 'react'
import { createClient } from "@supabase/supabase-js";





//import Editor
import dynamic from "next/dynamic";
import FocusMenu from "./FocusMenu";
import Router from "../node_modules/next/router";
const Editor = dynamic(() => import("./Editor"), { ssr: false });
import {supabaseClient} from '../utils/supabaseClient'






export default function EditRave({post,user}) {
  const { session } = useSession();

  const [raveTitle, setRaveTitle] = useState(post.title);


  //function to save title
  const saveTitle =async (post,e) => {
    //update title in supabase  
    setRaveTitle(e.target.value)
  
    const supabase = await supabaseClient(session);
    
    await supabase
      .from("rave")
      .update({ title: e.target.value,author_id: session.user.id }).match({ id: post.id });
    
  }

  
  //function to save title
  const publishPost =async (post) => {
    const supabase = await supabaseClient(session);
    await supabase
      .from("rave")
      .update({ status: 'published',author_id: session.user.id }).match({ id: post.id });

      Router.push(`/rave/${post.id}`)

    
  }


  



  return (
    <div>
      <FocusMenu user={user} handleClick={()=>publishPost(post)} isPublished={post.status=='published'}/>
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
                          onChange={(e)=>saveTitle(post,e)}
                          value={raveTitle}
                        />
                      </div>
                    </div>
                  </div>
                </div>
        

              </div>

              {post&&<Editor post={post}  />}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}