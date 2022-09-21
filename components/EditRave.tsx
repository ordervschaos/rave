import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from 'react'
import { createClient } from "@supabase/supabase-js";





import dynamic from "next/dynamic";
const Editor = dynamic(() => import("./Editor"), { ssr: false });

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




// import EditorJS from '@editorjs/editorjs';


export default function AddRaveForm() {
  const { session } = useSession();

  const [raveTitle, setRaveTitle] = useState("");
  const [newRaveLink, setRaveLink] = useState("test");
  const [selectedType, setSelectedType] = useState('Book')


  var review_data= {
    time: 1552744582955,
    blocks: [
      {
        type: "image",
        data: {
          url: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg"
        }
      },
      {
        type: "paragraph",
        data: {
          text: "This is a simple image"
        }
      }

    ],
    version: "2.11.10"
  }

  

  //TODO:  fetch this from supabase


  const [raveReview, setRaveReview] = useState(JSON.stringify(review_data));
  
  // const loadData= async () => {
  //   const supabaseAccessToken = await session.getToken({
  //     template: "supabase",
  //   });
  //   const supabase = await supabaseClient(supabaseAccessToken);

  //   var rave = await supabase.from("rave").select().eq('id', 6);
  //   console.log(rave)
  //   rave=rave.data[0]

  //     setRaveTitle(rave.title)
  //     setRaveReview(rave.review)

  // }
  
  // useEffect(() => {
  //   loadData()
  // }, [])

  const saveForm = async (reviewData) => {
    // e.preventDefault();
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    console.log(reviewData)
    const response = await supabase
      .from("rave")
      .update({ item: raveTitle, review: JSON.stringify(reviewData), type: selectedType, link: newRaveLink, author_id: session.user.id }).match({id: 6});
      
    console.log("update response")
    console.log(response)

  
  };

  return (
    <div className="content-center	">

      <div className="md:grid md:grid-cols-1 md:gap-6 mx-auto	lg:w-[52rem]">
        <form onSubmit={saveForm} className="pl-2">

          <div className="sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {/* <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                    I found something to rave about
                  </label>
                  <SuggestiveDropdown rave_types={rave_types} selectedType={selectedType} setSelectedType={setSelectedType} />
                </div>
              </div>
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

              </div> */}

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
                        onChange={(e) => setRaveTitle(e.target.value)}
                         value={raveTitle}
                      />
                    </div>
                  </div>
                </div>

                  


                {/* <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                    onChange={(e) => setRaveReview(e.target.value)} value={raveReview}
                  />
                </div> */}


              </div>
              {/* <div className="col-span-3 sm:col-span-2">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  Link
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                    https://
                  </span>
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="www.example.com"
                    onChange={(e) => setRaveLink(e.target.value)} value={newRaveLink}
                  />
                </div>
              </div> */}
              {/* <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add
              </button> */}
              
            </div>
            
            {raveReview && <Editor data={raveReview} saveForm={saveForm}/>}
            
          </div>
        </form>
      </div>
    </div>
  );
}