"use client"
import Navbar from '@/components/navbar/Navbar'
import React, { useEffect, useState } from 'react'
import { GrCaretPrevious,GrCaretNext } from "react-icons/gr";
import axios from 'axios'
import FinanceTable from '@/components/financeTable/FinanceTable';
const page = () => {

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;
const[totalPages,setTotalPages]=useState(0)

const[loading,setLoading]=useState(true)
const[finDetails,setFinDetails]=useState([])
  useEffect(()=>{
const handleGetFinData=async()=>{
  try {
    setLoading(true)
    const response = await axios.get(`/api/financialList?page=${currentPage}&perPage=${itemsPerPage}`);
   
   setTimeout(()=>{
    setFinDetails(response.data.data)
    setTotalPages(response.data.totalLength)
   },1000)

    setLoading(false)
  } catch (error) {
    console.log(error)
  }
}
handleGetFinData()
  },[currentPage])


  const handlePagination=(value:number)=>{
    setCurrentPage((currentPage)=>currentPage+value)
  }
  return (
    <div className='w-full h-screen bg-white border relative'>
        <Navbar/>
<FinanceTable finDetails={finDetails} loading={loading} />


<div className='w-full flex  text-black  absolute bottom-[1rem] left-0'>
  <div className='w-fit mx-auto flex gap-4'>
    <button disabled={currentPage===1} onClick={()=>handlePagination(-1)}><GrCaretPrevious className='text-[1.5rem] paginationBtn'/></button>
    <p>{currentPage} -{Math.round(totalPages/itemsPerPage) }</p>
    <button disabled={currentPage==Math.round(totalPages/itemsPerPage)} onClick={()=>handlePagination(1)}><GrCaretNext className='text-[1.5rem] paginationBtn'/></button>
  </div>
</div>
       
    </div>
  )
}

export default page