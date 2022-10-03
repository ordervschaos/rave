import { useEffect, useState } from 'react'
import { useSession } from "@clerk/nextjs";
import Layout from '../components/Layout'
import { createClient } from "@supabase/supabase-js";
import RaveCard from '../components/RaveCard';
import _ from 'lodash'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


export default function Home({userButton,user,posts}) {
 


  return (
    <Layout user={user}>
      <div className="mt-6 flow-root">
        <ul role="list" className="divide-y divide-gray-200 px-5 lg:w-1/2">
          {posts && posts.map((post) => (
            <RaveCard key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  // Call an external API endpoint to get posts
  // var post = await supabase.from("rave").select().eq('id', params.id);
  var posts = await supabase.from("rave").select().eq('status','published').order('created_at', { ascending: false });
  posts = posts.data

  var user_ids=posts.map((post)=>post.author_id)
  var users
  users=await fetch(`https://api.clerk.dev/v1/users?ids=${user_ids.join(',')}`, {
    headers: {
      'Authorization': `Bearer ${process.env.CLERK_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  users = await users.json()
  posts = posts.map((post)=>{
    post.author=_.pick(users.find((user)=>user.id==post.author_id),['first_name','last_name','profile_image_url','username'])
    return post
  })




  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}