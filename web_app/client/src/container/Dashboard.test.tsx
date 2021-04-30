import React from "react";
import { render, screen, } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { allProviders } from "../test/test-utils";

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

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