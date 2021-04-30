import React from "react";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";

export const allProviders: React.FC = ({ children}) => {
  return (
    <RecoilRoot>
      {children}
      <ToastContainer />
    </RecoilRoot>
  )
}
