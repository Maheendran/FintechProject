"use client";
import React, { useEffect, useState } from "react";
import { Tree } from "react-tree-graph";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import axios from "axios";
import ChartComponent from "@/components/TreeChart/Page";
import { TbLoader3 } from "react-icons/tb";
import LoaderSpin from "@/components/loaderSpin/LoaderSpin";
const page = () => {
  const [graphTwoData, setGraphTwoData] = useState([]);
  const [graphOne, setGraphOne] = useState({});
  const [graphLoading, setGraphLoading] = useState(true);
  const [tigger, setTrigger] = useState(Date());

  useEffect(() => {
    const handleGetFinData = async () => {
      try {
        const response = await axios.get("/api/graph");

        const status = response.data.status;
        console.log(response.data, "response.data");
        if (status === "success") {
          console.log(response.data, "response.data");
          setGraphTwoData(response.data.data);
          setGraphOne(response.data.graphOne);
          setGraphLoading(false);
          setTrigger(Date());
        }
      } catch (error) {
        console.log(error);
        setGraphLoading(false);
      }
    };
    handleGetFinData();
  }, [tigger]);

  return (
    <>
      <div className="w-full h-fit bg-white pb-[2rem] text-black relative">
        <Navbar />

        <p className="text-[2rem]  text-neutral-500 font-bold text-center">
          Finance
        </p>
        <div className="w-fit my-[1.4rem] mx-auto flex flex-end">
          <Link
            className="text-[1rem] w-fit px-4 font-bold text-end"
            href={"/charity-list"}
          >
            <button className="px-4 py-2 button2 relative">Charity list</button>
          </Link>
          <Link
            className="text-[1rem] w-fit px-4 font-bold text-end "
            href={"/charity-list"}
          >
            <button className="px-4 py-2 button2 relative">Upload file</button>
          </Link>
        </div>

        <div className="w-[60%] mx-auto shadow rounded-lg border h-[55vh] relative">
          {graphLoading ? (
            <LoaderSpin />
          ) : (
            <>
              {graphOne?.formattedMonths.length === 0 ? (
                <div className="w-full h-[60vh] border flex justify-center">
                  <p className="text-black ext-[1.4rem] m-auto">No data</p>
                </div>
              ) : (
                <ChartComponent currentData={graphOne} />
              )}
            </>
          )}
        </div>

        <div
          id="treeWrapper"
          className="mt-[1.4rem] shadow rounded-lg w-[60%] mx-auto  border h-[55vh] relative"
        >
          {graphLoading ? (
            <LoaderSpin />
          ) : (

            <>
            {graphOne?.formattedMonths.length === 0 ? (
              <div className="w-full h-[60vh] border flex justify-center">
                <p className="text-black text-[1.4rem] m-auto">No data</p>
              </div>
            ) : (
              <Tree
              data={graphTwoData}
              nodeRadius={100}
              margins={{ top: 2, bottom: 20, left: 50, right: 100 }}
              height={340}
              width={700}
            />
            )}
          </>
           
          )}
        </div>
      </div>
      {/* <div></div> */}
    </>
  );
};

export default page;
