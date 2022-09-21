
import EditRave from '../components/EditRave'
import FocusLayout from '../components/FocusLayout'



export default function Edit({data}) {
  return (
    <>
      <EditRave/>
    </>
  )
}



Edit.getLayout = function getLayout(page) {
  return (
    <FocusLayout>{page}</FocusLayout>
  )
}

