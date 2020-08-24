import React from "react";
import { Divider, Header } from "semantic-ui-react";

export const DashboardHeader: React.FC = () => (
    <div>
      <Header as='h3'>
        <Header.Content>
          ダッシュボード
        </Header.Content>
      </Header>
      <Divider />
    </div>
)