import dayjs from "dayjs";
import { ChartData } from "chart.js";
import { LiveDetail } from "../type";

const constructConcurrentViewersData = (liveDetails: LiveDetail[]): ChartData => {
  const labels = liveDetails.map(({ time }) => dayjs(time).format("HH:mm:ss"));
  const concurrentViewers = liveDetails.map(({ concurrentViewers }) => concurrentViewers);

  return {
    labels,
    datasets: [
      {
        label: "視聴者数",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "#FF0000",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: concurrentViewers,
      },
    ]
  };
}

const constructLikeAndDisslikeData = (liveDetails: LiveDetail[]): ChartData => {
  const labels = liveDetails.map(({ time }) => dayjs(time).format("HH:mm:ss"));
  const likeCount = liveDetails.map(({ likeCount }) => likeCount);
  const dislikeCount = liveDetails.map(({ dislikeCount }) => dislikeCount);

  return {
    labels,
    datasets: [
      {
        label: "高評価数",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "#3EA6FF",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: likeCount,
      },
      {
        label: "低評価数",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "#282828",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dislikeCount,
      }
    ]
  };
}

export const LivePresenter = {
  constructConcurrentViewersData, constructLikeAndDisslikeData
};