import { v4 as uuidv4 } from "uuid";

export const RecipeDetails = ({ ingredients }) => {
  return ingredients.map(({ text, weight }) => {
    return (
      <ul className="ingredient-list" key={uuidv4()}>
        <li className="ingredient-text">{text}</li>
        <li className="ingredient-weight">Weight - {weight.toFixed(2)}</li>
      </ul>
    );
  });
};
