import React from "react";
import { useHistory } from "react-router-dom";
import { AppHeader as ViewComponent } from "../component/AppHeader";

export const AppHeader: React.FC = () => {
  const history = useHistory();
  const { pathname: currentPath } = history.location;

  return (
    <ViewComponent
        dashboard={{ onClick: () => history.push("/dashboard") }}
        settings={{ onClick: () => history.push("/settings") }}
        currentPath={currentPath}
    />
  );
};
