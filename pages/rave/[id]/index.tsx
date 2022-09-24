import { createClient } from "@supabase/supabase-js";
import Layout from '../../../components/Layout'
import RaveView from '../../../components/RaveView';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


export default function viewRave({ rave }) {
  return (
    <div className="mt-6 flow-root lg:px-24">
      <ul role="list" className="divide-y divide-gray-200 px-5">
        <RaveView key={rave.id} rave={rave} />
      </ul>
    </div>
  )
}



viewRave.getLayout = function getLayout(page) {
  return (
    <Layout>{page}</Layout>
  )
}


export async function getStaticProps({ params }) {
  var rave = await supabase.from("rave").select().eq('id', params.id);
  rave = rave.data[0]

  // Pass post data to the page via props
  return { props: { rave } }
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