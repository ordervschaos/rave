import Layout from '../components/Layout'



export default function Home() {
  return (
    <h1 className='text-4xl'>Hello</h1>
  )
}



Home.getLayout = function getLayout(page) {
  return (
    <Layout>{page}</Layout>
  )
}
