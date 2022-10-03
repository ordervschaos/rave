import { createClient } from "@supabase/supabase-js";
import Layout from '../../../components/Layout'
import RaveView from '../../../components/RaveView';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


export default function viewRave({ post,user }) {
  return (
    <Layout user={user}>
      <div className="mt-6 flow-root lg:px-24">
        <ul role="list" className="divide-y divide-gray-200 px-5">
          <RaveView key={post.id} post={post} />
        </ul>
      </div>
    </Layout>
  )
}




export async function getStaticProps({ params }) {
  var post = await supabase.from("rave").select().eq('id', params.id);
  post = post.data[0]
  var user
  user=await fetch(`https://api.clerk.dev/v1/users/${post.author_id}`, {
    headers: {
      'Authorization': `Bearer ${process.env.CLERK_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  user = await user.json()
  post.author=user

  // Pass post data to the page via props
  return { props: { post } }
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  var raves = await supabase.from("rave").select();
  raves = raves.data

  // Get the paths we want to pre-render based on posts
  const paths = raves.map((rave) => ({
    params: { id: rave.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true }
}