package handler

import (
	"example.com/analysis-youtube-app/usecase"
	"github.com/labstack/echo"
	"log"
	"net/http"
)

func RecordCurrentLiveDetails(e echo.Context) error {
	ctx := e.Request().Context()

	createdTopicId, err := usecase.RecordCurrentLiveDetails(ctx)

	if err != nil {
		log.Println(err.Error())
		return e.String(http.StatusInternalServerError, err.Error())
	}

	return e.JSON(http.StatusOK, createdTopicId)
}
