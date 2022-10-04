import { useEffect, useState } from 'react'
import { useSession } from "@clerk/nextjs";
import Layout from '../../components/Layout'
import { createClient } from "@supabase/supabase-js";
import RaveCard from '../../components/RaveCard';
import _ from 'lodash'


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);




export default function Home({params,user,posts}) {


  return (
    <Layout user={user}>
      <h2 className='mt-12 font-extrabold text-4xl'>{user.firstName} {user.lastName}</h2>
      <div className="mt-6 max-w-3xl flow-root">
        <ul role="list" className="px-5">
          {posts && posts.map((rave) => (
            <RaveCard key={rave.id} post={rave} />
          ))}
        </ul>
      </div>
    </Layout>
  )
}


export async function getServerSideProps({ params }) {
 
  var posts = await supabase.from("rave").select().match({
    author_id: params.user_id,
    status:'published'
  }).order('created_at', { ascending: false });
  posts = posts.data

  var user
  user=await fetch(`https://api.clerk.dev/v1/users/${params.user_id}`, {
    headers: {
      'Authorization': `Bearer ${process.env.CLERK_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  user = await user.json()


  return {
    props: {
      posts,
      user:user
    },
  }
}
