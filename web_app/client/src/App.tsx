import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { Header, Container, Icon, Label, List, Segment, Menu, Popup, Image, Grid, GridRow, GridColumn, Divider } from "semantic-ui-react";
import style from "./App.module.scss";
import { LiveRepository } from "./repository";
import { LivePresenter } from "./presenter";
import { LiveDetail, LiveSetting, LiveSnippet } from "./type";
import firebase from "firebase";
import { firestore } from "./external/firebase";

export const convertToLiveDetails = (querySnapshot: firebase.firestore.QuerySnapshot) => {
  const liveDetails: LiveDetail[] = [];
  querySnapshot.forEach((doc) => {
    const liveDetail = doc.data() as LiveDetail;
    liveDetails.push(liveDetail); // mutable なのが気持ち悪いので直したい
  });

  liveDetails.sort((a, b) => {
    if (a.time < b.time) {
      return -1;
    }

    if (a.time > b.time) {
      return 1;
    }

    return 0;
  });

  return liveDetails;
};

const App: React.FC = () => {
  const [liveId, setLiveId] = useState<string>("");
  const [liveDetails, setLiveDetails] = useState<LiveDetail[]>([]);
  const [liveSnippet, setLiveSnippet] = useState<LiveSnippet>({
    channelTitle: "",
    tags: [],
    thumbnailImageUrl: "",
    title: "",
    videoId: ""
  });

  useEffect(() => {
    firestore.collection("settings").doc("setting").get().then((docSnapshot) => {
      const res = docSnapshot.data() as LiveSetting;
      setLiveId((res.videoId));
    });
  }, []);

  useEffect(() => {
    if (!liveId) {
      return;
    }

    LiveRepository.fetchLiveSnippet(liveId).then(({ data }) => setLiveSnippet(data));

    const unsubscribe = firestore.collection("lives")
        .where("videoId", "==", liveId)
        .orderBy("time", "desc")
        .limit(10)
        .onSnapshot((querySnapshot) => {
          const liveDetails = convertToLiveDetails(querySnapshot)
          setLiveDetails(liveDetails);
        });

    return () => unsubscribe();
  }, [setLiveDetails, liveId]);

  const { channelTitle, title, thumbnailImageUrl, tags, videoId } = liveSnippet;
  const liveUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const AppHeader: React.FC = () => {
    const popupStyle = {
      borderRadius: 0,
      opacity: 0.7,
    };

    return (
      <header className={style.menuContainer}>
        <Menu fixed="top" pointing secondary size="large" className={style.menuContainer} inverted>
          <Menu.Item header>
            Realtime Youtube Live Metrics Checker
          </Menu.Item>
          <Menu.Item link active className={style.menuItem}>
            <Icon name="home"/>
            ホーム
          </Menu.Item>
          <Menu.Item link className={style.menuItem}>
            <Icon name="setting"/>
            設定
          </Menu.Item>
          <Menu.Menu position="right">
            <Popup
                content="アプリケーションからログアウトします。"
                trigger={
                  <Menu.Item link className={style.menuItem}>
                    <Icon name="log out"/>
                  </Menu.Item>
                }
                position="bottom right"
                inverted
                style={popupStyle}
            />
          </Menu.Menu>
        </Menu>
      </header>
    );
  };

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
