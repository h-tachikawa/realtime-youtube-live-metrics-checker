import React from "react";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import user from "@testing-library/user-event";
import { AppHeader } from "./AppHeader";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    location: {
      pathname: "/",
    },
    push: mockHistoryPush,
  }),
}));

describe("Container/AppHeader", () => {
  beforeEach(() => {
    mockHistoryPush.mockClear();
  });

  describe("render", () => {
    it("should render title", () => {
      render(<AppHeader />);
      const testIds = ["title", "dashboard", "settings"];

      testIds.forEach(testId => expect(screen.getByTestId(testId)).toBeDefined());
    });
  });

  describe("when dashboard link clicked", () => {
    it("should move to /dashboard path", async () => {
      render(<AppHeader />);
      const dashboardLink = screen.getByTestId("dashboard");
      user.click(dashboardLink);

      /**
       * expect(mockHistoryPush).toBeCalled() が true になるまでここまで待つことができる。
       * なお、現状 --env jest-environment-jsdom-fourteen オプションを jest コマンドに渡さないと、
       * "TypeError: MutationObserver is not a constructor" エラーが出てしまうので注意。
       */
      await waitFor(() => expect(mockHistoryPush).toBeCalled());

      expect(mockHistoryPush.mock.calls[0][0]).toBe("/dashboard");
    });
  });

  describe("when setting link clicked", () => {
    it("should move to /settings path", () => {
      render(<AppHeader />);
      const settingsLink = screen.getByTestId("settings");
      user.click(settingsLink);

      expect(mockHistoryPush.mock.calls[0][0]).toBe("/settings");
    });
  });
});
