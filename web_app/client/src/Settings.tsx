import React from "react";
import { Container, Divider, Header, Form, Button, Popup, Icon, Grid } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { firestore } from "./external/firebase";
import { AppHeader } from "./AppHeader";
import style from "./Settings.module.scss";
import { notifierState } from "./recoil/atom/notifier";
import { useYoutubeLiveData } from "./hooks";

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
  const setNotifier = useSetRecoilState(notifierState);
  const history = useHistory();
  const { liveId: { currentLiveId, setLiveId } } = useYoutubeLiveData();

  const handleSubmit = async () => {
    try {
      await firestore.collection("settings").doc("setting").update({ videoId: currentLiveId});
      setNotifier({type: "info", text: "配信IDを変更しました！"})
    } catch (e) {
      console.error(e);
      setNotifier({type: "error", text: "配信IDの変更に失敗しました。再度お試しください。"})
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
          <Grid columns={2} verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width="3">
                <label className={style.helpTipLabel}>配信ID</label>
                <Popup
                    trigger={<Icon name="help circle" color="grey" />}
                    content="Youtube Live配信URLの、v=の後の文字列を入力してください。"
                    size="mini"
                    inverted
                    className={style.popup}
                />
              </Grid.Column>
              <Grid.Column width="4">
                <input defaultValue={currentLiveId} onChange={(e) => setLiveId(e.target.value)} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button type="submit" primary onClick={handleSubmit}>保存</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Field>
      </Form>
    </Container>
  );
}

export default Settings;
