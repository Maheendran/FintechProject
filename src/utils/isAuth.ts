import { NextRequest } from "next/server";

const isAuthenticated = async (req: NextRequest) => {
  try {
    const cookiesAccessToken: any = req?.cookies.get("Token");
    if (!cookiesAccessToken.value && !cookiesAccessToken.name) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("internal server error " + error);
    return false;
  }
};

export default isAuthenticated;
