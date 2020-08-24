import React from "react";
import { Container, Grid, GridColumn, GridRow } from "semantic-ui-react";
import style from "./App.module.scss";
import { AppHeader } from "../container";
import { DashboardHeader } from "./DashboardHeader";
import { ConcurrentViewersChart } from "./ConcurrentViewersChart";
import { LikeAndDislikeChart } from "./LikeAndDislikeChart";
import { LiveInformation, Props as LiveInformationProps } from "./LiveInformation";
import { LiveDetail } from "../type";

interface Props {
  liveDetails: LiveDetail[],
  liveInformation: LiveInformationProps;
}

export const Dashboard: React.FC<Props> = ({ liveDetails, liveInformation }) => (
  <Container className={style.container}>
    <AppHeader />
    <DashboardHeader />
    <Grid columns={2}>
      <GridRow>
        <GridColumn>
          <ConcurrentViewersChart liveDetails={liveDetails}/>
        </GridColumn>
        <GridColumn>
          <LikeAndDislikeChart liveDetails={liveDetails} />
        </GridColumn>
      </GridRow>
    </Grid>
    <LiveInformation {...liveInformation}/>
  </Container>
);