"use client";

import { createContext, useState, useContext } from 'react';

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [checkoutData, setCheckoutData] = useState({
    files: {
      frontKey: null,
      backKey: null,
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

  const [loadingStates, setLoadingStates] = useState({
    payment: false,
    nav: false,
    api: false
  });

  const setLoading = (type, value) => {
    setLoadingStates(prev => ({ ...prev, [type]: value }));
  };

  const updateFiles = (frontKey, backKey) => {
    setCheckoutData(prev => ({
      ...prev,
      files: { frontKey, backKey }
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
    files: { frontKey: null, backKey: null },
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

  const anyLoading = Object.values(loadingStates).some(Boolean);

  return (
    <CheckoutContext.Provider value={{ 
      checkoutData, 
      updateFiles, 
      updateAddress, 
      clearCheckout,
      loadingStates,
      setLoading,
      anyLoading
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return useContext(CheckoutContext);
}
