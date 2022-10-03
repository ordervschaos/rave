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
      <div className="mt-6 flow-root">
        <br/>
        <br/>
        <br/>

        <h2 className='font-extrabold text-4xl'>{user.firstName} {user.lastName}</h2>
        <br/>
        <div className="flex-grow border-t border-gray-200"></div>
        <ul role="list" className="divide-y divide-gray-200 px-5 w-1/2">
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
