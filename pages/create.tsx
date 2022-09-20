
import CreateRave from '../components/CreateRave'
import FocusLayout from '../components/FocusLayout'



export default function Create() {
  return (
    <>
      <CreateRave/>
    </>
  )
}



Create.getLayout = function getLayout(page) {
  return (
    <FocusLayout>{page}</FocusLayout>
  )
}
