import React from "react";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import user from "@testing-library/user-event";
import { Settings } from "./Settings";
import { allProviders } from "../test/test-utils";
import { Router, MemoryRouter } from "react-router-dom";
import { Dashboard } from "./Dashboard";

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

// ルーティングが絡む処理はあるがテストの関心事にルーティングが無い場合は、<MemoryRouter> の children にテスト対象を渡せば良い。
// 参考: https://testing-library.com/docs/example-react-router
describe("Container/Settings", () => {
  describe("render",  () => {
    it("should render any input value", async () => {
      render((
          <MemoryRouter>
            <Settings />
          </MemoryRouter>
      ), {
        wrapper: allProviders,
      });

      await waitFor(() => expect(screen.getByTestId("live-id")).toHaveDisplayValue(/.+/));
    });
  });

  /**
   * ルーティングの変更をテストしたい場合は、<Router>の children に移動する可能性があるコンポーネントを全て入れる必要がある。
   * ここまで来るともはや E2E テストだし、Cypress などを使って検証した方が楽かも？
   */
  describe("when live id submitted", () => {
    it("should show notifier", async () => {
      const history = createMemoryHistory();
      render((
          <Router history={history}>
            <Dashboard />
            <Settings />
          </Router>
      ), {
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
