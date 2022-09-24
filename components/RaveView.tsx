import Link from 'next/link'
import Blocks from 'editorjs-blocks-react-renderer';
import { Card } from './Card'

export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}


export default function RaveView({ rave }) {
  try{
    JSON.parse(rave.review)
    
        
  }catch{
    rave.review = JSON.stringify({
      version: "2.11.10",
      blocks: [
        {
          type: "paragraph",
          data: {
            text: rave.review
          }
        }
      ],
    })
  }
  return (



    <div className='font-serif'>

      <h1 className='text-4xl mb-12 '>{rave.title}</h1>


    {/* <Card.Eyebrow as="time" dateTime={rave.created_at} decorate>
      {formatDate(rave.created_at.split('T')[0])}
    </Card.Eyebrow> */}
    
      <Blocks data={JSON.parse(rave.review)} />
    </div>
        
  )
}