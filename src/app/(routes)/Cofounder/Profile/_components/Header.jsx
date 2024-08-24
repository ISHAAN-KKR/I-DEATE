import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import ConnectBuuton from './ConnectButton/ConnectBuuton'
function Header() {
  return (
    <>    <div className='flex justify-end w-full gap-2 items-center p-4'>

    <div className='flex gap-2 items-center'>
    <ConnectBuuton title={20} />
{/* <Button ><CirclePlus className='text-green-400' /><span className='bg-white rounded-lg px-4 ml-2 pt-1 h-8 mx-0 text-neutral-900 text-xl'>20</span></Button> */}
    </div>
    <div>
        {/* UserIcon */}
      <Image src='/pfp.jpg' alt='profile' className='border b-2 rounded-full h-12 w-12' height={500} width={500}/>


     

    </div>


  </div></>
  )
}

export default Header