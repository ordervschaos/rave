import Link from 'next/link'
import Blocks from 'editorjs-blocks-react-renderer';
import { Card } from './Card'
import BoookmarkButton from './BookmarkButton';
import ThumbsupButton from './ThumbsupButton';

export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    // year: 'numeric',
    timeZone: 'UTC',
  })
}


export default function RaveCard({ post }) {
  try{
    var review=JSON.parse(post.review)
    review.blocks=review.blocks.filter((block) => block.type == 'paragraph')
    post.review=JSON.stringify(review)
        
  }catch{
    post.review = JSON.stringify({
      version: "2.11.10",
      blocks: [
        {
          type: "paragraph",
          data: {
            text: post.review
          }
        }
      ],
    })
  }
  return (

    <div>
      <Link href={"/rave/"+post.id  } className="sm:flex py-8 " key={post.id} >
  
        <Card as="article" className="cursor-pointer py-8">
            
        {post.author&&
          <div className="flex w-full items-center space-x-6 pb-3">
            <div className=''>
              <div className="text-base font-medium">
                <img className="inline-block h-5 w-5 rounded-full" src={post.author.profile_image_url} alt="profile_pic" />
                <span className="text-gray-800 font-light text-xs ml-2">{post.author.first_name} {post.author.last_name}</span>
              </div>
            </div>
            <div className=''>
              <dt className="sr-only">Published on</dt>
              
              <dd className="text-base text-xs text-gray-300 font-light"> <div className='text-gray-300  inline-block'>・</div>{formatDate(post.created_at.split('T')[0])}</dd>
            </div>
          </div>
        }
          <Card.Title href={`/rave/${post.id}`}>
            {post.title}
          </Card.Title>
          
          {/* <Card.Eyebrow as="time" dateTime={post.created_at} decorate>
            {formatDate(post.created_at.split('T')[0])}
          </Card.Eyebrow> */}
          <Card.Description>            
            <Blocks data={JSON.parse(post.review)} />
          </Card.Description>
        </Card>
      </Link>
        <BoookmarkButton post_id={post.id}/>
    </div>

  )
}