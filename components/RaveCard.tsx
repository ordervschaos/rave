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


export default function RaveCard({ rave }) {
  try{
    var review=JSON.parse(rave.review)
    review.blocks=review.blocks.filter((block) => block.type == 'paragraph')
    rave.review=JSON.stringify(review)
        
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



    <Link href={"/rave/"+rave.id  } className="sm:flex py-8 " key={rave.id} >

      <Card as="article">
        <Card.Title href={`/rave/${rave.id}`}>
          {rave.title}
        </Card.Title>
        
        {/* <Card.Eyebrow as="time" dateTime={rave.created_at} decorate>
          {formatDate(rave.created_at.split('T')[0])}
        </Card.Eyebrow> */}
        <Card.Description>            
          <Blocks data={JSON.parse(rave.review)} />
        </Card.Description>
        <Card.Cta>Read post</Card.Cta>
      </Card>
    </Link>
  )
}