import { useCallback, useEffect, useState } from "react";
import { LiveDetail, LiveSetting, LiveSnippet } from "../type";
import { LiveRepository } from "../repository";
import firebase, { firestore } from "../external/firebase";

export const useYoutubeLiveData = () => {
  const [liveId, setLiveId] = useState<string>("");
  const [liveDetails, setLiveDetails] = useState<LiveDetail[]>([]);
  const [liveSnippet, setLiveSnippet] = useState<LiveSnippet>({
    liveUrl: "",
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

    LiveRepository.fetchLiveSnippet(liveId).then(({ data }) => {
      data.liveUrl = `https://www.youtube.com/watch?v=${data.videoId}`;
      setLiveSnippet(data)
    });

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

  const persistLiveId = useCallback((liveId: string) => {
    return firestore.collection("settings").doc("setting").update({ videoId: liveId});
  }, []);

  return {
    liveId: {
      currentLiveId: liveId,
      setLiveId,
      persistLiveId,
    },
    liveDetails,
    liveSnippet
  };
};

const convertToLiveDetails = (querySnapshot: firebase.firestore.QuerySnapshot) => {
  const liveDetails: LiveDetail[] = [];
  querySnapshot.forEach((doc) => {
    const liveDetail = doc.data() as LiveDetail;
    liveDetails.push(liveDetail); // TODO: mutable なのが気持ち悪いので直したい
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