export interface LiveDetail {
  videoId: string;
  concurrentViewers: number;
  likeCount: number;
  dislikeCount: number;
  time: string;
}

export interface LiveSnippet {
  liveUrl: string;
  videoId: string;
  title: string;
  thumbnailImageUrl: string;
  channelTitle: string;
  tags: string[];
}

export interface LiveSetting {
  videoId: string;
}