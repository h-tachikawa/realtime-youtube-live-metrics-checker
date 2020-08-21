import React, { useEffect, useState } from "react";
import { Container, Divider, Header, Form, Button } from "semantic-ui-react";
import style from "./App.module.scss";
import { AppHeader } from "./AppHeader";
import { firestore } from "./external/firebase";
import { LiveSetting } from "./type";
import { useHistory } from "react-router-dom";
import { useGlobalState } from "./state";

const SettingsHeader: React.FC = () => (
    <div>
      <Header as='h3'>
        <Header.Content>
          設定
        </Header.Content>
      </Header>
      <Divider />
    </div>
)

const Settings: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setNotifier] = useGlobalState("notifier");
  const [ liveId, setLiveId ] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    firestore.collection("settings").doc("setting").get().then((docSnapshot) => {
      const res = docSnapshot.data() as LiveSetting;
      setLiveId((res.videoId));
    });
  }, []);

  const handleSubmit = async () => {
    try {
      await firestore.collection("settings").doc("setting").update({ videoId: liveId});
      setNotifier({type: "info", text: "配信IDを変更しました！"})
    } catch (e) {
      console.error(e);
      setNotifier({type: "error", text: "配信IDの変更に失敗しました"})
    } finally {
      history.push("/dashboard");
    }
  }

  return (
    <Container className={style.container}>
      <AppHeader />
      <SettingsHeader />
      <Form>
        <Form.Field inline>
          <label>配信ID</label>
          <input defaultValue={liveId} onChange={(e) => setLiveId(e.target.value)} />
        </Form.Field>
        <Button type="submit" primary onClick={handleSubmit}>保存</Button>
      </Form>
    </Container>
  );
}

export default Settings;
