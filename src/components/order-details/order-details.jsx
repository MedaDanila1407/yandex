import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import doneImg from '../../images/done.png';

const OrderDetails = ({ orderNumber }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_digits-large mb-8">{orderNumber}</h2>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={doneImg} alt="готово" className="mt-15 mb-15" />
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired
};

export default OrderDetails;
