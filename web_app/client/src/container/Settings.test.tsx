import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import user from "@testing-library/user-event";
import { Settings } from "./Settings";
import { allProviders } from "../test/test-utils";
import { Router } from "react-router-dom";
import { Dashboard } from "./Dashboard";

jest.mock("react-chartjs-2", () => ({
  Line: () => null,
}));

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    location: {
      pathname: "/settings",
    },
    push: mockHistoryPush,
  }),
}));

describe("Container/Settings", () => {
  afterEach(() => mockHistoryPush.mockClear());

  describe("render", () => {
    it("should render any input value", async () => {
      render(<Settings />, { wrapper: allProviders });
      await waitFor(() => expect(screen.getByTestId("live-id")).toHaveDisplayValue(/.+/));
    });
  });

  describe("when live id submitted", () => {
    it("should go /dashboard", async () => {
      render(<Settings />, {wrapper: allProviders});

      const liveIdInput = screen.getByTestId("live-id");
      await user.type(liveIdInput, "lkIJYc4UH60");
      const saveButton = screen.getByText("保存");
      user.click(saveButton);
      await waitFor(() => expect(mockHistoryPush).toBeCalled());

      expect(mockHistoryPush.mock.calls[0][0]).toBe("/dashboard");
    });
  });

  // ルーティングの変更をテストしたい場合は、<Router>の children に移動する可能性があるコンポーネントを全て入れる必要がある。
  // TODO: 割と不安定なので一旦 xdescribe にする
  xdescribe("when live id submitted", () => {
    it("should show notifier", async () => {
      jest.setTimeout(10000);
      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <Dashboard />
          <Settings />
        </Router>,
        {
          wrapper: allProviders,
        }
      );

      const liveIdInput = screen.getByTestId("live-id");
      await user.type(liveIdInput, "lkIJYc4UH60");
      const saveButton = screen.getByText("保存");
      user.click(saveButton);
      await screen.findByText(
        "配信IDを変更しました！",
        {},
        {
          timeout: 10000,
        }
      );
    });
  });
});
