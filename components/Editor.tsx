
import EditorJS from '@editorjs/editorjs';
import SimpleImage from '@editorjs/simple-image';
import { useEffect, useId, useState } from 'react';




export default function Editor({data,setData}) {
  const id = useId();
  const [editor, setEditor] = useState<EditorJS | null>(null);
  useEffect(() => {
    setEditor((prevEditor) => {
      if (!prevEditor) {
        return new EditorJS({
          holder: id,
          autofocus: true,
          // placeholder: 'Tell us why you love it!',
          tools: {
            image: SimpleImage
          },
          data:JSON.parse(data)
          
        });
      }

     

      return null;
    });
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (editor) {
      editor.isReady.then(() => {

        editor.save().then((outputData) => {
          setData(JSON.stringify(outputData))
          console.log('Article data: ', outputData);
        });
      });
    }
  }, [editor]);
  
  return (
    <>
      <div className='placeholder-gray-300' id={id}></div>
    </>
  )
}
