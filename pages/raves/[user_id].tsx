import { useEffect, useState } from 'react'
import { useSession } from "@clerk/nextjs";
import Layout from '../../components/Layout'
import { createClient } from "@supabase/supabase-js";
import RaveCard from '../../components/RaveCard';

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

export default function Home({params}) {
  const { session } = useSession();
  const [allRaves, setAllRaves] = useState([]);
  console.log(session.user)
  const loadAllRaves = async () => {
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);

    var all_raves = await supabase.from("rave").select().match({status:'published',author_id:params.user_id}).order('created_at', { ascending: false });
    all_raves = all_raves.data
    setAllRaves(all_raves)
  }

  useEffect(() => {
    loadAllRaves()
  }, [])


  return (
    <Layout user_id={session.user.id}>
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


export async function getServerSideProps({ params }) {
 

 // Pass post data to the page via props
  return { props: { params } }
}