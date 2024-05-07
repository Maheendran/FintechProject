import React from 'react'
import { TbLoader3 } from "react-icons/tb";
const LoaderSpin = () => {
  return (
    <div className="w-full h-full border   flex justify-center relative">
    <div className="w-fit h-fit m-auto absolute left-0 right-0 top-0 bottom-0 ">
      <TbLoader3 className="text-[3rem] text-black z-50 animate-spin " />
      <p className="text-black animate-pulse">Loading....!</p>
    </div>
  </div>
  )
}

export default LoaderSpin