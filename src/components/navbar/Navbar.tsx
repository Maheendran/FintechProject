"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoMdLogOut } from "react-icons/io";
const Navbar = () => {
  const router = useRouter();
  const handleLogOut = () => {
    Cookies.remove("Token");
    router.push("/login");
  };
  const [auth, setAuth] = useState(true);
  useEffect(() => {
    const tokenExist = Cookies.get("Token");
    if (!tokenExist) {
      return setAuth(false);
    }
    setAuth(true);
  }, []);

  return (
    <div className="w-full bg-white border text-black flex justify-between  h-[8.5vh]  relative">
      <div className="flex gap-3">
        <div className="w-[7rem] h-full">
          <Image className="w-full h-full" src={logo} alt="logo" />
        </div>
        <div>
          <ul className="flex gap-2 w-fit h-full">
            <li className="my-auto">About</li>
            <li className="my-auto">Careers</li>
            <li className="my-auto">History</li>
            <li className="my-auto">Services</li>
            <li className="my-auto">Projects</li>
            <li className="my-auto">Blog</li>
          </ul>
        </div>
      </div>
      <div className="flex  relative px-4">
        {auth ? (
          <button
            className="my-auto flex gap-3  border-2  py-2  px-4 button2 relative  "
            onClick={handleLogOut}
          >
            Logout
            <span>
              <IoMdLogOut className="text-[1.5rem] text-black my-auto logouticon ml-2" />
            </span>
          </button>
        ) : (
          <div className="flex gap-2  px-4 my-auto">
            <Link href={"/login"}>
              <button className="button2 relative px-4 py-2">Login</button>
            </Link>

            <button className="px-4 my-auto button2 relative py-2">Register</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
