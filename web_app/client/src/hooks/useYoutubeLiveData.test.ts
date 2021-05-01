import { renderHook } from "@testing-library/react-hooks";
import { useYoutubeLiveData } from "./useYoutubeLiveData";

describe("hooks/useYoutubeLiveData", () => {
  describe("when called", () => {
    it("should return live data", async () => {
      const { result, waitFor } = renderHook(() => useYoutubeLiveData());
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current).toMatchInlineSnapshot(`
        Object {
          "isLoading": false,
          "liveDetails": Array [],
          "liveId": Object {
            "currentLiveId": "lkIJYc4UH60",
            "persistLiveId": [Function],
            "setLiveId": [Function],
          },
          "liveSnippet": Object {
            "channelTitle": "channelTitle",
            "liveUrl": "https://www.youtube.com/watch?v=videoId",
            "tags": Array [
              "VTuber",
              "ゲーム実況",
            ],
            "thumbnailImageUrl": "https://example.com/image.jpg",
            "title": "テトリス実況プレイ",
            "videoId": "videoId",
          },
        }
      `);
    });
  });
});
