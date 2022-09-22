import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from 'react'
import { createClient } from "@supabase/supabase-js";




//import Editor
import dynamic from "next/dynamic";
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



interface Post {
  title: string;
  review: string;
  link: string;
  type: string;
  author_id: string;

}



export default function EditRave() {
  const { session } = useSession();

  const [raveTitle, setRaveTitle] = useState("1");
  const [raveLink, setRaveLink] = useState("test");
  const [selectedType, setSelectedType] = useState('Book')
  const [raveReview, setRaveReview] = useState();

  var post_data
  //function to load data into editor
  const loadData = async () => {
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);

    var rave = await supabase.from("rave").select().eq('id', 6);
    rave = rave.data[0]
    console.log(rave)
    post_data = rave
    setRaveTitle(rave.title)
    setRaveReview(rave.review)

  }


  
   

  //load data on page load

    loadData()


  const saveForm = async (data) => {
   
    var post:Post = data
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    

    const response = await supabase
      .from("rave")
      .update({ title: raveTitle, review: raveReview, type: selectedType, link: raveLink, author_id: session.user.id }).match({ id: 6 });

    console.log("update response")
    //function 
    console.log(response)


  };
  



  return (
    <div className="content-center	">

      <div className="md:grid md:grid-cols-1 md:gap-6 mx-auto	lg:w-[52rem]">
        <div onSubmit={saveForm} className="pl-2">

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
                        onChange={(e) => {setRaveTitle(e.target.value)}}
                        value={raveTitle}
                      />
                    </div>
                  </div>
                </div>
              </div>
      

            </div>

            {<Editor initial_data={post_data} saveForm={saveForm} />}

          </div>
        </div>
      </div>
    </div>
  );
}