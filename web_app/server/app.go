package main

import (
	"cloud.google.com/go/datastore"
	"context"
	"example.com/analysis-youtube-app/web-app/registry"
	"fmt"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"log"
	"net/http"
	"os"
)

func main() {
	ctx := context.Background()
	projectId := os.Getenv("GCP_PROJECT_ID")
	dsClient, err := datastore.NewClient(ctx, projectId)

	if err != nil {
		panic("Datastore client can not initialize")
	}

	reg := registry.Init(dsClient)

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	http.Handle("/", e)

	api := e.Group("/api")
	api.GET("/live/details/:id", reg.LiveHandler.GetLiveDetails)
	api.GET("/live/snippet/:id", reg.LiveHandler.GetLiveSnippet)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	log.Printf("Listening on port %s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}
