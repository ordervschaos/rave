
import EditRave from '../../../components/EditRave'
import FocusLayout from '../../../components/FocusLayout'

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);




export default function Edit({post}) {
  return (
    <>
      <EditRave post={post}/>
    </>
  )
}



Edit.getLayout = function getLayout(page) {
  return (
    <FocusLayout>{page}</FocusLayout>
  )
}


export async function getServerSideProps({ params }) {
  // Call an external API endpoint to get posts
  var post = await supabase.from("rave").select().eq('id', params.id);
  post = post.data[0]

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      post,
    },
  }
}
