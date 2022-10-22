import React, { useReducer } from "react";

const CartContext = React.createContext({
  cartItems: [],
  totalAmount: 0,
  isCartOpen: false,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  openCart: () => {},
  closeCart: () => {},
});

/////////////////// CONTEXT PROVIDER/////////////////////////

const defaultCartState = {
  items: [],
  totalAmount: 0,
  isCartOpen: false,
};

const cartReducer = (state, action) => {
  let updatedItems = [];
  let totalAmount = 0;

  /// Add to cart ///
  if (action.type === "ADD") {
    totalAmount = state.totalAmount + action.item.price * action.item.quantity;
    const itemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[itemIndex];

    if (existingItem) {
      totalAmount = state.totalAmount + action.item.price;
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }
    return {
      items: updatedItems,
      totalAmount: totalAmount,
      isCartOpen: state.isCartOpen,
    };
  }

  /// Removing Items from cart ///
  if (action.type === "REMOVE") {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[itemIndex];
    totalAmount = state.totalAmount - existingItem.price;

    // if only one item in Cart
    if (+existingItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: totalAmount,
      isCartOpen: state.isCartOpen,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  if (action.type === "OPEN") {
    return {
      items: state.items,
      totalAmount: state.totalAmount,
      isCartOpen: true,
    };
  }
  if (action.type === "CLOSE") {
    return {
      items: state.items,
      totalAmount: state.totalAmount,
      isCartOpen: false,
    };
  }

  return defaultCartState;
};
export const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const openCartHandler = () => {
    dispatchCartAction({ type: "OPEN" });
  };
  const closeCartHandler = () => {
    dispatchCartAction({ type: "CLOSE" });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartState.items,
        totalAmount: cartState.totalAmount,
        isCartOpen: cartState.isCartOpen,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
        clearCart: clearCartHandler,
        openCart: openCartHandler,
        closeCart: closeCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
