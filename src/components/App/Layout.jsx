import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ingridientsThunk } from "../../services/actions/IngridientsThunk";
import { Outlet } from "react-router";

function Layout() {
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const dispatcher = useDispatch();

  useEffect(() => {
    if (!ingredients?.length) {
      dispatcher(ingridientsThunk());
    }
  }, [ingredients, dispatcher]);

  return <Outlet />;
}

export default Layout;
