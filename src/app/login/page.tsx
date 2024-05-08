"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { message } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from 'axios'
import Cookies from 'js-cookie';
import logo from "../../../public/logo.png";
const page = () => {
    
  const router=useRouter()
  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;


    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleLoginForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.password || !formData.email) {
      messageApi.open({
        type: "error",
        content: "Fill all coulmns",
      });
      return  setIsLoading(false);
    }

   
     try {
        const response = await axios.post('https://reqres.in/api/login', formData);

        const TokenValue=response?.data?.token
    
        if(TokenValue){
         
            Cookies.set("Token", TokenValue, { expires: 7 });
            Cookies.set("Email", formData.email, { expires: 7 });
            // localStorage.setItem("Token", TokenValue)

            messageApi.open({
                type: "success",
                content: "Login succesfully",
              });
           
          
              return  setTimeout(()=>{
            router.push('/dashboard')

          },1000)
            
        }


   return setIsLoading(false)
     } catch (error: any) {
        
        const value=error?.response?.data
      
        
            messageApi.open({
                type: "error",
                content: value
              });
        
      
      setIsLoading(false)
       console.log(error)
     }
  };


  return (
    <div className="w-full h-screen flex flex-col lg:flex-row overflow-hidden bg-white">
      {contextHolder}
      <div className="lg:w-[50%] h-[40%] lg:h-[100%] relative flex  overflow-hidden justify-end ">
     

        <div className="w-[100%] flex flex-col p-[20px] sm:p-[40px] justify-between ">
          <div className=" flex lg:flex-col justify-end relative items-center w-[100%] h-[100%]">
            <div className="flex  w-[90%]  h-[70%] absolute 
             left-0 top-0  bottom-0 right-0 m-auto">
           <Image
            priority={true}
            className="w-[80%]  m-auto  z-10 h-[75%]"
            src={logo}
            alt=""
          />
            </div>
          </div>
            
        </div>
      </div>

      {/* second half */}

      <div className="lg:w-[50%] h-[100%] relative xl:-left-[5%] lg:h-[100%] flex">
        <form
          onSubmit={handleLoginForm}
          className="w-[70%] border-2 uploadCard  md:h-[60vh]  rounded-lg   m-auto flex flex-col items-center justify-around "
        >
          {/* heading */}
          <div className="text-indigo-900 text-[2.4rem]  flex items-center font-medium ">
            Login
          </div>

            <div className="w-[90%] h-fit flex flex-col  gap-4 justify-around  ">
              <div className="flex h-[80px]  justify-around flex-col text-black">
                <label className="font-medium">Email id  </label>
                <input
                  name="email"
                  type="email"
                  className="text-black  p-[10px] rounded-[10px] border border-violet-400 placeholder:text-slate-400 focus:outline-none"
                  placeholder="Enter Email id or Phone Number"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="flex h-[80px]  justify-around flex-col text-black">
                <label className="font-medium">Password </label>
                <input
                  name="password"
                  type="password"
                  className="text-black  p-[10px] rounded-[10px] border border-violet-400 placeholder:text-slate-400 focus:outline-none"
                  placeholder="Enter password"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className=" text-black flex flex-col   justify-around items-center w-full">
            <button
              type="submit"
              disabled={isLoading}
              className="
                
                     bg-indigo-900  w-[30%] py-2 rounded-[60px] border  text-white flex items-center justify-around shadow  border-white 
            "
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className=" animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </div>
            </div>  


        </form>
      
     
      </div>

   
    </div>
    
  );
};

export default page;

//     <div className='w-full h-screen bg-white flex justify-center'>

// <div className='w-[80%] h-[60vh] flex justify-between border my-auto'>
// <div className='w-[40%] h-full bg-green-300'></div>
// <div className='w-[40%] h-full bg-green-300'>
// <p className='text-[2rem] text-red-700'>Login</p>

// <form action="" onSubmit={handleLoginForm}>
// <div className='border mt-[2rem]  text-black'>
//     <label htmlFor="">UserName</label>
//     <input className='text-black' type="text" placeholder='userName' name='userName'  onChange={handleInputLogin}/>
// </div>
// <div className='border mt-[2rem] text-black'>
//     <label htmlFor="">Password</label>
//     <input className='text-black' type="password" name='password' placeholder='password'  onChange={handleInputLogin} />
// </div>
// <div>
//     <button className='bg-blue-300 px-4 py-2 rounded-md mt-[2rem]'>Sign in</button>
// </div>
// </form>
// </div>
// </div>

//     </div>
