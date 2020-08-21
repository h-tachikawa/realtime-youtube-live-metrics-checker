package infrastructure

import (
	"cloud.google.com/go/datastore"
	"context"
	"example.com/analysis-youtube-app/web-app/domain"
	"github.com/go-resty/resty/v2"
	"os"
	"time"
)

type LiveDetailRepository struct {
	client *datastore.Client
}

func NewLiveDetailRepository(client *datastore.Client) LiveDetailRepository {
	return LiveDetailRepository{client: client}
}

func (l LiveDetailRepository) GetAll(ctx context.Context, liveId string) ([]domain.LiveDetailEntity, error) {
	var liveDetailEntities []domain.LiveDetailEntity

	q := datastore.NewQuery("Live").
		Filter("videoId = ", liveId).
		Order("time").
		Limit(20)

	if _, err := l.client.GetAll(ctx, q, &liveDetailEntities); err != nil {
		return nil, err
	}

	return liveDetailEntities, nil
}

type GetAllSnippetResponse struct {
	Kind  string `json:"kind"`
	Etag  string `json:"etag"`
	Items []struct {
		Kind    string `json:"kind"`
		Etag    string `json:"etag"`
		ID      string `json:"id"`
		Snippet struct {
			PublishedAt time.Time `json:"publishedAt"`
			ChannelID   string    `json:"channelId"`
			Title       string    `json:"title"`
			Description string    `json:"description"`
			Thumbnails  struct {
				Default struct {
					URL    string `json:"url"`
					Width  int    `json:"width"`
					Height int    `json:"height"`
				} `json:"default"`
				Medium struct {
					URL    string `json:"url"`
					Width  int    `json:"width"`
					Height int    `json:"height"`
				} `json:"medium"`
				High struct {
					URL    string `json:"url"`
					Width  int    `json:"width"`
					Height int    `json:"height"`
				} `json:"high"`
				Standard struct {
					URL    string `json:"url"`
					Width  int    `json:"width"`
					Height int    `json:"height"`
				} `json:"standard"`
				Maxres struct {
					URL    string `json:"url"`
					Width  int    `json:"width"`
					Height int    `json:"height"`
				} `json:"maxres"`
			} `json:"thumbnails"`
			ChannelTitle         string   `json:"channelTitle"`
			Tags                 []string `json:"tags"`
			CategoryID           string   `json:"categoryId"`
			LiveBroadcastContent string   `json:"liveBroadcastContent"`
			Localized            struct {
				Title       string `json:"title"`
				Description string `json:"description"`
			} `json:"localized"`
		} `json:"snippet"`
	} `json:"items"`
	PageInfo struct {
		TotalResults   int `json:"totalResults"`
		ResultsPerPage int `json:"resultsPerPage"`
	} `json:"pageInfo"`
}

func (l LiveDetailRepository) GetSnippet(liveId string) (*domain.LiveSnippetEntity, error) {
	ytApiKey := os.Getenv("YT_API_KEY")
	httpClient := resty.New()

	url := "https://www.googleapis.com/youtube/v3/videos"
	params := map[string]string{
		"key":  ytApiKey,
		"id":   liveId,
		"part": "snippet",
	}

	res, err := httpClient.R().SetQueryParams(params).SetResult(GetAllSnippetResponse{}).Get(url)

	if err != nil {
		return nil, err
	}

	liveDetails := res.Result().(*GetAllSnippetResponse).Items[0]
	liveSnippet := domain.LiveSnippetEntity{
		VideoId:           liveId,
		Title:             liveDetails.Snippet.Title,
		ThumbnailImageUrl: liveDetails.Snippet.Thumbnails.High.URL,
		ChannelTitle:      liveDetails.Snippet.ChannelTitle,
		Tags:              liveDetails.Snippet.Tags,
	}

	return &liveSnippet, nil
}
