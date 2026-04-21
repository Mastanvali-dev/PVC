import { Suspense } from "react";
import AddressPage from "@/components/AddressClient";

export default function Page() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <AddressPage />
    </Suspense>
  );
}