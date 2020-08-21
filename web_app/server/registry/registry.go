package registry

import (
	"cloud.google.com/go/datastore"
	"example.com/analysis-youtube-app/web-app/domain"
	"example.com/analysis-youtube-app/web-app/handler"
	"example.com/analysis-youtube-app/web-app/infrastructure"
	"example.com/analysis-youtube-app/web-app/usecase"
)

var reg = &Registry{}

type Registry struct {
	GetConcurrentViewersRepository domain.LiveDetailRepository
	GetConcurrentViewersUsecase    usecase.LiveUsecase
	LiveHandler                    handler.LiveHandler
}

func Init(dsClient *datastore.Client) *Registry {
	reg.GetConcurrentViewersRepository = infrastructure.NewLiveDetailRepository(dsClient)
	reg.GetConcurrentViewersUsecase = usecase.NewLiveUsecase(reg.GetConcurrentViewersRepository)
	reg.LiveHandler = handler.NewGetLiveDetailsHandler(reg.GetConcurrentViewersUsecase)

	return reg
}
