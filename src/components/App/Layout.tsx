import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store"; // предполагается, что у вас есть RootState для вашего Redux store
import { ingridientsThunk } from "../../services/actions/IngridientsThunk";
import { Outlet } from "react-router";

const Layout: React.FC = () => {
  const ingredients = useSelector(
    (state: RootState) => state.burgerIngredients.ingredients
  );
  const dispatcher = useDispatch();

  useEffect(() => {
    if (!ingredients?.length) {
      dispatcher(ingridientsThunk());
    }
  }, [ingredients, dispatcher]);

  return <Outlet />;
};

export default Layout;
