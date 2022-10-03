import {supabaseServerSide} from "../utils/supabaseClient";
import { withServerSideAuth } from "@clerk/nextjs/ssr";
import RaveCard from "../components/RaveCard";
import Layout from "../components/Layout";


export default function userBookmarks({ user,posts }) {
  return (
    <Layout user={user}>
      <h2 className='font-extrabold text-4xl'>Bookmarks</h2>

      {posts.map((post) => (
        <RaveCard key={post.id} post={post} />

      ))}
    </Layout>
  );
}



export const getServerSideProps = withServerSideAuth(async ({ req, resolvedUrl }) => {
  const supabase = await supabaseServerSide(req.auth);

  var bookmarks= await supabase.from("bookmark").select().match({
    user_id: req.auth.userId,
  }).order('created_at', { ascending: false });
  bookmarks = bookmarks.data
  

  var posts = await supabase.from("rave").select().match({
    id: bookmarks.map((bookmark) => bookmark.post_id),
  }).order('created_at', { ascending: false });
  console.log("posts-0-0000000=0======")
  console.log(posts)
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
  



  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
})