import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor({ data }) {
  const [modalActive, setModalActive] = useState(false);
  const bun = data[0];
  const ingredients = data.filter((item) => item.type !== "bun");
  const summTotal = ingredients.reduce(
    (sum, ingredient) => sum + ingredient.price,
    bun.price * 2
  );
  return (
    <section className="burger-constructor pt-24">
      <section className="flex flex-col items-center ">
        <section className="flex items-center py-2 pr-3" key={bun._id}>
          <div className="pr-2.5 opacity-0">
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={bun.price}
            thumbnail={bun.image}
          />
        </section>
        <section className={styles.burgerConstructorItems}>
          {ingredients.map((item) => (
            <section className="flex items-center py-2 pr-3" key={item._id}>
              <div className="pr-2.5">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                type={undefined}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </section>
          ))}
        </section>
        <section className="flex items-center py-2 pr-3" key={bun.length}>
          <div className="pr-2.5 opacity-0">
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </section>
      </section>
      <div className="burger-constructor_total flex justify-end items-center pt-10 pr-12 gap-2">
        <p className={styles.burgerConstructorPrice}>{summTotal}</p>
        <span className="pr-8">
          <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          size="medium"
          onClick={() => setModalActive(true)}
        >
          <p className="text-base">Оформить заказ</p>
        </Button>
      </div>
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ),
};

export default BurgerConstructor;
