import { useSession } from "@clerk/nextjs";
import Blocks from 'editorjs-blocks-react-renderer';
import Link from 'next/link'
import {
  PencilSquareIcon,
  TrashIcon,
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


export default function RaveCard({ dish }) {
  var { session } = useSession()
  const [dishVisible, setDishVisible] = useState(true)
 
  return (
    <div>
      {dishVisible &&
        <div className='my-3'>
          {/* <Link href={"/dish/"+dish.id  } className=" sm:flex py-8 " key={dish.id} > */}
          <div className=" bg-white rounded-lg border border-gray-200  dark:bg-gray-800 dark:border-gray-700">
            {dish &&
             
                
              
              <div className="float-right">
                <ThreeDotsMenu  dish={dish} setDishVisible={setDishVisible} />
               
              </div>
                

             

            }
            <div className="p-3 pl-5">
              

              
              {dish.link &&
                <div className='mb-6  overflow-hidden	'>
                  <a href={dish.link} target='_blank' rel='noreferrer' className='flex items-center space-x-2'>
                    <LinkIcon className='h-5 w-5 text-gray-400' />
                    <span className='text-gray-400 font-light'>{dish.link}</span>
                  </a>
                </div>
              }


                <p className="cursor-pointer mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <Blocks config={{
                    quote:{
                      className: "py-3 px-5 italic font-serif"
                    },
                    list: {
                      className: "list-inside list-decimal ml-2	"
                    },
                  
                  }} data={JSON.parse(dish.content)} />
                </p>

            </div>
          </div>
          {/* </Link> */}

        </div>
      }
    </div>
  )
}