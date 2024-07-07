import styles from "./App.module.scss";
import Header from "../AppHeader/Header/Header";
import BurgerIngredients from "../AppMain/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../AppMain/BurgerConstructor/BurgerConstructor";
import MakeOrder from "../AppMain/MakeOrder/MakeOrder";

const App = () => {
  return (
    <>
      <Header />
      <main className={styles.main__content}>
        <BurgerIngredients />
        <div className="rightContent mt-25">
          <BurgerConstructor />
          <MakeOrder />
        </div>
      </main>
    </>
  );
};

export default App;
