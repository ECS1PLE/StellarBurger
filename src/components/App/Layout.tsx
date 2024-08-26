import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks"; // Используем типизированные хуки
import { ingridientsThunk } from "../../services/actions/IngridientsThunk";
import { Outlet } from "react-router";

const Layout: React.FC = () => {
  const ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const dispatcher = useAppDispatch();

  useEffect(() => {
    if (!ingredients?.length) {
      dispatcher(ingridientsThunk());
    }
  }, [ingredients, dispatcher]);

  return <Outlet />;
};

export default Layout;
