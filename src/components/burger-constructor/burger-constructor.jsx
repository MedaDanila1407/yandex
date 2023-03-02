import React, { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  addItem,
  addBun,
  updateConstructor,
} from "../../services/actions/constructor";
import { createOrder } from "../../services/actions/order";

import ConstructorItem from "../constructor-item/constructor-item";
import Loader from "../loader/loader";

import styles from "./burger-constructor.module.css";
import itemStyles from "../constructor-item/constructor-item.module.css";

const BurgerConstructor = () => {
  const data = useSelector((store) => store.constructorData.constructorItems);
  const isLoading = useSelector((store) => store.orderData.createOrderRequest);
  const dispatch = useDispatch();

  const openOrderModal = (e) => {
    e.preventDefault();
    const dataIds = [];
    let itemBun = undefined;
    for (let i = 0; i < data.length; i++) {
      if (data[i].type == "bun") {
        itemBun = data[i]._id;
      } else {
        dataIds.push(data[i]._id);
      }
    }
    if (itemBun != undefined) {
      dataIds.unshift(itemBun);
      dataIds.push(itemBun);
    }
    dispatch(createOrder(dataIds));
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: "ingredient",
    drop(newItem) {
      newItem.type === "bun"
        ? dispatch(addBun(newItem))
        : dispatch(addItem(newItem));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const moveItemHandler = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = data[dragIndex];
      const newData = update(data, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      });
      dispatch(updateConstructor(newData));
    },
    [data, dispatch]
  );

  const getPrice = useMemo(() => {
    return Array.from(data).reduce((acc, i) => {
      return i.type === "bun" ? acc + i.price * 2 : acc + i.price;
    }, 0);
  }, [data]);

  return (
    <section
      className={`${styles.wrapper} ${
        isOver && styles.wrapper_isOver
      } mt-20 pl-4`}
      ref={dropRef}
    >
      {data.map((item) => {
        return (
          item.type === "bun" && (
            <div className={itemStyles.wrapper} key={item._id}>
              <ConstructorElement
                isLocked={true}
                thumbnail={item.image}
                price={item.price}
                type="top"
                text={`${item.name} (верх)`}
              />
            </div>
          )
        );
      })}
      <ul className={`${styles.list} list-default my-scroll pr-2`}>
        {data.map(
          (item, i) =>
            item.type !== "bun" && (
              <li key={item.constructorId}>
                <ConstructorItem
                  data={item}
                  id={item._id}
                  index={i}
                  moveItemHandler={moveItemHandler}
                />
              </li>
            )
        )}
      </ul>
      {data.map((item) => {
        return (
          item.type === "bun" && (
            <div className={itemStyles.wrapper} key={item._id}>
              <ConstructorElement
                isLocked={true}
                thumbnail={item.image}
                price={item.price}
                type="bottom"
                text={`${item.name} (низ)`}
              />
            </div>
          )
        );
      })}
      {data.map(
        (item) =>
          item.type == "bun" && (
            <div className={`${styles.checkout} mt-6`}>
              <p className="text text_type_digits-medium mr-2">{getPrice}</p>
              <CurrencyIcon type="primary" />
              <Button
                htmlType="button"
                type="primary"
                size="large"
                extraClass={`${styles.button} ml-10 mr-4`}
                onClick={openOrderModal}
              >
                {isLoading ? <Loader /> : "Оформить заказ"}
              </Button>
            </div>
          )
      )}
    </section>
  );
};

export default BurgerConstructor;
