import Link from 'next/link'
import Blocks from 'editorjs-blocks-react-renderer';


export default function RaveCard({ rave }) {
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



    <Link href={"/rave/"+rave.id  } className="sm:flex py-8" key={rave.id} >
      <div>  
        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
          <svg
            className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
            preserveAspectRatio="none"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path vectorEffect="non-scaling-stroke" strokeWidth={1} d="M0 0l200 200M0 200L200 0" />
          </svg>
        </div>
        <div>
          <h4 className="text-lg font-bold">{rave.title}</h4>
          <p className="mt-1">
            <Blocks data={JSON.parse(rave.review)} />
          </p>
        </div>
      </div>
    </Link>
  )
}