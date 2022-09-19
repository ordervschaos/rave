
import CreateRave from '../components/CreateRave'
import FocusLayout from '../components/FocusLayout'
import dynamic from "next/dynamic";


import EditorJS from '@editorjs/editorjs';


const editor = new EditorJS({
  /**
   * Id of Element that should contain Editor instance
   */
  holder: 'editorjs'
});

export default function Create() {
  return (
    <>
      <CreateRave />
      <div  className='shadow w-1/2 h-1/2'> 
      <div id="editorjs" />
      </div>
    </>
  )
}



Create.getLayout = function getLayout(page) {
  return (
    <FocusLayout>{page}</FocusLayout>
  )
}
