import { useEffect, useState } from 'react'

import { useSession } from "@clerk/nextjs";
import Layout from '../../components/Layout'
import { createClient } from "@supabase/supabase-js";
import RaveCard from '../../components/RaveCard';
import _ from 'lodash'
import FilterMenu from '../../components/FilterMenu';
import TabMenu from '../../components/TabMenu';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


export default function Home({user,posts,params}) {
 
  const [selectedTags, setSelectedTags] = useState([]);
  const [postsList, setPostsList] = useState(posts);
  const tags=_.uniq(_.map(_.flatten(posts.map((post)=>post.tags)),(tag)=>tag.value))

  
  useEffect(()=>{
    if(selectedTags.length>0){
      setPostsList(posts.filter((post)=>_.map(post.tags,'value').some((tag)=>selectedTags.includes(tag))))
    }else{
      setPostsList(posts)
    }
  },[selectedTags,posts])

  return (
    <Layout user={user}>
      <div className="mt-6 max-w-3xl flow-root">
      <TabMenu selectedTab={params.type}/>        <FilterMenu tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <ul role="list" className="px-5">
          {postsList && postsList.map((post) => (
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
  var posts_res = await supabase.from("rave").select().eq('type->>value',params.type).eq('status','published').order('created_at', { ascending: false });
  var posts = posts_res.data

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
    post.author=_.pick(users.find((user)=>user.id==post.author_id),['id','first_name','last_name','profile_image_url','username'])
    return post
  })




  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
      params
    },
  }
}