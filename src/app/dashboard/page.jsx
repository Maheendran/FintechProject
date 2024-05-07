"use client";
import React, { useEffect, useState } from "react";
import { Tree } from "react-tree-graph";
import Navbar from "@/components/navbar/Navbar";
// import { Chart } from "react-google-charts";
// import Tree from 'react-d3-tree';
// import 'react-tree-graph/dist/style.css'
import Link from "next/link";
import axios from "axios";
import ChartComponent from "@/components/TreeChart/Page";
const data = {
  name: "Colour",
  textProps: { x: -25, y: 25 },

  children: [
    {
      name: "Black",
      pathProps: { className: "black" },
      textProps: { x: -25, y: 25 },
      children: [],
    },
    {
      name: "Blue",
      pathProps: { className: "blue" },
      textProps: { x: -25, y: 25 },
      color: "blue",
      children: [],
    },
    {
      name: "Green",
      pathProps: { className: "green" },
      textProps: { x: -25, y: 25 },
      color: "green",
      children: [],
    },
    {
      name: "Purple",
      pathProps: { className: "purple" },
      textProps: { x: -25, y: 25 },
      color: "purple",
      children: [],
    },
    {
      name: "Red",
      pathProps: { className: "red" },
      textProps: { x: -25, y: 25 },
      color: "red",
      children: [],
    },
    {
      name: "White",
      pathProps: { className: "grey" },
      textProps: { x: -25, y: 25 },
      color: "grey",
      children: [],
    },
    {
      name: "Yellow",
      pathProps: { className: "yellow" },
      textProps: { x: -25, y: 25 },
      color: "yellow",
      children: [],
    },
  ],
};



const page = () => {
  const [graphTwoData, setGraphTwoData] = useState([]);
  const [graphOne, setGraphOne] = useState({});

  useEffect(() => {
    const handleGetFinData = async () => {
      try {
        const response = await axios.get("/api/graph");

     
        setGraphTwoData(response.data.data);
        setGraphOne(response.data.graphOne)
        console.log(response.data)

      
      } catch (error) {
        console.log(error);
      }
    };
    handleGetFinData();
  }, []);

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
          <ChartComponent currentData={graphOne}  />
        </div>
        <div id="treeWrapper" className="w-fit  border mx-auto">
          <Tree
            data={graphTwoData}
            nodeRadius={100}
            margins={{ top: 2, bottom: 20, left: 50, right: 100 }}
            height={400}
            width={800}
          />
        </div>
      </div>

   
    </>
  );
};

export default page;
