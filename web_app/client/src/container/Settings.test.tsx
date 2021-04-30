import React from "react";
import {
  render,
  screen, waitFor,
} from "@testing-library/react";
import { Settings } from "./Settings";
import { allProviders } from "../test/test-utils";

describe("Container/Settings", () => {
  describe("render",  () => {
    it("should render any input value", async () => {
      render(<Settings />, {
        wrapper: allProviders,
      });

      await waitFor(() => expect(screen.getByTestId("live-id")).toHaveDisplayValue(/.+/));
    });
  });
});
