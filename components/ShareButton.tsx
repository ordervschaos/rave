import { ShareIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';


import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share';






// export default function ShareButton({ post_id }) {
//   const { session } = useSession();

//   const [showShareMenu, setShowShareMenu] = useState(false)




//   return (
//     <div className='static'>


//       {/* https://tailwindui.com/components/application-ui/elements/dropdowns */}
//       {/* https://github.com/Bunlong/next-share#-icons-props */}
//     </div>




//   )
// }

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

export default function ShareButton({ post_id }) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  var post_url = window.location.hostname + "/rave/" + post_id

  var post_body="Check out this recommendation on Ravve:"
  var post_subject="Check out this recommendation"
  return (
    <Menu as="div" className="relative  text-left">
      <div>
        <Menu.Button className="rounded-md mr-4 p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-gray-100">

          <ShareIcon onClick={showShareMenu ? () => setShowShareMenu(false) : () => setShowShareMenu(true)} className={`-ml-1 mr-2 h-5 w-5 text-gray-400"}`} aria-hidden="true" />

        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">

            <Menu.Item>


              <a
                href="#"
                className='text-gray-700 block px-4 py-2 text-sm'
              >
                <TwitterShareButton
                  url={post_url}
                  title={'next-share is a social share buttons for your next React apps.'}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <FacebookShareButton
                  url={post_url}
                  quote={'next-share is a social share buttons for your next React apps.'}
                  hashtag={'#nextshare'}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>


                <RedditShareButton
                  url={post_url}
                  title={'next-share is a social share buttons for your next React apps.'}
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>


                <WhatsappShareButton
                  url={post_url}
                  title={'next-share is a social share buttons for your next React apps.'}
                  separator=":: "
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>


                <LinkedinShareButton url={post_url}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>

                <EmailShareButton
                  url={post_url}
                  subject={post_subject}
                  body={post_body}
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>



              </a>

            </Menu.Item>

          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
