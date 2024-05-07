"use client";
import React, { useEffect, useState } from "react";
import { Tree } from "react-tree-graph";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import axios from "axios";
import ChartComponent from "@/components/TreeChart/Page";



const page = () => {
  const [graphTwoData, setGraphTwoData] = useState([]);
  const [graphOne, setGraphOne] = useState({});
const[graphLoading,setGraphLoading]=useState(true)

  useEffect(() => {
    const handleGetFinData = async () => {
      try {
        const response = await axios.get("/api/graph");

        const status=response.data.status
        console.log(response.data,'response.data')
     if(status==="success"){
      console.log(response.data,'response.data')
      setGraphTwoData(response.data.data);
      setGraphOne(response.data.graphOne)
      setGraphLoading(false)
     }
       
      } catch (error) {
        console.log(error);
        setGraphLoading(false)
      }
    };
    handleGetFinData();

  });

  return (
    <>
      <div className="w-full h-[200vh] bg-white text-black relative">
        <Navbar />

        <p className="text-[3rem] font-bold text-center">Finance</p>
        <div className="w-[50%] mx-auto flex">
          <Link
            className="text-[1rem] w-fit px-4 font-bold text-end ms-auto"
            href={"/table"}
          >
            <p>Table</p>
          </Link>
        </div>

        <div className="w-full border h-fit relative">
        {graphLoading?  <p>"loadinggg"</p>  : <ChartComponent currentData={graphOne}  />}
        </div>
        <div id="treeWrapper" className="w-fit  border mx-auto">
       
        {graphLoading?  <p>"loadinggg"</p>  :  <Tree
            data={graphTwoData}
            nodeRadius={100}
            margins={{ top: 2, bottom: 20, left: 50, right: 100 }}
            height={400}
            width={800}
          />}
        </div>
      </div>
{/* <div></div> */}
   
    </>
  );
};

export default page;
