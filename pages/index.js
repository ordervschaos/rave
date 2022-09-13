import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import DashboardLayout from '../components/DashboardLayout'
import { useSession } from "@clerk/nextjs";
import { useState } from 'react'
import { createClient } from "@supabase/supabase-js";

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


export default function Home() {
  return (
    <div>
      {/* <DashboardLayout/> */}
        
      <AddRaveForm />
    </div>
    
  )
}



function AddRaveForm() {
  const { session } = useSession();
  console.log("session: --> ",session);
    console.log("session.user.id: --> ",session.user.id);
  const [newRaveItem, setNewRaveItem] = useState("test");
  const [newRaveReview, setNewRaveReview] = useState("test");
  const handleSubmit = async (e) => {
    console.log("clicked")
    e.preventDefault();
    if (newRaveItem === "" || newRaveReview === "") {
      console.log("empty");
      return;
    }

    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    const response= await supabase
      .from("rave")
      .insert({ item: newRaveItem,review:newRaveReview, author_id: session.user.id });
      
    // setRaves([...raves, data[0]]);
    setNewRaveItem("test");
    setNewRaveReview("test");
  };

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
            <p className="mt-1 text-sm text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

            <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Item
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                          type
                        </span>
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
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Review
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
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                    Add
                  </button>
                  </div>
              
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}