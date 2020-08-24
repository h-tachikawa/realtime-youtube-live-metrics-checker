import React from "react";
import { Divider, Header } from "semantic-ui-react";

export const SettingsHeader: React.FC = () => (
    <div>
      <Header as='h3'>
        <Header.Content>
          設定
        </Header.Content>
      </Header>
      <Divider />
    </div>
)