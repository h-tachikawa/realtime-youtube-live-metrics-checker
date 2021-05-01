import { useCallback, useEffect, useState } from "react";
import { LiveDetail, LiveSetting, LiveSnippet } from "../type";
import { LiveRepository } from "../repository";
import firebase, { firestore } from "../external/firebase";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";

type WrappedError = {
  raw: Error | null;
  description: string;
};

export const useYoutubeLiveData = () => {
  const [liveId, setLiveId] = useState<string>("");
  const [liveDetails, setLiveDetails] = useState<LiveDetail[]>([]);
  const [liveSnippet, setLiveSnippet] = useState<LiveSnippet>({
    liveUrl: "",
    channelTitle: "",
    tags: [],
    thumbnailImageUrl: "",
    title: "",
    videoId: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    firestore
      .collection("settings")
      .doc("setting")
      .get()
      .then((docSnapshot) => {
        const res = docSnapshot.data() as LiveSetting;
        setLiveId(res.videoId);
      });
  }, []);

  useEffect(() => {
    if (!liveId) {
      return;
    }

    setIsLoading(true);
    LiveRepository.fetchLiveSnippet(liveId).then(({ data }) => {
      data.liveUrl = `https://www.youtube.com/watch?v=${data.videoId}`;
      setLiveSnippet(data);
      setIsLoading(false);
    });

    const unsubscribe = firestore
      .collection("lives")
      .where("videoId", "==", liveId)
      .orderBy("time", "desc")
      .limit(10)
      .onSnapshot((querySnapshot) => {
        const liveDetails = convertToLiveDetails(querySnapshot);
        setLiveDetails(liveDetails);
      });

    return () => unsubscribe();
  }, [setLiveDetails, liveId]);

  const retryMessage = "配信IDの変更に失敗しました。再度お試しください。";

  const createPersistLiveIdTask = useCallback(
    (liveId: string): TE.TaskEither<WrappedError, void> =>
      TE.tryCatch(
        () =>
          firestore
            .collection("settings")
            .doc("setting")
            .update({ videoId: liveId }),
        (err) => {
          if (err instanceof Error) {
            return {
              raw: err,
              description: retryMessage,
            };
          }
          return {
            raw: null,
            description: retryMessage,
          };
        }
      ),
    []
  );

  const persistLiveId = (liveId: string) => createPersistLiveIdTask(liveId)();

  return {
    isLoading,
    liveId: {
      currentLiveId: liveId,
      setLiveId,
      persistLiveId,
    },
    liveDetails,
    liveSnippet,
  };
};

const convertToLiveDetails = (
  querySnapshot: firebase.firestore.QuerySnapshot
) => {
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
