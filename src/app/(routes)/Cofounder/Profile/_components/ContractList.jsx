import React from 'react'
import { CircleDotDashed, Newspaper } from 'lucide-react'
import { Button } from '@/components/ui/button'
const ContractList = ({item}) => {
  return (
    <>
    <div className=''>
    <article className={`${item.status==="Accepted"?"bg-green-100 border-lime-700":item.status==="Requested"?"bg-amber-100 border-amber-700":"bg-red-100 border-red-700"} flex items-end justify-between rounded-lg border  p-6 w-full md:w-[65rem]`}>
  <div className="flex items-center gap-4">
    <span className="hidden rounded-full bg-gray-100 p-2 text-gray-600 border-x-2 sm:block">
      <Newspaper/>
    </span>

    <div>
      <p className={`${item.status==='Accepted'?"text-lime-900":" "} text-2xl font-medium `}>{item.compname}</p>

      {item.status==='Requested'?
                        <>
                            <div className='mt-2'>

                           <Button variant='outline' className='mx-2'>Accept</Button>
                           <Button>Decline</Button>
                            </div>
                        </>
                        :
                        item.status==='Accepted'?
      <p className="text-sm text-neutral-500">created at<span className='mx-2 text-neutral-900 text-lg'>
      {item.created} </span> </p>
      :
      <>
      <div className='w-32 mt-2'>

      <span className='flex gap-3 rounded-lg text-red-600 bg-gray-50  '><CircleDotDashed className=' ml-4 w-4 text-red-500 '/>Pending</span>
      </div>
        
      </>
      
}
    </div>
  </div>

     
  <div >
    {/* <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg> */}
    {/* <Handshake className='w-4 ' /> */}
    <Button variant="outline" className="text-xs  font-medium border-x-2 border-green-300 align-middle my-auto px-auto"> View </Button>
  
  </div>
</article>
</div>
    </>
  )
}

export default ContractList