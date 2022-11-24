import { useSession } from "@clerk/nextjs";
import Blocks from 'editorjs-blocks-react-renderer';
import Link from 'next/link'
import Image from 'next/image'
import { Card } from './Card'
import BookmarkButton from './BookmarkButton';
import AuNorButton from './AuhtorButton'
import LikeButton from './DoneButton';
import ShareButton from './ShareButton';
import {
  PencilSquareIcon,
  DocumentIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import ThreeDotsMenu from "./ThreeDotsMenu";
import { useState } from "react";
import DoneButton from "./DoneButton";
import DishCard from "./DishCard";

export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    // year: 'numeric',
    timeZone: 'UTC',
  })
}


export default function MealCard({ meal }) {
  var { session } = useSession()
  const [mealVisible, setMealVisible] = useState(true)
  const [isDone, setIsDone] = useState(false);
  try {
    var content = JSON.parse(meal.content)
    content.blocks = content.blocks.filter((block) => block.type == 'paragraph')
    meal.content = JSON.stringify(content)

  } catch {
    meal.content = JSON.stringify({
      version: "2.11.10",
      blocks: [
        {
          type: "paragraph",
          data: {
            text: meal.content
          }
        }
      ],
    })
  }
  return (
    <div>
      {mealVisible &&
        <div className='my-3'>
          {/* <Link href={"/meal/"+meal.id  } className=" sm:flex py-8 " key={meal.id} > */}
          <div className=" bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            {meal &&
              <div className="flex w-full items-center space-x-1  p-3">

               
                

              </div>
            }

            <div className="p-3 pl-5">
              <div className="flex items-center space-x-2">
                <div className='flex-grow'></div>
                <div className="flex flex-wrap -m-1">
                  <DocumentIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="mr-1 text-gray-400">{meal.next_dish_index%meal.num_of_dishes+1}/{meal.num_of_dishes} 
                  </span>
                </div>
              </div>
              <Link className="" href={"/meal/" + meal.id+"/edit"}>
                <h5 className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{meal.name}</h5>
              </Link>
              {meal.link &&
                <div className='mb-6  overflow-hidden	'>
                  <a href={meal.link} target='_blank' rel='noreferrer' className='flex items-center space-x-2'>
                    <LinkIcon className='h-5 w-5 text-gray-400' />
                    <span className='text-gray-400 font-light'>{meal.link}</span>
                  </a>
                </div>

              }
                
              {meal.next_dish && !isDone &&
              
              <DishCard dish={meal.next_dish} />
              
              }


              <div className="flex w-full items-center space-x-1 pt-1  px-3">
              <div className="flex flex-wrap -m-1">
                  expires in {meal.schedule.perishesIn} minutes
                </div>
           

                <div className='flex-grow'></div>
                {meal.status != 'draft' &&
                  <DoneButton meal={meal} setIsDone={setIsDone} isDone={isDone} />
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