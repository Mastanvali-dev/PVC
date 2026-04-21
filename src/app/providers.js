// app/providers.js
'use client';

import { SessionProvider } from "next-auth/react";
import { CheckoutProvider } from "@/context/CheckoutContext";

export default function Providers({ children }) {
  return (
    <SessionProvider 
      basePath=""
      baseUrl={process.env.NEXTAUTH_URL}
    >
      <CheckoutProvider>
        {children}
      </CheckoutProvider>
    </SessionProvider>
  );
}
