import { useState } from "react";

import Backdrop from "../UI/Modals/Backdrop";
import MenuContent from "./MenuContent";
import "./menu.scss";

const Menu = () => {
  const [menuIsToggled, setMenuIsToggled] = useState(false);

  const toggleHandler = () => {
    setMenuIsToggled((initialState) => !initialState);
  };

  return (
    <div className="menu">
      <div className="menu__title" onClick={toggleHandler}>
        Forecast
      </div>
      {menuIsToggled && <MenuContent onClick={toggleHandler} />}
      {menuIsToggled && <Backdrop onClick={toggleHandler} />}
    </div>
  );
};

export default Menu;
