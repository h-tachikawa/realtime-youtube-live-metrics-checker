import React from "react";
import { render, screen, } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { allProviders } from "../test/test-utils";
import { MemoryRouter } from "react-router-dom";
import { dummyApiResponse } from "../test/dummyApiResponse";

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

describe("Container/Dashboard", () => {
  describe("render",  () => {
    it("should render", async () => {
      render((
          <MemoryRouter>
            <Dashboard />
          </MemoryRouter>
      ), {
        wrapper: allProviders,
      });

      await screen.findByText(dummyApiResponse.liveSnippet.title);
      await screen.findByText(dummyApiResponse.liveSnippet.tags[0]);
      await screen.findByText(dummyApiResponse.liveSnippet.tags[1]);
    });
  });
});
