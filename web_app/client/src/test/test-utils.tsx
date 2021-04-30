import React from "react";
import { RecoilRoot } from "recoil";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const allProviders: React.FC = ({ children }) => {
  return (
    <RecoilRoot>
      <MemoryRouter>
        {children}
      </MemoryRouter>
      <ToastContainer />
    </RecoilRoot>
  )
}
