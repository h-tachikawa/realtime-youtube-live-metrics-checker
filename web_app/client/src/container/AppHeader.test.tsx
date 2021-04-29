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

      await waitFor(() => expect(mockHistoryPush).toBeCalled());

      expect(mockHistoryPush.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "/dashboard",
          ],
        ]
      `);
    });
  });

  describe("when setting link clicked", () => {
    it("should move to /settings path", () => {
      render(<AppHeader />);
      const settingsLink = screen.getByTestId("settings");
      user.click(settingsLink);

      expect(mockHistoryPush.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "/settings",
          ],
        ]
      `);
    });
  });
});
