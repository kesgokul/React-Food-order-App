import styles from "./MainHeader.module.scss";
import HeaderCart from "./HeaderCart";

const MainHeader = (props) => {
  return (
    <header className={styles.mainHeader}>
      <p className={styles.headerTitle}>ReactMeals</p>
      <HeaderCart />
    </header>
  );
};

export default MainHeader;
