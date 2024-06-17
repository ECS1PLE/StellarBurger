import './App.scss'
import Header from './components/AppHeader/Header/App.Header'
import BuildBurger from './components/AppMain/BuildBurger/App.BuildBurger'
import BurgerConstructor from './components/AppMain/BurgerConstructor/App.BurgerConstructor'
import MakeOrder from './components/AppMain/MakeOrder/App.makeOrder'


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
