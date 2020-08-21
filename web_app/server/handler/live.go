package handler

import (
	"example.com/analysis-youtube-app/web-app/usecase"
	"github.com/labstack/echo"
	"net/http"
)

type LiveHandler struct {
	liveUsecase usecase.LiveUsecase
}

func NewGetLiveDetailsHandler(u usecase.LiveUsecase) LiveHandler {
	return LiveHandler{liveUsecase: u}
}

func (lh LiveHandler) GetLiveDetails(e echo.Context) error {
	liveId := e.Param("id")

	ctx := e.Request().Context()
	liveDetails, err := lh.liveUsecase.GetLiveDetails(ctx, liveId)

	if err != nil {
		return e.String(http.StatusInternalServerError, err.Error())
	}

	return e.JSON(http.StatusOK, liveDetails)
}

func (lh LiveHandler) GetLiveSnippet(e echo.Context) error {
	liveId := e.Param("id")

	snippet, err := lh.liveUsecase.GetLiveSnippet(liveId)

	if err != nil {
		return e.String(http.StatusInternalServerError, err.Error())
	}

	return e.JSON(http.StatusOK, snippet)
}
