"use client";

import { createContext, useState, useContext } from 'react';

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [checkoutData, setCheckoutData] = useState({
    files: {
      front: null,
      back: null,
    },
    address: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: ""
    }
  });

  const updateFiles = (front, back) => {
    setCheckoutData(prev => ({
      ...prev,
      files: { front, back }
    }));
  };

  const updateAddress = (addressData) => {
    setCheckoutData(prev => ({
      ...prev,
      address: { ...prev.address, ...addressData }
    }));
  };

  const clearCheckout = () => {
    setCheckoutData({
      files: { front: null, back: null },
      address: {
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
      }
    });
  };

  return (
    <CheckoutContext.Provider value={{ checkoutData, updateFiles, updateAddress, clearCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return useContext(CheckoutContext);
}
