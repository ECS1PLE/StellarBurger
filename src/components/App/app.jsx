import styles from './app.module.scss'
import Header from '../AppHeader/Header/header'
import BuildBurger from '../AppMain/BuildBurger/BuildBurger'
import BurgerConstructor from '../AppMain/BurgerConstructor/BurgerConstructor'
import MakeOrder from '../AppMain/MakeOrder/MakeOrder'


function App() {
  return (
    <>
      <Header />
      <div className='main__content'>
        <BuildBurger />
        <div className='rightContent mt-25'>
          <BurgerConstructor />
          <MakeOrder />
        </div>
      </div>
    </>
  )
}

export default App
