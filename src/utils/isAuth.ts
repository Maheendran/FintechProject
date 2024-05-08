import { NextRequest } from "next/server";
import { cookies } from 'next/headers'
const isAuthenticated = async (req: NextRequest) => {
  try {
    // const cookiesAccessToken: any = req?.cookies.get("Token");
    // if (!cookiesAccessToken.value && !cookiesAccessToken.name) {
    //   return false;
    // }
    const cookiesAccessToken: any =  cookies().get("Token");
if (!cookiesAccessToken) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("internal server error " + error);
    return false;
  }
};

export default isAuthenticated;
