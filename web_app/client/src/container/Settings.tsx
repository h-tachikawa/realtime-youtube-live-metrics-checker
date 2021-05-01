import React, { ChangeEvent, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import * as E from "fp-ts/lib/Either";
import { notifierState } from "../recoil/atom/notifier";
import { useYoutubeLiveData } from "../hooks";
import { Settings as ViewComponent } from "../component/Settings";
import { pipe } from "fp-ts/lib/function";

export const Settings: React.FC = () => {
  const setNotifier = useSetRecoilState(notifierState);
  const history = useHistory();
  const {
    liveId: { currentLiveId, setLiveId, persistLiveId },
  } = useYoutubeLiveData();

  const handleSubmit = useCallback(async () => {
    const result = await persistLiveId(currentLiveId);
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
