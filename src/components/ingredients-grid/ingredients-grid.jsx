import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ingredients-grid.module.css';
import Ingredient from '../ingredient/ingredient';

const IngredientsGrid = ({ type }) => {
  const ingredients = useSelector(store => store.ingredientsData.ingredients);
  return (
    <div className={`${styles.grid} pt-6 pr-3 pb-10 pl-3`}>
      {Array.from(ingredients)
        .filter(elem => elem.type === type)
        .map(item => (
          <Ingredient data={item} key={item._id} />
        ))}
    </div>
  );
};

IngredientsGrid.propTypes = {
  type: PropTypes.string.isRequired
};

export default IngredientsGrid;
