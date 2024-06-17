import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import './App.Header.scss'
import MenuItem from '../MenuItem/App.MenuItem'

const Header = () =>{
    return(
        <header className='p-4 header'>
            <div className='leftMenu'>
                <div className='MenuItemContent p-5'>
                    <BurgerIcon type="primary" />
                    <MenuItem text="Конструктор" />
                </div>
                <div className='MenuItemContent p-5 not-active'>
                    <ListIcon type="primary "/>
                        <MenuItem text="Лента заказов" />
                </div>
            </div>
            <div className='header-logo'>
                <Logo />
            </div>
            <div className='rightMenu'>
                <div className='MenuItemContent p-5 not-active'>
                    <ProfileIcon type="primary "/>
                    <MenuItem text="Личный кабинет" />
                </div>
            </div>
        </header>
    )
}

export default Header;