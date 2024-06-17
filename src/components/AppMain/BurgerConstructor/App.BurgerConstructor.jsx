import "./App.BurgerConstrucor.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BlueTopBread from "/src/images/blueBread.png";
import OrangeSauce from "/src/images/orangeSauce.png";
import undeathMeat from "/src/images/undeathMeat.png";
import falelianPlod from "/src/images/falelianPlod.png";
import mineralRings from "/src/images/mineralRings.png";

const BurgerConstructor = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "585px",
      }}
    >
      <ConstructorElement
        type="top"
        text="Краторная булка N-200i (верх)"
        price={20}
        thumbnail={BlueTopBread}
        isLocked={true}
      />
      <div className="BurgerMainComponens">
        <div
          style={{ display: "flex", gap: "8px" }}
          className="drgagNdropBlock"
        >
          <DragIcon type="primary" style={{ marginTop: "auto" }} />
          <ConstructorElement
            text="Соус традиционный галактический"
            price={30}
            thumbnail={OrangeSauce}
            isLocked={false}
          />
        </div>
        <div
          style={{ display: "flex", gap: "8px" }}
          className="drgagNdropBlock"
        >
          <DragIcon type="primary" style={{ marginTop: "auto" }} />
          <ConstructorElement
            text="Мясо бессмертных моллюсков Protostomia"
            price={300}
            thumbnail={undeathMeat}
            isLocked={false}
          />
        </div>
        <div
          style={{ display: "flex", gap: "8px" }}
          className="drgagNdropBlock"
        >
          <DragIcon type="primary" style={{ marginTop: "auto" }} />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={80}
            thumbnail={falelianPlod}
            isLocked={false}
          />
        </div>
        <div
          style={{ display: "flex", gap: "8px" }}
          className="drgagNdropBlock"
        >
          <DragIcon type="primary" style={{ marginTop: "auto" }} />
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={80}
            thumbnail={mineralRings}
            isLocked={false}
          />
        </div>
        <div
          style={{ display: "flex", gap: "8px" }}
          className="drgagNdropBlock"
        >
          <DragIcon type="primary" style={{ marginTop: "auto" }} />
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={80}
            thumbnail={mineralRings}
            isLocked={false}
          />
        </div>
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
