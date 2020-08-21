package infrastructure

import (
	"context"
	firebase "firebase.google.com/go"
	"log"
	"os"
)

type Setting struct {
	VideoId string
}

func GetVideoId(ctx context.Context) (string, error) {
	projectID := os.Getenv("GCP_PROJECT_ID")
	conf := &firebase.Config{ProjectID: projectID}

	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()

	setting, err := client.Collection("settings").Doc("setting").Get(ctx)

	if err != nil {
		log.Fatalln(err)
	}

	var st Setting
	if err := setting.DataTo(&st); err != nil {
		log.Fatalln(err)
	}

	log.Println("videoId", st.VideoId)
	return st.VideoId, nil
}
