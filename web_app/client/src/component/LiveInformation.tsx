import React from "react";
import { Grid, Header, Icon, Image, Label, List, Segment } from "semantic-ui-react";
import FadeLoader from "react-spinners/FadeLoader";
import { YOUTUBE_RED } from "../colors";

export interface Props {
  isLoading: boolean;
  thumbnailImageUrl: string;
  liveUrl: string;
  channelTitle: string;
  title: string;
  tags: string[];
}

const Loading: React.VFC = () => (
    <Grid centered>
      <Grid.Row centered>
        <FadeLoader loading={true} color={YOUTUBE_RED} height={15} width={5} radius={2} margin={2} />
      </Grid.Row>
    </Grid>
);

export const LiveInformation: React.FC<Props> = ({ thumbnailImageUrl, liveUrl, channelTitle, title, tags, isLoading }) => (
    <Segment>
      <Header as='h3'>
        <Icon name='youtube play' size='tiny' color="red"/>
        <Header.Content>
          配信情報
        </Header.Content>
      </Header>
      {
        isLoading ?
            <Loading /> : (
            <div>
              <Image src={thumbnailImageUrl} size="medium" as="a" href={liveUrl} target="_blank" />
              <List >
                <List.Item>
                  <List.Header>チャンネル名</List.Header>
                  {channelTitle}
                </List.Item>
                <List.Item>
                  <List.Header>配信名</List.Header>
                  {title}
                </List.Item>
                <List.Item>
                  <List.Header>設定されているタグ一覧</List.Header>
                  {tags == null ? "なし" : tags.map((tagText, i) => (
                      <Label as='a' tag key={i}>
                        {tagText}
                      </Label>
                  ))}
                </List.Item>
              </List>
            </div>
        )
      }
    </Segment>
)
