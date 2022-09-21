
import { useEffect, useId, useState } from 'react';
import { EDITOR_JS_TOOLS } from './Editor/tools'

import { createReactEditorJS } from 'react-editor-js'
const ReactEditorJS = createReactEditorJS()



export default function Editor({data,setData}) {
  const defaultValue = JSON.parse(data)
  
  
  return (
    <>
      <ReactEditorJS defaultValue={defaultValue} autofocus={true} tools={EDITOR_JS_TOOLS} placeholder="Tell us the awesome things about the awesome thing" />
    </>
  )
}
