import React from "react";
import Button from "../../components/Button/Button";
import "./Cart.scss";

const Cart = () => {
  return (
    <section className="cart">
      <div className="cart__wrapper">
        <header className="cart__header">
          <div className="header__title">
            <h1>My Cart</h1>
          </div>
        </header>

        <section className="cart__buy">
          <header className="buy__header">
            <p>Buy List</p>
          </header>
          <div className="buy__body"></div>
        </section>

        <section className="cart__rent"></section>
        <header className="rent__header">
          <p>Rent List</p>
        </header>
        <div className="rent__body"></div>
        <Button name="Checkout" className="button__checkout" />
      </div>
    </section>
  );
};

export default Cart;
