import "./App.Ingredient.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Ingredient = (props) => {
  return (
    <div className="Ingredient pr-4 rl-4">
      <img src={props.image} />
      <div className="cost">
        <p>{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p>{props.name}</p>
    </div>
  );
};

Ingredient.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Ingredient;
