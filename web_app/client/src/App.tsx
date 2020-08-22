import React from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { Header, Container, Icon, Label, List, Segment, Image, Grid, GridRow, GridColumn, Divider } from "semantic-ui-react";
import style from "./App.module.scss";
import { LivePresenter } from "./presenter";
import { AppHeader } from "./AppHeader";
import { useYoutubeLiveData, useNotifierEffect } from "./hooks";

const App: React.FC = () => {
  useNotifierEffect();
  const { liveSnippet, liveDetails } = useYoutubeLiveData();
  const { channelTitle, title, thumbnailImageUrl, tags, liveUrl } = liveSnippet;

  const ConcurrentViewersChart: React.FC = () => {
    const data = LivePresenter.constructConcurrentViewersData(liveDetails);

    const options: ChartOptions = {
      legend: {
        align: "end",
      },
      animation: {
        duration: 0
      }
    }

    return (
        <Segment>
          <Line data={data} options={options} />
        </Segment>
    )
  };

  const LikeAndDislikeChart: React.FC = () => {
    const data = LivePresenter.constructLikeAndDisslikeData(liveDetails);

    const options: ChartOptions = {
      legend: {
        align: "end",
      },
      animation: {
        duration: 0
      }
    }

    return (
        <Segment>
          <Line data={data} options={options} />
        </Segment>
    )
  };

  const LiveInformation: React.FC = () => (
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

  const DashboardHeader: React.FC = () => (
    <div>
      <Header as='h3'>
        <Header.Content>
          ダッシュボード
        </Header.Content>
      </Header>
      <Divider />
    </div>
  )

  return (
    <Container className={style.container}>
      <AppHeader />
      <DashboardHeader />
      <Grid columns={2}>
        <GridRow>
          <GridColumn>
            <ConcurrentViewersChart />
          </GridColumn>
          <GridColumn>
            <LikeAndDislikeChart />
          </GridColumn>
        </GridRow>
      </Grid>
      <LiveInformation />
    </Container>
  );
}

export default App;
