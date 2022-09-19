
import EditorJS from '@editorjs/editorjs';
import { useEffect } from 'react';




export default function Editor() {
  useEffect(() => {
    const editor = new EditorJS({
      /**
       * Id of Element that should contain Editor instance
       */
      holder: 'editorjs'
    });
  }, [])
  return (
    <div id="editorjs"/>
  )
}
