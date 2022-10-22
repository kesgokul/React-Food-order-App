import styles from "./Meals.module.scss";
import Card from "../UI/Card/Card";
import MealItem from "./MealItem";
import { DUMMY_MEALS, URL } from "../../config";
import useAJAX from "../../Hooks/use-AJAX";
import { useEffect, useState } from "react";

const Meals = () => {
  const [meals, setMeals] = useState([]);

  const loadMovies = (data) => {
    let loadedMovies = [];
    for (const meal in data) {
      loadedMovies.push({
        id: meal,
        name: data[meal].name,
        description: data[meal].description,
        price: +data[meal].price,
      });
    }
    setMeals(loadedMovies);
  };

  const { isLoading, error, sendRequest: fetchMeals } = useAJAX();

  useEffect(() => {
    fetchMeals({ url: URL }, loadMovies);
  }, [fetchMeals]);

  return (
    <Card className={styles.mealsCard}>
      <ul className={styles.mealsList}>
        {DUMMY_MEALS.map((meal) => (
          <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ))}
        {isLoading && (
          <p className={styles.statusMessage}>
            Loading available Meals for you
          </p>
        )}
        {error && <p className={styles.statusMessage}>{error}</p>}
      </ul>
    </Card>
  );
};

export default Meals;
