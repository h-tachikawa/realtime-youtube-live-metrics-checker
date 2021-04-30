import React, { ChangeEvent, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { notifierState } from "../recoil/atom/notifier";
import { useYoutubeLiveData } from "../hooks";
import { Settings as ViewComponent } from "../component/Settings";
import { pipe } from "fp-ts/lib/function";

type WrappedError = {
  raw: Error;
  description: string;
};

export const Settings: React.FC = () => {
  const setNotifier = useSetRecoilState(notifierState);
  const history = useHistory();
  const {
    liveId: { currentLiveId, setLiveId, persistLiveId },
  } = useYoutubeLiveData();

  const retryMessage = "配信IDの変更に失敗しました。再度お試しください。";

  const persistLiveIdTask = (
    liveId: string
  ): TE.TaskEither<WrappedError, void> =>
    TE.tryCatch(
      () => persistLiveId(liveId),
      (err) => {
        if (err instanceof Error) {
          return {
            raw: err,
            description: retryMessage,
          };
        }
        return {
          raw: new Error(),
          description: retryMessage,
        };
      }
    );

  const handleSubmit = useCallback(async () => {
    const result = await persistLiveIdTask(currentLiveId)();

    pipe(
      result,
      E.match(
        (err) => {
          console.error(err.raw);
          setNotifier({
            type: "error",
            text: err.description,
          });
        },
        () => {
          setNotifier({ type: "info", text: "配信IDを変更しました！" });
        }
      ),
      () => history.push("/dashboard")
    );
  }, [currentLiveId, history, persistLiveId, setNotifier]);

  const handleLiveIdChanges = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setLiveId(e.target.value),
    [setLiveId]
  );

  return (
    <ViewComponent
      currentLiveId={currentLiveId}
      onLiveIdChanges={handleLiveIdChanges}
      onSubmit={handleSubmit}
    />
  );
};
