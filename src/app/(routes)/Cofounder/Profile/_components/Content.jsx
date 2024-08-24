import { MoveUp } from 'lucide-react'
import React from 'react'

function Content() {
  return (
    <>
    <div class=" py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div class="mb-4 flex flex-col items-center md:mb-8 lg:flex-row lg:justify-between">
      <h2 class="mb-2 text-center text-2xl font-bold text-gray-800 lg:mb-0 lg:text-3xl">Hi Subham!</h2>

      
    </div>

    <div class="grid grid-cols-2 gap-4 rounded-lg md:grid-cols-3 lg:gap-6">
      {/* <!-- logo - start --> */}
      <div class="flex h-16 items-center justify-center rounded-lg bg-black p-4 text-neutral-300 sm:h-32">
       
       <div>
       <div className='items-center text-center text-3xl'>25</div>
        <div>Profile Visits</div>
      </div>
        </div>
      {/* <!-- logo - end -->

      <!-- logo - start --> */}
      <div class="flex h-16 items-center justify-center rounded-lg bg-black p-4 text-gray-300 sm:h-32">
      <div>
       <div className='mx-auto ml-5 text-3xl flex'>10 <span><MoveUp className='text-emerald-300 w-4'/></span></div>
        <div>Interactions</div>
      </div>
      </div>
      {/* <!-- logo - end -->

      <!-- logo - start --> */}
      <div class="flex h-16 items-center justify-center rounded-lg bg-black p-4 text-gray-300 sm:h-32">
      <div>
       <div className='items-center text-center text-3xl'>3</div>
        <div>Contracts</div>
      </div>
      </div>
      {/* <!-- logo - end --> */}


    </div>
  </div>
</div>
    </>
  )
}

export default Content