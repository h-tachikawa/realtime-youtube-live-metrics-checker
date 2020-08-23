import { LivePresenter } from "./live";
import { LiveDetail } from "../type";

describe("LivePresenter", () => {
  let liveDetails: LiveDetail[];

  beforeEach(() => {
    liveDetails = [{
      videoId: "videoId",
      concurrentViewers: 10,
      likeCount: 1,
      dislikeCount: 2,
      time: "2020-01-12",
    }];
  });

  describe("#constructConcurrentViewersData()", () => {
    it("視聴者数を含む", () => {
      const actual = LivePresenter.constructConcurrentViewersData(liveDetails);
      // @ts-ignore
      expect(actual.datasets[0].data[0]).toBe(10);
    });
  });

  describe("#constructLikeAndDislikeData()", () => {
    it("グッド数を含む", () => {
      const actual = LivePresenter.constructLikeAndDislikeData(liveDetails);
      // @ts-ignore
      expect(actual.datasets[0].data[0]).toBe(1);
    });

    it("バッド数を含む", () => {
      const actual = LivePresenter.constructLikeAndDislikeData(liveDetails);
      // @ts-ignore
      expect(actual.datasets[1].data[0]).toBe(2);
    });
  });
});