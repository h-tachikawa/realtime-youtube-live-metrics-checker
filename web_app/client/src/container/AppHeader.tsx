import React from "react";
import { useHistory } from "react-router-dom";
import { AppHeader as ViewComponent } from "../component/AppHeader";

export const AppHeader: React.FC = () => {
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <ViewComponent history={history} pathname={pathname} />
  );
};