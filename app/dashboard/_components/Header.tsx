import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
  return (
    <div className='p-5 shadow-sm border-b-2 flex justify-between items-center bg-white'>
      <div className=''>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            AI Content <span className='text-indigo-600'>Generator</span>
          </h1>
        
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='bg-primary p-1 rounded-full text-xs text-white px-2'>Join Membership just for ₹19.00/Month</h2>
        <UserButton/>
      </div>
    </div>
    
  )
}

export default Header
