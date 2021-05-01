import { LiveSnippet } from "../type";

type DummyApiResponse = {
  liveSnippet: LiveSnippet;
};

export const dummyApiResponse: DummyApiResponse = {
  liveSnippet: {
    videoId: "videoId",
    channelTitle: "channelTitle",
    liveUrl: "https://example.com/live",
    tags: ["VTuber", "ゲーム実況"],
    thumbnailImageUrl: "https://example.com/image.jpg",
    title: "テトリス実況プレイ",
  },
};
