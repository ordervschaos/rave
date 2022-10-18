import { useSession } from "@clerk/nextjs";
import Blocks from 'editorjs-blocks-react-renderer';
import Link from 'next/link'
import Image from 'next/image'
import { Card } from './Card'
import BookmarkButton from './BookmarkButton';
import AuthorButton from './AuhtorButton'
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';
import {
  PencilSquareIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import ThreeDotsMenu from "./ThreeDotsMenu";
import { useState } from "react";

export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    // year: 'numeric',
    timeZone: 'UTC',
  })
}


export default function RaveCard({ post }) {
  var { session } = useSession()
  const [postVisible, setPostVisible] = useState(true)
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
    <div>
      {postVisible &&
        <div className='my-3'>
          {/* <Link href={"/rave/"+post.id  } className=" sm:flex py-8 " key={post.id} > */}
          <div className=" bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            {post &&
              <div className="flex w-full items-center space-x-1  p-3">

                {post.author &&
                  <div className=''>
                    <AuthorButton author={post.author} />
                  </div>
                }
                <div className=''>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base text-xs text-gray-300 font-light"> <div className='text-gray-300  inline-block'>・</div>{formatDate(post.created_at.split('T')[0])}</dd>
                </div>
                <div className='flex-grow'></div>
                {post.status != 'draft' &&
                  <div>
                    <div className='inline-block'>
                      <ShareButton post_id={post.id} />
                    </div>
                    <div className='inline-block'>
                      <BookmarkButton post_id={post.id} />
                    </div>
                  </div>
                }
                {session && session.user && ((post.author && post.author.id == session.user.id) || !post.author) &&
                  <div className='float-right'>
                    <ThreeDotsMenu post={post} setPostVisible={setPostVisible} />
                  </div>


                }

                {post.status == 'draft' &&

                  <div className=''>
                    <Link href={"/rave/" + post.id + "/edit"}>
                      <a className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Edit</span>
                        <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </Link>
                  </div>
                }
              </div>
            }
            <div className="p-3 pl-5">
              <div className="flex items-center space-x-2 text-sm mb-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-500">{post.type ? post.type.label : ""}</span>
                </div>
              </div>

              <Link className="" href={"/rave/" + post.id}>
                <h5 className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
              </Link>
              {post.link &&
                <div className='mb-6'>
                  <a href={post.link} target='_blank' rel='noreferrer' className='flex items-center space-x-2'>
                    <LinkIcon className='h-5 w-5 text-gray-400' />
                    <span className='text-gray-400 font-light'>{post.link}</span>
                  </a>
                </div>
              }

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <Blocks data={JSON.parse(post.review)} />
              </p>
              {/* tag chips */}
              <div className="flex w-full items-center space-x-1 pt-1  px-3">

                <div className="flex flex-wrap -m-1">
                  {post.tags && post.tags.map((tag) => (
                    <div key={tag.value} className="m-1">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag.value}</span>
                    </div>
                  ))}
                </div>

                <div className='flex-grow'></div>
                {post.status != 'draft' &&
                  <LikeButton post_id={post.id} />
                }
              </div>


            </div>
          </div>
          {/* </Link> */}

        </div>
      }
    </div>
  )
}