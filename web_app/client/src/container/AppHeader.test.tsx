import React from "react";
import {
  render,
  screen,
} from "@testing-library/react";
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
      screen.getByTestId("dashboard").click();

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
      screen.getByTestId("settings").click();

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
