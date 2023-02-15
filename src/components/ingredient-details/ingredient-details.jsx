import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";

export default function IngredientDetails(item) {
  const itemData = item.item;
  console.log(itemData);
  return (
    <section key={itemData._id}>
      <div className="modal-content grid px-8 pt-8">
        <div className="flex flex-col justify-center">
          <img src={itemData.image_large} alt={itemData.name} />
          <div className="flex justify-center">
            <p className={styles.modalIngrTitle}>{itemData.name}</p>
          </div>
          <div className="flex justify-around pt-6">
            <div className="flex flex-col items-center">
              <p className={styles.modalIngrElems}>Каллории, ккал.</p>
              <span className={styles.modalIngrWeight}>
                {itemData.calories}{" "}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <p className={styles.modalIngrElems}>Белки, г.</p>
              <span className={styles.modalIngrWeight}>
                {itemData.proteins}{" "}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <p className={styles.modalIngrElems}>Жиры, г.</p>
              <span className={styles.modalIngrWeight}>{itemData.fat} </span>
            </div>
            <div className="flex flex-col items-center">
              <p className={styles.modalIngrElems}>Углеводы, г.</p>
              <span className={styles.modalIngrWeight}>
                {itemData.carbohydrates}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
IngredientDetails.propTypes = {
  itemData: PropTypes.arrayOf(
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
    }).isRequired
  ),
};
