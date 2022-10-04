import { HandThumbUpIcon } from '@heroicons/react/20/solid'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import {supabaseClient} from '../utils/supabaseClient'
import { useEffect, useState } from 'react';







export default function LikeButton({post_id}) {
  const { session } = useSession();
  
  
  const addLike =  async function(){
    setIsLiked(true)
    const supabase_client= await supabaseClient(session) 

    await supabase_client.from("like").insert([
    { post_id:post_id,user_id: session.user.id },
    ]);

  }

  const removeLike =  async function(){
    setIsLiked(false)
    const supabase_client= await supabaseClient(session)
    await supabase_client.from("like").delete().match({ post_id:post_id,user_id: session.user.id });
  }
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState();
  useEffect(() => {
    const fetchLike = async () => {
      const supabase_client=await  supabaseClient(session)
      const { data, error } = await supabase_client
        .from("like")
        .select("*")
        .match({ post_id:post_id,user_id: session.user.id });
      console.log('data')
      console.log(data)
      if(data.length>0){
        setIsLiked(true)
      }
    };
    const countLikes = async () => {
      const supabase_client=await  supabaseClient(session)
      const { data, count } = await supabase_client
        .from("like")
        .select("*",{ count: 'estimated' })
        .match({ post_id:post_id});
      // console.log('data')
      // console.log(data)
      if(count>0)
        setLikeCount(count)
    };
    countLikes()
    fetchLike();
  }, []);

    

  return (

      <button
        type="button"
        className="relative inline-flex items-center rounded  bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10"
      >
        <HandThumbUpIcon onClick={isLiked?removeLike:addLike} className= {`-ml-1 mr-2 h-5 w-5 ${isLiked?"text-pink-400":"text-gray-400"}`} aria-hidden="true" />
      {likeCount}
      </button>
     

  )
}