import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
  providers: [
    
  ],
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST, handler as DELETE, handler as PUT};
