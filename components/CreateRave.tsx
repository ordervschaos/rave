import { useSession } from "@clerk/nextjs";
import { useState } from 'react'
import { createClient } from "@supabase/supabase-js";


import SuggestiveDropdown from "./SuggestiveDropdown";

const rave_types = [
  { id: 1, name: 'Video' },
  { id: 2, name: 'Movie' },
  { id: 3, name: 'Book' },
  // More users...
]
const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  console.log(supabase)

  // set Supabase JWT on the client object, 
  // so it is sent up with all Supabase requests
  // supabase.auth.setAuth(supabaseAccessToken);
  const { user, error } = supabase.auth.setAuth(supabaseAccessToken)

  return supabase;
};



export default function AddRaveForm() {
  const { session } = useSession();

  const [newRaveItem, setNewRaveItem] = useState("test");
  const [newRaveReview, setNewRaveReview] = useState("test");
  const [newRaveLink, setNewRaveLink] = useState("test");
  const [selectedType, setSelectedType] = useState('Book')


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newRaveItem === "" || newRaveReview === "") {
      return;
    }

    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    const response = await supabase
      .from("rave")
      .insert({ item: newRaveItem, review: newRaveReview,type:selectedType,link:newRaveLink, author_id: session.user.id });

    // setRaves([...raves, data[0]]);
    setNewRaveItem("test");
    setNewRaveReview("test");
  };

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <form onSubmit={handleSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                    I found something to rave about
                  </label>
                  <SuggestiveDropdown rave_types={rave_types} selectedType={selectedType} setSelectedType={setSelectedType} />
                </div>
              </div>
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Called 
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="company-website"
                        id="company-website"
                        className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="www.example.com"
                        onChange={(e) => setNewRaveItem(e.target.value)} value={newRaveItem}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  Why do I love it?
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                    onChange={(e) => setNewRaveReview(e.target.value)} value={newRaveReview}
                  />
                </div>
               
               
              </div>
              <div className="col-span-3 sm:col-span-2">
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
                    onChange={(e) => setNewRaveLink(e.target.value)} value={newRaveLink}
                  />
                </div>
              </div>
              <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}