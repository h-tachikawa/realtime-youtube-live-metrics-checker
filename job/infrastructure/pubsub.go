package infrastructure

import (
	"cloud.google.com/go/pubsub"
	"context"
	"os"
)

func PublishMessage(ctx context.Context, topic string, message []byte) (string, error) {
	projectId := os.Getenv("GCP_PROJECT_ID")
	client, err := pubsub.NewClient(ctx, projectId)

	if err != nil {
		return "", err
	}

	result := client.TopicInProject(topic, projectId).Publish(ctx, &pubsub.Message{
		Data: message,
	})

	id, err := result.Get(ctx)

	if err != nil {
		return "", err
	}

	return id, nil
}
