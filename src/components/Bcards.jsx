import React from 'react'

const Bcards = () => {
  return (
    <div className='py-3 cursor-pointer flex px-3'>
      <div className='w-[400px] h-[200px] shadow-lg shadow-gray-600 rounded overflow-hidden'>
        <h1 className='text-md font-semibold p-2'>Location:</h1>
        <h1 className='text-md font-semibold p-2'>From Date:</h1>
        <h1 className='text-md font-semibold p-2'>To Date:</h1>
        <h1 className='text-md font-semibold p-2'>Status:</h1>

      </div>
    </div>
  )
}

export default Bcards