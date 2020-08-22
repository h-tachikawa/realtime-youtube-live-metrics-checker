import React from "react";
import { useHistory } from "react-router-dom";
import { Icon, Menu, Popup } from "semantic-ui-react";
import style from "./App.module.scss";
import myStyle from "./AppHeader.module.scss";

export const AppHeader: React.FC = () => {
  const history = useHistory();
  const { pathname } = history.location;

  return (
      <header className={style.menuContainer}>
        <Menu fixed="top" pointing secondary size="large" className={style.menuContainer} inverted>
          <Menu.Item link header onClick={() => history.push("/dashboard")}>
            Realtime Youtube Live Metrics Checker
          </Menu.Item>
          <Menu.Item link active={pathname === "/dashboard"} className={style.menuItem} onClick={() => history.push("/dashboard")}>
            <Icon name="dashboard"/>
            ダッシュボード
          </Menu.Item>
          <Menu.Item link active={pathname === "/settings"} className={style.menuItem} onClick={() => history.push("/settings")}>
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