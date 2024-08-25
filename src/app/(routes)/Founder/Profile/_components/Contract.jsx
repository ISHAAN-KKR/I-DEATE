import { Badge } from '../../../../../components/ui/badge'
import React from 'react'
import ContractList from './ContractList'
const contracts=[
    {
        compname:'KnowIdea pvt. Limited',
        status:'Accepted',
        created:'01-09-2021',
    },
    {
        compname:'StatusCode pvt. Limited',
        status:'Pending',
        created:' ',
    },
    {
        compname:'KnowIdea pvt. Limited',
        status:'Accepted',
        created:'01-09-2021',
    },
    {
        compname:'KnowIdea pvt. Limited',
        status:'Accepted',
        created:'01-09-2021',
    },
    {
        compname:'Rebase Corporation',
        status:'Requested',
        created:' ',
    },

]
function Contract() {
  return (
    <>
    <div className='ml-24'>
    <div className='flex my-8 gap-6 '>
        <Badge className='px-6 py-4'>All</Badge>
        <Badge variant={"outline"} className='px-6 border b-2 border-lime-300 text-lime-600 py-4 hover:bg-lime-300 hover:text-lime-900 '>Accepted</Badge>
        <Badge variant={"outline"} className='px-6 py-4 border-amber-300 text-amber-600 hover:bg-amber-300 hover:text-amber-900 '>Requested</Badge>
        <Badge variant={"outline"} className='px-6 py-4 border-red-300 text-red-600 
        hover:bg-red-300 hover:text-red-900 
        '>Pending</Badge>
        <Badge variant={"outline"} className='px-6 py-4 border-gray-300 text-gray-900 
        hover:bg-gray-400 hover:text-gray-100 
        '>Rejected</Badge>

    </div>
    <div>
    {
        contracts.map((item,index)=>(
            <>
            <div key={index} className='flex justify-between items-center my-4'>
                <div className='flex gap-4'>
                        <ContractList item={item} />
                </div>
            </div>
            </>
        ))
    }
</div>
</div>
</>
  )
}

export default Contract