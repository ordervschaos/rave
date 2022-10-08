import Link from "../node_modules/next/link";

var statistics = [
  {
    icon: "/icons/like.svg",
    number: "129,864,880",
    description: "Books"
  },
  {
    icon: "/icons/like.svg",
    number: "2,62,80,00,000",
    description: "Hours of Videos in Youtube"
  },
  {
    icon: "/icons/like.svg",
    number: "600,000,000",
    description: "Blogs"
  },
  {
    icon: "/icons/like.svg",
    number: "80,000,000",
    description: "Songs in Spotify alone"
  },

]

export default function Main() {
  return (
    <section className="text-gray-600 body-font">
      <div className=" pt-48 max-w-7xl  lg:py-24  md:py-20 mx-auto flex  px-5  md:flex-row flex-col items-center">
        <div className="sm:w-full lg:flex-grow md:w-full md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-40 items-center text-center">
          <h1 className="mb-5 sm:text-6xl text-5xl items-center Avenir xl:w-2/2 text-gray-900">
            A place for sharing and discovering <b>greatness</b>
          </h1>
          <p className="mb-4 xl:w-3/4 text-gray-600 text-lg">
            We are here to help you find the gems in it.
          </p>
          <div className="flex justify-center">
            <a
              className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
              href="https://github.com/r1/nine4-2/"
            >
              <span className="justify-center">Find out more</span>
            </a>
          </div>
        </div>
        <div className="hidden lg:inline-block xl:mr-44 sm:mr-0  mb-0 lg:mb-0 mr-48 ">
          <img
            className="w-full"
            alt="iPhone-12"
            src="hero_bg.png"
          ></img>
        </div>
      </div>
      <section className="mx-auto">
        <div className="container px-5 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 text-6xl Avenir font-semibold text-gray-900">
              Internet is a sea of mediocrity.
            </h1>
            <h1 className="mb-8 text-6xl Avenir font-semibold text-gray-400">
            More is not more anymore. We have
          </h1>
            
          </div>
          <div className=" -m-4 px-5 py-24 ">
            <div className=" grid grid-cols-2 md:grid-cols-3 gap-16 mb-16  lg:grid-cols-4 m-2">
              {statistics.map((statistic) => (
                <div className="col-span-1 ">
                  <div className="block font-bold text-2xl">
                    {statistic.number}
                  </div>
                  <div className="block text-gray-600 text-lg font-medium">
                    {statistic.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <h1 className="mb-8 mt-12 text-2xl Avenir font-semibold text-gray-600 text-center">
             Bottom line: We have more content than what we can consume in 20000 life-times.
          </h1>
        </div>
        <div className="container px-5 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 mt-48 text-6xl Avenir font-semibold text-gray-900">
              But, every now and then, we come across <b>gold</b>
            </h1>
            <h1 className="mb-8 text-6xl Avenir font-semibold text-gray-400">
            ⎯something which is worthwhile our ephimeral life here.
            </h1>
            <h1 className="mb-8 text-2xl Avenir font-semibold text-gray-600">
            
            </h1>
            <h1 className="mb-8 mt-24 text-2xl Avenir font-semibold text-gray-600">
              <b>When you do, come here and rave about it.</b>
            </h1>

            <h1 className="mb-8 text-2xl Avenir font-semibold text-gray-400">
              And let like minded people find about it. 
            </h1>
          </div>
        </div>
        {/* <div className="container px-5 mx-auto lg:px-24 ">
          <div ="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 text-6xl Avenir font-semibold text-gray-900">
              We have 4000 weeks to live
            </h1>
            <h1 className="mb-8 text-2xl Avenir font-semibold text-gray-600">
              The limit of the internet is not the amount of content, but the amount of time we have to consume it.
            </h1>
          </div>
        </div>
        <div className="container px-5 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 text-6xl Avenir font-semibold text-gray-900">
              More is not more anymore
            </h1>
            <h1 className="mb-8 text-2xl Avenir font-semibold text-gray-600">
              Stop looking for the new stuff--it's mostly going to be more of mediocrity.
            </h1>
            <h1 className="mb-8 text-2xl Avenir font-semibold text-gray-600">
               It's time to start digging for gold.
            </h1>
          </div>
        </div> */}
        <div className="container mt-24 px-5 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 mt-14 text-6xl Avenir font-semibold text-gray-900">
              So, what gold have you found recently?
            </h1>
            <h1 className="mt-12 mb-8 underline text-2xl Avenir font-semibold text-gray-600">
              <Link href="">Start sharing here</Link>
            </h1>
            <h1 className="mt-12 mb-8 text-2xl Avenir font-semibold text-gray-600">
              And checkout the
              <div className="underline">
                <Link href="">
                  gold others have found.
                </Link>
              </div>
            </h1>
            <div className="mt-12 flex ">

              <a
                className="sm:m-2 md:m-auto lg:m-auto p-auto text-center  inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
                href="https://github.com/r1/nine4-2/"
              >
                <span className="justify-center">Let's get started</span>
              </a>
            </div>
          </div>
        </div>


        <div className="container px-5 mt-72 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 mt-14 text-6xl Avenir font-semibold text-gray-900">
              So, you are asking why not go for the most popular stuff?
            </h1>
            <h1 className="mb-8 text-2xl Avenir font-semibold text-gray-600">
              You know the answer deep down. Try looking for the most popular books, most viewed Youtube videos, most listened to songs. Now, think about your favourite books, songs, videos.
            </h1>
            <h1 className="mb-8 text-2xl Avenir font-semibold text-gray-600">
            Short answer:
              <div className="underline">
                <Link href="https://hbr.org/2002/11/the-flaw-of-averages">
                   Average is a flawed metric
                </Link>
              </div>
            </h1>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="py-24 md:py-36">
            <h1 className="mb-5 text-6xl Avenir font-semibold text-gray-900">
              Subscribe to our newsletter
            </h1>
            <h1 className="mb-9 text-2xl font-semibold text-gray-600">
              Enter your email address and we'll send you a curated list of greatness every week.
            </h1>
            <input
              placeholder="jack@example.com"
              name="email"
              type="email"
              autoComplete="email"
              className="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-900"
            ></input>{" "}
            <a
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
              href="/"
            >
              <span className="justify-center">Subscribe</span>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}