import React from "react";
import { MemoryRouter } from "react-router-dom";
import {
  render,
  screen,
} from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { RecoilRoot } from "recoil";

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

const allProviders: React.FC = ({ children }) => {
  return (
      <RecoilRoot>
        <MemoryRouter>
          {children}
        </MemoryRouter>
      </RecoilRoot>
  )
}

describe("Container/Dashboard", () => {
  describe("render",  () => {
    it("should render", async () => {
      render(<Dashboard />, {
        wrapper: allProviders,
      });

      await screen.findByText("テトリス実況プレイ");
      await screen.findByText("VTuber");
      await screen.findByText("ゲーム実況");
    });
  });
});
