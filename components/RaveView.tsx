import Link from 'next/link'
import { useSession } from "@clerk/nextjs";
import Blocks from 'editorjs-blocks-react-renderer';
import {
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import BoookmarkButton from './BookmarkButton';
import LikeButton from './LikeButton';

export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}


export default function RaveView({ post }) {
  const {session} = useSession()
  try{
    JSON.parse(post.review)
    
        
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



    <div className='font-serif'>
      <div className="flex w-full items-center space-x-6 pb-3">
        
    
        <div className=''>
          <div className="text-base font-medium">
            <img className="inline-block h-5 w-5 rounded-full" src={post.author.profile_image_url} alt="profile_pic" />
            <span className="text-gray-800 font-light font-sans text-xs ml-2">{post.author.first_name} {post.author.last_name}</span>
          </div>
        </div>
        <div className=''>
          <dt className="sr-only">Published on</dt>
          
          <dd className="text-base text-xs text-gray-300 font-sans font-light"> <div className='text-gray-300  inline-block'>・</div>{formatDate(post.created_at.split('T')[0])}</dd>
        </div>
      </div>
      
        {session &&
        <div className='flex flex-row'>
          <div className=''>
            <BoookmarkButton post_id={post.id}/>
          </div>
          <div className=''>
            <LikeButton  post_id={post.id}/>
          </div>
        </div>
        }
        {session && session.user && post.author_id==session.user.id && 
        <div className='float-right'>
          <Link href={"/rave/"+post.id+"/edit"  } className="sm:flex py-8 " key={post.id} >
            <PencilSquareIcon
              className='cursor-pointer text-gray-400 group-hover:text-gray-500   h-5 w-5'
              aria-hidden="true"
            />
          </Link>
        </div>
        }
      
      <h1 className='text-4xl mb-12 '>{post.title}</h1>


    {/* <Card.Eyebrow as="time" dateTime={post.created_at} decorate>
      {formatDate(post.created_at.split('T')[0])}
    </Card.Eyebrow> */}
    
      <Blocks data={JSON.parse(post.review)} />
    </div>
        
  )
}