"use client";
import Navbar from "@/components/navbar/Navbar";
import { useRef, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import axios from 'axios'
import { message } from "antd";
export default function Home() {
  const[fileName,setFileName]=useState('')
  const [file, setFile] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const handleExcelFile = (e: any) => {
    e.preventDefault();
    const filess=e.target?.files[0]
    setFile(e?.target?.files[0]);
    setFileName(filess.name)
  };
 
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePopupInput=()=>{
    if(inputRef.current){
      inputRef.current.click()

    }
  }

  const  handleUploadFile=async()=>{
    try {
       
      const formData = new FormData();
      formData.append('file', file);

      const response=await axios.post("/api/upload",formData,

    )
    console.log(response.data,'aaaaaaaaaaaaaaaaaaa')
    const status=response?.data?.status
    if(status==="success")
      messageApi.open({
        type: "success",
        content: "file uploaded successfully",
      });
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full h-screen bg-white">
      {contextHolder}
      <Navbar />
      <p className="text-[3rem] text-black font-bold text-center mt-[2rem]">
        Upload File
      </p>
      <div className="w-full h-[50%] relative ">
        <div className="w-fit   flex flex-col gap-3 h-fit absolute top-0 bottom-0 left-0 right-0 m-auto">
        <div onClick={handlePopupInput} className="w-[10rem] h-[10rem] border-2 border-violet-400 cursor-pointer rounded-full flex justify-center">
          <FaFileAlt className="text-[3.5rem] text-black m-auto"/>
        </div>
      <p className="text-black text-center">{fileName}</p>
          <input
          ref={inputRef}
            type="file"
            className="text-black hidden  p-[10px] rounded-[10px] border border-violet-400 placeholder:text-slate-400 focus:outline-none"
            onChange={handleExcelFile}
          />

          <label htmlFor="" className="text-neutral-400 text-center">
            Choose Excel file{" "}
          </label>
          <button onClick={handleUploadFile} className="bg-violet-400 w-fit px-4 py-2 rounded-xl mx-auto">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
