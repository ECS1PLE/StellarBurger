import styles from "./App.module.scss";
import Header from "../AppHeader/Header/Header";
import BurgerIngredients from "../AppMain/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../AppMain/BurgerConstructor/BurgerConstructor";
import MakeOrder from "../AppMain/MakeOrder/MakeOrder";
import store from "../../services/reducers/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <main className={styles.main__content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <div className="rightContent mt-25">
              <BurgerConstructor />
              <MakeOrder />
            </div>
          </DndProvider>
        </main>
      </Provider>
    </>
  );
};

export default App;
