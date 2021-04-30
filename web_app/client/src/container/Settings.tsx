import React, { ChangeEvent, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { notifierState } from "../recoil/atom/notifier";
import { useNotifierEffect, useYoutubeLiveData } from "../hooks";
import { Settings as ViewComponent } from "../component/Settings";

export const Settings: React.FC = () => {
  useNotifierEffect();
  const setNotifier = useSetRecoilState(notifierState);
  const history = useHistory();
  const { liveId: { currentLiveId, setLiveId, persistLiveId } } = useYoutubeLiveData();

  const handleSubmit = useCallback(async () => {
    try {
      await persistLiveId(currentLiveId);
      setNotifier({type: "info", text: "配信IDを変更しました！"})
    } catch (e) {
      console.error(e);
      setNotifier({type: "error", text: "配信IDの変更に失敗しました。再度お試しください。"})
    } finally {
      history.push("/dashboard");
    }
  }, [currentLiveId, history, persistLiveId, setNotifier]);

  const handleLiveIdChanges = useCallback((e: ChangeEvent<HTMLInputElement>) => setLiveId(e.target.value), [setLiveId]);

  return (
      <ViewComponent currentLiveId={currentLiveId} onLiveIdChanges={handleLiveIdChanges} onSubmit={handleSubmit} />
  );
}
