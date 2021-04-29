import React from "react";
import { Icon, Menu, Popup } from "semantic-ui-react";
import style from "./App.module.scss";
import myStyle from "./AppHeader.module.scss";

interface Props {
  dashboard: {
    onClick: () => void;
  };
  settings: {
    onClick: () => void;
  }
  currentPath: string;
}

export const AppHeader: React.FC<Props> = ({dashboard, settings, currentPath}) => {
  return (
      <header className={style.menuContainer}>
        <Menu fixed="top" pointing secondary size="large" className={style.menuContainer} inverted>
          <Menu.Item link header onClick={dashboard.onClick} data-testid="title">
            Realtime Youtube Live Metrics Checker
          </Menu.Item>
          <Menu.Item
              link
              active={currentPath === "/dashboard" || currentPath === "/"}
              className={style.menuItem}
              onClick={dashboard.onClick}
              data-testid="dashboard"
          >
            <Icon name="dashboard"/>
            ダッシュボード
          </Menu.Item>
          <Menu.Item
              link
              active={currentPath === "/settings"}
              className={style.menuItem}
              onClick={settings.onClick}
              data-testid="settings"
          >
            <Icon name="setting"/>
            設定
          </Menu.Item>
          <Menu.Menu position="right">
            <Popup
                content="アプリケーションからログアウトします。"
                trigger={
                  <Menu.Item link className={style.menuItem}>
                    <Icon name="log out"/>
                  </Menu.Item>
                }
                position="bottom right"
                inverted
                className={myStyle.popup}
            />
          </Menu.Menu>
        </Menu>
      </header>
  );
};
