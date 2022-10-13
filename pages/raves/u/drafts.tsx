import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { useEffect, useState } from 'react'
import { useSession } from "@clerk/nextjs";
import Layout from '../../../components/Layout'
import { createClient } from "@supabase/supabase-js";
import RaveCard from '../../../components/RaveCard';
import _ from 'lodash'
import FilterMenu from '../../../components/FilterMenu';
import TabMenu from '../../../components/TabMenu';
import ShareUserRavesButton from '../../../components/ShareUserRavesButton';
import TabPills from '../../../components/TabPills';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);




export default function Home({params,user,posts}) {

  const [selectedTags, setSelectedTags] = useState([]);
  const [postsList, setPostsList] = useState(posts);
  // const tags=_.uniq(_.map(_.flatten(posts.map((post)=>post.tags)),(tag)=>tag.value))
  // useEffect(()=>{
  //   if(selectedTags.length>0){
  //     setPostsList(posts.filter((post)=>_.map(post.tags,'value').some((tag)=>selectedTags.includes(tag))))
  //   }else{
  //     setPostsList(posts)
  //   }
  // },[selectedTags])

  return (
    <Layout user={user}>
      <div className='flex max-w-3xl justify-between items-center'>
        <h2 className='mt-12 font-extrabold text-4xl'>{user.firstName} {user.lastName}</h2>
        <div className='flex-grow'></div>
        <ShareUserRavesButton/>
      </div>
      <div className="mt-6 max-w-3xl flow-root">
        {/* draft raves tab */}
       
        <TabPills user={user}/>

      <FilterMenu tags={[]} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <ul role="list" className="px-5">
          {postsList && postsList.map((rave) => (
            <RaveCard key={rave.id} post={rave} />
          ))}
        </ul>
      </div>
    </Layout>
  )
}





export const getServerSideProps = withServerSideAuth(async ({ req, resolvedUrl }) => {
  const { sessionId } = req.auth;
  console.log("req.auth.user")
  console.log(req.auth)
  var posts_res = await supabase.from("rave").select().match({
    author_id: req.auth.userId,
    status:'draft'
  }).order('created_at', { ascending: false });
  var posts = posts_res.data

  posts=posts.filter((post)=>{
    if(post.title || (post.review&&post.review.length > 0))
      return true
    else
      return false
 
  })

  var user
  user=await fetch(`https://api.clerk.dev/v1/users/${req.auth.userId}`, {
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
    },
  }
});
