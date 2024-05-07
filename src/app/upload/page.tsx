"use client";
import { IoReloadCircleSharp } from "react-icons/io5";
import Navbar from "@/components/navbar/Navbar";
import { FaFileAlt } from "react-icons/fa";
import { useRef, useState } from "react";
import { message } from "antd";
import axios from "axios";
import Link from "next/link";

const page = () => {
  const [fileName, setFileName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [inCompleteData, setInCompleteData] = useState(0);
  const [errorPopup, setErrorPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleExcelFile = (e: any) => {
    e.preventDefault();
    const filess = e.target?.files[0];
    setFile(e?.target?.files[0]);
    setFileName(filess.name);
  };

  const handlePopupInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleUploadFile = async () => {
    try {
      setLoading(true);
      if (!file) {
        setLoading(false);
        messageApi.open({
          type: "error",
          content: "Choose a file",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("/api/upload", formData);
      const status = response?.data?.status;

      if (status === "success") {
        setInCompleteData(response?.data?.errorData);
        const errorCount = response?.data?.errorData;

        if (errorCount > 0) {
          setErrorPopup(true);
          setTimeout(() => {
            setErrorPopup(false);
          }, 3000);
        }
        messageApi.open({
          type: "success",
          content: "file uploaded successfully",
        });

      
        setFile(null);
        setFileName("");

     
        if (inputRef.current) {
          inputRef.current.value = "";
        }

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen h-fit bg-white  overflow-hidden">
        <div className="w-full relative overflow-hidden">
          <Navbar />
        </div>

        <p className="text-[2rem]  text-neutral-500 mb-2 font-bold text-center mt-[1rem]">
          Upload File
        </p>
        <div className="w-fit my-[1.4rem] mx-auto flex flex-end">
          <Link
            className="text-[1rem] w-fit px-4 font-bold text-end"
            href={"/dashboard"}
          >
            <button className="px-4 py-2 button2 relative">Finance</button>
          </Link>
          <Link
            className="text-[1rem] w-fit px-4 font-bold text-end "
            href={"/charity-list"}
          >
            <button className="px-4 py-2 button2 relative">Charity list</button>
          </Link>
        </div>

        {contextHolder}
        <div className="w-full md:w-[22%] z-50 mx-auto border uploadCard h-[50vh] rounded-lg flex flex-wrap relative ">
          <div className="w-fit   flex flex-col gap-3 h-fit absolute top-0 bottom-0 left-0 right-0 m-auto">
            <div
              onClick={handlePopupInput}
              className={`${
                file
                  ? " border-green-400 bg-green-100/50"
                  : " border-neutral-400 bg-white"
              } mx-auto 
            w-[7rem]  h-[7rem] border-2
             cursor-pointer rounded-full flex justify-center`}
            >
              <FaFileAlt className="text-[3rem] text-black m-auto" />
            </div>
            <p className="text-black text-center">{fileName}</p>
            <input
              ref={inputRef}
              type="file"
              className="text-black hidden "
              onChange={handleExcelFile}
            />

            <label htmlFor="" className="text-neutral-400 text-center">
              Choose Excel file{" "}
            </label>
            <button
              disabled={loading}
              onClick={handleUploadFile}
              className={`${
                file ? "bg-green-400" : "bg-neutral-400"
              }  w-fit px-4 py-2 rounded-xl mx-auto`}
            >
              {loading ? (
                <div>
                  <p className="flex gap-2 justify-center">
                    Uploading...
                    <span className="my-auto">
                      <IoReloadCircleSharp className="text-[1.3rem] animate-spin" />
                    </span>
                  </p>
                </div>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </div>
        {errorPopup && (
          <div
            className="border mx-auto rounded-lg bg-red-100/50 mt-[.75rem] p-1
                 lg:w-[12%] h-fit  border-red-300 text-center"
          >
            <p className="text-[1.5rem] text-red-500 font-bold my-auto">
              {inCompleteData}
            </p>
            <p className="text-[0.9rem] my-auto text-neutral-500">row error</p>
          
          </div>
         )} *
      </div>
    </>
  );
};

export default page;
