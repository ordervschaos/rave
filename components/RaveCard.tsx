import Link from 'next/link'
import Blocks from 'editorjs-blocks-react-renderer';
import { Card } from './Card'
import BookmarkButton from './BookmarkButton';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';

export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    // year: 'numeric',
    timeZone: 'UTC',
  })
}


export default function RaveCard({ post }) {
  try {
    var review = JSON.parse(post.review)
    review.blocks = review.blocks.filter((block) => block.type == 'paragraph')
    post.review = JSON.stringify(review)

  } catch {
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

    <div className='my-3'>
      {/* <Link href={"/rave/"+post.id  } className=" sm:flex py-8 " key={post.id} > */}

      <div className=" bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        {post.author &&
          <div className="flex w-full items-center space-x-6 pb-3 m-3">
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
            <div className='flex-grow'></div>
            <div className=''>
              <ShareButton post_id={post.id}  />
            </div>
          </div>
        }
        <div className="p-5 pt-3">
          <div className="flex items-center space-x-2 text-sm mb-2 text-gray-400">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-gray-500">{post.type?JSON.parse(post.type).label:""}</span>
            </div>
          </div>
          
          <Link className="" href={"/rave/"+post.id}>
            <h5 className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
          </Link>
          
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <Blocks data={JSON.parse(post.review)} />
          </p>
          {/* tag chips */}
          <div className="flex flex-wrap -m-1">
            {post.tags&&post.tags.map((tag) => (
              <div className="m-1">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag.value}</span>
              </div>
            ))}
          </div>

          <LikeButton post_id={post.id} />
          <div className='float-right'>
            <BookmarkButton post_id={post.id} />
          </div>
            
        </div>
      </div>
      {/* </Link> */}

    </div>

  )
}