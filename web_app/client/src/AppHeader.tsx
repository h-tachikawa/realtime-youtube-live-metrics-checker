import React from "react";
import { useHistory } from "react-router-dom";
import style from "./App.module.scss";
import { Icon, Menu, Popup } from "semantic-ui-react";

export const AppHeader: React.FC = () => {
  const history = useHistory();
  const { pathname } = history.location;

  const popupStyle = {
    borderRadius: 0,
    opacity: 0.7,
  };

  return (
      <header className={style.menuContainer}>
        <Menu fixed="top" pointing secondary size="large" className={style.menuContainer} inverted>
          <Menu.Item header>
            Realtime Youtube Live Metrics Checker
          </Menu.Item>
          <Menu.Item link active={pathname === "/dashboard"} className={style.menuItem} onClick={() => history.push("/dashboard")}>
            <Icon name="home"/>
            ホーム
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
                style={popupStyle}
            />
          </Menu.Menu>
        </Menu>
      </header>
  );
};