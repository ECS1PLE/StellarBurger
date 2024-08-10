import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/AppMain/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/AppMain/BurgerConstructor/BurgerConstructor";
import MakeOrder from "../../components/AppMain/MakeOrder/MakeOrder";
import { Outlet } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <div className="rightContent mt-25">
          <BurgerConstructor />
          <MakeOrder />
        </div>
      </DndProvider>
      <Outlet />
    </>
  );
};

export default Main;
