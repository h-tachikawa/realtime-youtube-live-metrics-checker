package usecase

import (
	"context"
	"example.com/analysis-youtube-app/web-app/domain"
)

type LiveUsecase struct {
	ldr domain.LiveDetailRepository
}

func NewLiveUsecase(ldRepo domain.LiveDetailRepository) LiveUsecase {
	return LiveUsecase{ldRepo}
}

func (g LiveUsecase) GetLiveDetails(ctx context.Context, liveId string) ([]domain.LiveDetailEntity, error) {
	liveDetailEntities, err := g.ldr.GetAll(ctx, liveId)

	if err != nil {
		return nil, err
	}

	return liveDetailEntities, nil
}

func (g LiveUsecase) GetLiveSnippet(liveId string) (*domain.LiveSnippetEntity, error) {
	snippet, err := g.ldr.GetSnippet(liveId)

	if err != nil {
		return nil, err
	}

	return snippet, nil
}
