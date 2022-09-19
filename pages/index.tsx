import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CreateRave from '../components/CreateRave'
import Sidebar from '../components/FocusLayout'
import Layout from '../components/Layout'



export default function Home() {
  return (
    <>Hello</>
  )
}



Home.getLayout = function getLayout(page) {
  return (
    <Layout>{page}</Layout>
  )
}
