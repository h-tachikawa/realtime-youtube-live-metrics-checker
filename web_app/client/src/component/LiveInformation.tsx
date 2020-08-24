import React from "react";
import { Header, Icon, Image, Label, List, Segment } from "semantic-ui-react";

export interface Props {
  thumbnailImageUrl: string;
  liveUrl: string;
  channelTitle: string;
  title: string;
  tags: string[];
}

export const LiveInformation: React.FC<Props> = ({ thumbnailImageUrl, liveUrl, channelTitle, title, tags }) => (
    <Segment>
      <Header as='h3'>
        <Icon name='youtube play' size='tiny' color="red"/>
        <Header.Content>
          配信情報
        </Header.Content>
      </Header>
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
          <List.Header>設定されているタグ</List.Header>
          {tags == null ? "なし" : tags.map((tagText, i) => (
              <Label as='a' tag key={i}>
                {tagText}
              </Label>
          ))}
        </List.Item>
      </List>
    </Segment>
)