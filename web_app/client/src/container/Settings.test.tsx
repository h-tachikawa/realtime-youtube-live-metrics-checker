import React from "react";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import user from "@testing-library/user-event";
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

  describe("when live id submitted", () => {
    it("should show notifier", async () => {
      render(<Settings />, {
        wrapper: allProviders,
      });

      const liveIdInput = screen.getByTestId("live-id");
      await user.type(liveIdInput, "lkIJYc4UH60");
      const saveButton = screen.getByText("保存");
      user.click(saveButton);
      await screen.findByText("配信IDを変更しました！", {}, {
        timeout: 4500,
      });
    });
  });
});
