import React from "react";
import { useYoutubeLiveData, useNotifierEffect } from "../hooks";
import { Dashboard as ViewComponent } from "../component";

export const Dashboard: React.FC = () => {
  useNotifierEffect();
  const { isLoading, liveSnippet, liveDetails } = useYoutubeLiveData();

  return (
    <ViewComponent liveDetails={liveDetails} liveInformation={{...liveSnippet, isLoading}} />
  );
}
