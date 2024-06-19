import "./BurgerConstrucor.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BlueTopBread from "/src/images/blueBread.png";
import OrangeSauce from "/src/images/orangeSauce.png";
import undeathMeat from "/src/images/undeathMeat.png";
import falelianPlod from "/src/images/falelianPlod.png";
import mineralRings from "/src/images/mineralRings.png";
import Ingredient from "../Ingredient/ingridient";

const ingredients = [
  {
    text: 'Соус традиционный галактический',
    price: 30,
    thumbnail: OrangeSauce,
    isLocked: false
  },
  {
    text: 'Мясо бессмертных моллюсков Protostomia',
    price:300,
    thumbnail: undeathMeat,
    isLocked: false
  },
  {
    text: 'Плоды Фалленианского дерева',
    price: 80,
    thumbnail: falelianPlod,
    isLocked: false 
  },
  {
    text: 'Хрустящие минеральные кольца',
    price:80,
    thumbnail: mineralRings,
    isLocked: false
  },
  {
    text: 'Хрустящие минеральные кольца',
    price:80,
    thumbnail: mineralRings,
    isLocked: false
  },
]

const BurgerConstructor = () => {
  return (
    <div className="BurgerConstructorBlock">
      <ConstructorElement
        type="top"
        text="Краторная булка N-200i (верх)"
        price={20}
        thumbnail={BlueTopBread}
        isLocked={true}
      />
      <div className="BurgerMainComponens">
          {ingredients.map((item, index)=>(
            <div className="drgagNdropBlock" key={index}>  
              <DragIcon type="primary" />    
              <ConstructorElement {...item}/>
            </div>
          ))}
        </div>
      <ConstructorElement
        type="bottom"
        text="Краторная булка N-200i (низ)"
        price={20}
        thumbnail={BlueTopBread}
        isLocked={true}
      />
    </div>
  );
};

export default BurgerConstructor;
