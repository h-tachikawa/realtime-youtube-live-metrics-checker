import React from "react";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import { notifierState } from "../recoil/atom/notifier";

export const allProviders: React.FC = ({ children}) => {
  return (
    <RecoilRoot initializeState={(snap) => snap.set(notifierState, { type: "none" })}>
      {children}
      <ToastContainer />
    </RecoilRoot>
  )
}
