"use client";
import React, { useState } from "react";
import Image from "next/image";
import image2 from "../../../public/register&login.png";
import { message } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from 'axios'
import Cookies from 'js-cookie';
import Link from "next/link"
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
        console.log(value,'value')
        if(value){
          messageApi.open({
            type: "error",
            content: value?.error,
          });
        }
        else{
            messageApi.open({
                type: "error",
                content: 'server error',
              });
        }
      
      setIsLoading(false)
       console.log(error)
     }
  };


  return (
    <div className="w-full h-screen flex flex-col lg:flex-row overflow-hidden bg-white">
      {contextHolder}
      <div className="lg:w-[50%] h-[40%] lg:h-[100%] relative flex  overflow-hidden justify-end ">
        <div className="absolute w-[100%]  top-0 right-0 h-[100%]">
          <Image
            priority={true}
            className="w-[100%]  lg:flex h-[100%]"
            src={image2}
            alt=""
          />
      
        </div>

        <div className="w-[100%] flex flex-col p-[20px] sm:p-[40px] justify-between ">
          <div className=" flex lg:flex-col justify-end relative items-center w-[100%] h-[100%]">
            <div className="flex  w-[100%]  h-[100%] absolute 
             left-0 top-0  bottom-0 right-0 m-auto">
           {/* <Image
            priority={true}
            className="w-[70%]   z-10 h-[70%]"
            src={logo}
            alt=""
          /> */}
          <img src="https://fintechaera.org/wp-content/uploads/2017/11/cropped-Fintech-Aera_rechts_logo-01-2-1920x896.png" alt="" />
            </div>
          </div>
            
        </div>
      </div>

      {/* second half */}

      <div className="lg:w-[50%] h-[53%] relative xl:-left-[5%] lg:h-[100%]">
        <form
          onSubmit={handleLoginForm}
          className="w-[100%] h-[100%] flex flex-col items-center justify-around "
        >
          {/* heading */}
          <div className="text-purple-500 h-[10%] text-2xl md:text-4xl flex items-center font-medium font-['Poppins']">
            Login
          </div>

          {/* input values */}
          <div className="flex flex-col w-[80%] lg:p-[20px]  items-center h-[35%] rounded-[10px] ">
            <div className="w-[90%] h-[100%] flex flex-col justify-around ">
              <div className="flex h-[80px]  justify-around flex-col text-black">
                <label className="font-medium">Email id or Phone Number </label>
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
            </div>
          </div>

          {/* buttons */}
          <div className=" text-black flex flex-col h-[20%]  justify-around items-center w-[90%]">
            <button
              type="submit"
              disabled={isLoading}
              className="
                
                     bg-indigo-900  w-[20%] py-3 rounded-[60px] border  text-white flex items-center justify-around shadow  border-white 
            "
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className=" animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        <Link href={'/'}>  <p className="text-black text-[1rem]">Home</p></Link>

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
