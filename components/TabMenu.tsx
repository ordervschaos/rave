

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TabMenu({selectedTab}) {
  
  interface Tab {
    label: string;
    value: string;
    href?: string;
    current?: boolean;
  }

  var tabs:Tab[]=[
    {label:"All",value:"",},
    {label:"Books",value:"books",},
    {label:"Videos",value:"videos",},
    ,{label:"Music",value:"music",}
    ,{label:"Podcasts",value:"podcasts",}
    ,{label:"TV Shows",value:"tv_shows",},
    ,{label:"Websites",value:"websites",},
    {label:"Movies",value:"movies",},
    {label:"Apps",value:"apps",},
    {label:"Audiobooks",value:"audiobooks",},
    {label:"Youtube Channels",value:"youtube_channels",},
    



  ]


  var url=window.location.pathname
  var user_id=window.location.href.split("/u/")[1]
  user_id=user_id?user_id.split("/")[0]:null

  tabs.forEach(tab => {

    if(user_id){
      tab.href="/raves/u/"+user_id+"/"+tab.value
    }else{
      tab.href='/raves/'+tab.value
    }
    
    if(selectedTab==tab.value){
      tab.current=true
    }else if(!selectedTab && tab.value==""){
      tab.current=true
    }

   
  });
  
  
  return (
    <div className="border-b border-gray-200 w-full">
      <div className="sm:flex sm:items-baseline">
        <h3 className="text-lg font-medium leading-6 text-gray-900"></h3>
        <div className="mt-4 sm:mt-0 sm:ml-10">
          <nav className="-mb-px flex space-x-8 overflow-x-auto max-w-2xl	">
            {tabs.map((tab) => (
              <a
                key={tab.value}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}