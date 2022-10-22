import styles from "./Hero.module.scss";
import heroImage from "../../img/meals.jpeg";
import Card from "../UI/Card/Card";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <img className={styles.heroImg} src={heroImage} alt="Different meals" />
      <Card className={styles.heroCard}>
        <h1 className={styles.heroCard__title}>
          Delicious food, Delivered to you
        </h1>
        <p className={styles.heroCard__desc}>
          Choose your favourite meal from our broad selection of available meals
          and enjoy your lunch or dinner at home.
        </p>
        <p className={styles.heroCard__desc}>
          All our meals are cooked with high-quality ingredients, just-in-time
          and of course, by experienced chefs.
        </p>
      </Card>
    </div>
  );
};

export default Hero;
