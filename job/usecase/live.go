package usecase

import (
	"context"
	"encoding/json"
	"example.com/analysis-youtube-app/domain"
	"example.com/analysis-youtube-app/infrastructure"
	"log"
	"os"
	"time"
)

/**
Youtube 以外のインフラに差し替えて成り立つアプリではないので、直接インフラ層に依存することを許容している。
Usecase 層のテスタビリティを考えたら差し替え可能にした方が良いが、そもそも実運用に乗せるつもりはない(=自動テストのコスパが悪い)ので妥協した。
長く運用するようなら、ちゃんと DI するように作り変える。
*/
func RecordCurrentLiveDetails(ctx context.Context) (string, error) {
	videoId, err := infrastructure.GetVideoId(ctx)

	if err != nil {
		log.Println("Can't get video id")
		return "", err
	}

	liveDetails, err := infrastructure.GetLiveDetails(videoId)

	if err != nil {
		log.Println(err.Error())
		return "", nil
	}

	chatDetails, err := infrastructure.GetLiveChatMessages(liveDetails.ChatId)

	if err != nil {
		log.Println(err.Error())
		return "", nil
	}

	message, err := constructMessage(videoId, chatDetails, liveDetails)

	if err != nil {
		log.Println(err.Error())
		return "", nil
	}

	topic := os.Getenv("PUBSUB_TOPIC")
	createdTopicId, err := infrastructure.PublishMessage(ctx, topic, message)

	if err != nil {
		log.Println(err.Error())
		return "", nil
	}

	return createdTopicId, nil
}

func constructMessage(videoId string, chat *domain.LiveChatMessages, liveDetails *domain.LiveDetails) ([]byte, error) {
	var response []*domain.LiveDetail

	if chat.Items == nil {
		res := &domain.LiveDetail{
			VideoId:           liveDetails.LiveId,
			ChatId:            "",
			ConcurrentViewers: liveDetails.ConcurrentViewers,
			UserName:          "",
			Message:           "",
			PublishedAt:       time.Now(),
			LikeCount:         liveDetails.LikeCount,
			DislikeCount:      liveDetails.DislikeCount,
		}
		response = append(response, res)
	} else {
		for _, ci := range chat.Items {
			usr := ci.AuthorDetails.DisplayName
			msg := ci.Snippet.DisplayMessage
			chatInfo := &domain.LiveDetail{
				VideoId:           videoId,
				ChatId:            liveDetails.ChatId,
				ConcurrentViewers: liveDetails.ConcurrentViewers,
				LikeCount:         liveDetails.LikeCount,
				DislikeCount:      liveDetails.DislikeCount,
				UserName:          usr,
				Message:           msg,
				PublishedAt:       ci.Snippet.PublishedAt,
			}
			response = append(response, chatInfo)
		}
	}

	responseAsByteArr, err := json.Marshal(response)

	if err != nil {
		return nil, err
	}

	return responseAsByteArr, nil
}
