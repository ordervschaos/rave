import { useEffect, useState } from 'react'
import { useSession } from "@clerk/nextjs";
import Layout from '../components/Layout'
import { createClient } from "@supabase/supabase-js";
import RaveCard from '../components/RaveCard';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


export default function Home({userButton}) {
  const [allRaves, setAllRaves] = useState([]);

  const loadAllRaves = async () => {
    
    var all_raves = await supabase.from("rave").select().eq('status','published').order('created_at', { ascending: false });
    all_raves = all_raves.data
    setAllRaves(all_raves)
  }

  useEffect(() => {
    loadAllRaves()
  }, [])


  return (
    <Layout user_id={null} userButton={userButton}>
      <div className="mt-6 flow-root">
        <ul role="list" className="divide-y divide-gray-200 px-5 w-1/2">
          {allRaves && allRaves.map((rave) => (
            <RaveCard key={rave.id} rave={rave} />
          ))}
        </ul>
      </div>
    </Layout>
  )
}

