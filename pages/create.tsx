
import CreateRave from '../components/CreateRave'
import FocusLayout from '../components/FocusLayout'
import dynamic from "next/dynamic";

let ReactEditor = dynamic(() => import('../components/Editor'), {
    ssr: false
});

export default function Create() {
  return (
    <>
      <CreateRave />
      <ReactEditor/>
    </>
  )
}



Create.getLayout = function getLayout(page) {
  return (
    <FocusLayout>{page}</FocusLayout>
  )
}
