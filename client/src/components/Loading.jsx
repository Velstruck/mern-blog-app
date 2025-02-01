import React from 'react'
import loadingicon from '@/assets/images/loading.svg'

const Loading = () => {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center '>
        <img src={loadingicon} alt="Loading" width={100} />
    </div>
  )
}

export default Loading