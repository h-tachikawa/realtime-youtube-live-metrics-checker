import React from "react";
import {
  render,
  screen,
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

  describe("when dashboard clicked", () => {
    it("should move to /dashboard path", () => {
      render(<AppHeader />);
      const dashboardLink = screen.getByTestId("dashboard");
      user.click(dashboardLink);

      expect(mockHistoryPush.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "/dashboard",
          ],
        ]
      `);
    });
  });

  describe("when setting clicked", () => {
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
