import Link from 'next/link'
import Blocks from 'editorjs-blocks-react-renderer';
import {
  PencilSquareIcon,
} from '@heroicons/react/24/outline'

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
      <Link href={"/rave/"+rave.id+"/edit"  } className="sm:flex py-8 " key={rave.id} >
        <PencilSquareIcon
          className='float-right text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'
          aria-hidden="true"
        />
        </Link>
      <h1 className='text-4xl mb-12 '>{rave.title}</h1>


    {/* <Card.Eyebrow as="time" dateTime={rave.created_at} decorate>
      {formatDate(rave.created_at.split('T')[0])}
    </Card.Eyebrow> */}
    
      <Blocks data={JSON.parse(rave.review)} />
    </div>
        
  )
}