package infrastructure

import (
	"example.com/analysis-youtube-app/domain"
	"github.com/go-resty/resty/v2"
	"os"
)

var ytApiKey = os.Getenv("YT_API_KEY")
var httpClient = resty.New()

func GetLiveDetails(videoId string) (*domain.LiveDetails, error) {
	url := "https://www.googleapis.com/youtube/v3/videos"
	params := map[string]string{
		"key":  ytApiKey,
		"id":   videoId,
		"part": "liveStreamingDetails,statistics",
	}

	res, err := httpClient.R().SetQueryParams(params).SetResult(&domain.GetVideoListResponse{}).Get(url)

	if err != nil {
		return nil, err
	}

	chatId := res.Result().(*domain.GetVideoListResponse).Items[0].LiveStreamingDetails.ActiveLiveChatID
	liveDetails := res.Result().(*domain.GetVideoListResponse).Items[0]
	chatDetails := &domain.LiveDetails{
		LiveId:            videoId,
		ChatId:            chatId,
		ConcurrentViewers: liveDetails.LiveStreamingDetails.ConcurrentViewers,
		LikeCount:         liveDetails.Statistics.LikeCount,
		DislikeCount:      liveDetails.Statistics.DislikeCount,
	}

	return chatDetails, nil
}

func GetLiveChatMessages(chatId string) (*domain.LiveChatMessages, error) {
	url := "https://www.googleapis.com/youtube/v3/liveChat/messages"
	params := map[string]string{
		"key":        ytApiKey,
		"liveChatId": chatId,
		"part":       "id,snippet,authorDetails",
		"maxResults": "50",
	}

	res, err := httpClient.R().SetQueryParams(params).SetResult(&domain.LiveChatMessages{}).Get(url)

	if err != nil {
		return nil, err
	}

	chat := res.Result().(*domain.LiveChatMessages)

	return chat, nil
}
