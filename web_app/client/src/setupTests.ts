// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { setupServer } from "msw/node";
import { rest } from "msw";
import { LiveSnippet } from "./type";

export const server = setupServer(
    rest.get(`${process.env.REACT_APP_API_ENDPOINT_BASE}/api/live/snippet/:liveId`, (req, res, ctx) => {
      return res(ctx.json({
        videoId: "videoId",
        channelTitle: "channelTitle",
        liveUrl: "https://example.com/live",
        tags: ["VTuber", "ゲーム実況"],
        thumbnailImageUrl: "https://example.com/image.jpg",
        title: "テトリス実況プレイ",
      } as LiveSnippet));
    }),
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
