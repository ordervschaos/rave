
import { useEffect, useId, useState } from 'react';
import { EDITOR_JS_TOOLS } from './Editor/tools'

import { createReactEditorJS } from 'react-editor-js'// documentation at: https://github.com/Jungwoo-An/react-editor-js
import React from 'react';
const ReactEditorJS = createReactEditorJS()



export default function Editor({ data,saveForm }) {


  const editorCore = React.useRef(null)

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const handleSave = React.useCallback(async () => {
    const savedData = await editorCore.current.save();
    saveForm(savedData)
    
  }, [])

  console.log("data----",data)
  return (
    <>
      <ReactEditorJS defaultValue={JSON.parse(data)} onInitialize={handleInitialize} autofocus={true} onChange={handleSave} tools={EDITOR_JS_TOOLS} placeholder="Tell us the awesome things about the awesome thing" />
    </>
  )
}
