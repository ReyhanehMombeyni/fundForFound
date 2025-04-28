'use client'
import Image from 'next/image'
import verctor from "../../../../public/Navbar/Vector.svg";


const FundTitrComp = () => {
  return (
    <div className='text-[#644FC1] flex flex-col items-center gap-10'>
        <h1 className='text-4xl font-semibold'>Fund For Found</h1>
        <Image src={verctor} alt='logo' width={50} />
    </div>
  )
}

export default FundTitrComp