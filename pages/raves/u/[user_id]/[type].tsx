import { useEffect, useState } from 'react'
import { useSession } from "@clerk/nextjs";
import Layout from '../../../../components/Layout'
import { createClient } from "@supabase/supabase-js";
import RaveCard from '../../../../components/RaveCard';
import _ from 'lodash'
import FilterMenu from '../../../../components/FilterMenu';
import TabMenu from '../../../../components/TabMenu';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);




export default function Home({params,user,posts}) {

  const [selectedTags, setSelectedTags] = useState([]);
  const [postsList, setPostsList] = useState(posts);
  const tags=_.uniq(_.map(_.flatten(posts.map((post)=>post.tags)),(tag)=>tag.value))
  
  useEffect(()=>{
    if(selectedTags.length>0){
      setPostsList(posts.filter((post)=>_.map(post.tags,'value').some((tag)=>selectedTags.includes(tag))))
    }else{
      setPostsList(posts)
    }
  },[selectedTags])

  return (
    <Layout user={user}>
      <h2 className='mt-12 font-extrabold text-4xl'>{user.firstName} {user.lastName}</h2>
      <div className="mt-6 max-w-3xl flow-root">
      <TabMenu selectedTab={params.type}/>
      <FilterMenu tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <ul role="list" className="px-5">
          {postsList && postsList.map((rave) => (
            <RaveCard key={rave.id} post={rave} />
          ))}
        </ul>
      </div>
    </Layout>
  )
}


export async function getServerSideProps({ params }) {
  console.log(params)
  var posts = await supabase.from("rave").select('*').eq('type->>value',params.type).match({status:'published',author_id:params.user_id}).order('created_at', { ascending: false });
  console.log(params)
  console.log(posts)
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
      user:user,
      params
    },
  }
}