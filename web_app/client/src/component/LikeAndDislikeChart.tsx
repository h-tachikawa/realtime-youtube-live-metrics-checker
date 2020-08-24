import { LiveDetail } from "../type";
import React from "react";
import { LivePresenter } from "../presenter";
import { ChartOptions } from "chart.js";
import { Segment } from "semantic-ui-react";
import { Line } from "react-chartjs-2";

interface Props {
  liveDetails: LiveDetail[];
}

export const LikeAndDislikeChart: React.FC<Props> = ({liveDetails}) => {
  const data = LivePresenter.constructLikeAndDislikeData(liveDetails);

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