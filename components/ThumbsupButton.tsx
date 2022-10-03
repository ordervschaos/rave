import { HandThumbUpIcon } from '@heroicons/react/20/solid'

export default function ThumbsupButton() {
  return (

      <button
        type="button"
        className="relative inline-flex items-center rounded  bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <HandThumbUpIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
      12k
      </button>
     

  )
}

