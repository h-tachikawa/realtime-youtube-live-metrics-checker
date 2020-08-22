package domain

import "time"

type GetVideoListResponse struct {
	Kind     string  `json:"kind"`
	Etag     string  `json:"etag"`
	Items    []Video `json:"items"`
	PageInfo struct {
		TotalResults   int `json:"totalResults"`
		ResultsPerPage int `json:"resultsPerPage"`
	} `json:"pageInfo"`
}

type LiveDetails struct {
	LiveId            string
	ChatId            string
	ConcurrentViewers string
	LikeCount         string
	DislikeCount      string
}

type Video struct {
	Kind                 string `json:"kind"`
	Etag                 string `json:"etag"`
	ID                   string `json:"id"`
	LiveStreamingDetails struct {
		ActualStartTime    time.Time `json:"actualStartTime"`
		ScheduledStartTime time.Time `json:"scheduledStartTime"`
		ConcurrentViewers  string    `json:"concurrentViewers"`
		ActiveLiveChatID   string    `json:"activeLiveChatId"`
	} `json:"liveStreamingDetails"`
	Statistics struct {
		ViewCount     string `json:"viewCount"`
		LikeCount     string `json:"likeCount"`
		DislikeCount  string `json:"dislikeCount"`
		FavoriteCount string `json:"favoriteCount"`
		CommentCount  string `json:"commentCount"`
	} `json:"statistics"`
}

type LiveChatMessages struct {
	Kind                  string `json:"kind"`
	Etag                  string `json:"etag"`
	PollingIntervalMillis int    `json:"pollingIntervalMillis"`
	PageInfo              struct {
		TotalResults   int `json:"totalResults"`
		ResultsPerPage int `json:"resultsPerPage"`
	} `json:"pageInfo"`
	NextPageToken string `json:"nextPageToken"`
	Items         []struct {
		Kind    string `json:"kind"`
		Etag    string `json:"etag"`
		ID      string `json:"id"`
		Snippet struct {
			Type               string    `json:"type"`
			LiveChatID         string    `json:"liveChatId"`
			AuthorChannelID    string    `json:"authorChannelId"`
			PublishedAt        time.Time `json:"publishedAt"`
			HasDisplayContent  bool      `json:"hasDisplayContent"`
			DisplayMessage     string    `json:"displayMessage"`
			TextMessageDetails struct {
				MessageText string `json:"messageText"`
			} `json:"textMessageDetails"`
		} `json:"snippet"`
		AuthorDetails struct {
			ChannelID       string `json:"channelId"`
			ChannelURL      string `json:"channelUrl"`
			DisplayName     string `json:"displayName"`
			ProfileImageURL string `json:"profileImageUrl"`
			IsVerified      bool   `json:"isVerified"`
			IsChatOwner     bool   `json:"isChatOwner"`
			IsChatSponsor   bool   `json:"isChatSponsor"`
			IsChatModerator bool   `json:"isChatModerator"`
		} `json:"authorDetails"`
	} `json:"items"`
}

type LiveDetail struct {
	VideoId           string    `json:"videoId"`
	ChatId            string    `json:"chatId"`
	ConcurrentViewers string    `json:"concurrentViewers"`
	UserName          string    `json:"userName"`
	Message           string    `json:"message"`
	PublishedAt       time.Time `json:"publishedAt"`
	LikeCount         string    `json:"likeCount"`
	DislikeCount      string    `json:"dislikeCount"`
}
