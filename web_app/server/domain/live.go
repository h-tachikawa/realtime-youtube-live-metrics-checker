package domain

import (
	"context"
)

type LiveDetailEntity struct {
	ChatId            string `json:"chatId"`
	VideoId           string `json:"videoId"`
	Time              string `json:"time"`
	ConcurrentViewers string `json:"concurrentViewers"`
	LikeCount         string `json:"likeCount"`
	DislikeCount      string `json:"dislikeCount"`
}

type LiveSnippetEntity struct {
	VideoId           string   `json:"videoId"`
	Title             string   `json:"title"`
	ThumbnailImageUrl string   `json:"thumbnailImageUrl"`
	ChannelTitle      string   `json:"channelTitle"`
	Tags              []string `json:"tags"`
}

type LiveDetailRepository interface {
	GetAll(ctx context.Context, liveId string) ([]LiveDetailEntity, error)
	GetSnippet(liveId string) (*LiveSnippetEntity, error)
}
