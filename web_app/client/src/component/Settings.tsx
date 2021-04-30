import React, { ChangeEvent } from "react";
import { Button, Container, Form, Grid, Icon, Popup } from "semantic-ui-react";
import style from "./Settings.module.scss";
import { AppHeader } from "../container";
import { SettingsHeader } from "./SettingsHeader";

interface Props {
  currentLiveId: string;
  onLiveIdChanges: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const Settings: React.FC<Props> = ({ currentLiveId, onLiveIdChanges, onSubmit }) => (
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
                <input defaultValue={currentLiveId} onChange={onLiveIdChanges} data-testid="live-id"/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button type="submit" primary onClick={onSubmit}>保存</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Field>
      </Form>
    </Container>
);
