import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { Icon } from "@iconify/react";
import { formatMoney } from "../../utils/utils";
import "./Cart.scss";
import { removeItemFromCart } from "../../Redux/reducer/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState("");
  const myCart = useSelector((state) => state.cart) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (myCart) {
      const price = myCart
        .map((item) => item.price)
        .reduce((acc, curValue) => acc + curValue, 0);
      setTotalPrice(price);
    }
  }, [myCart]);

  function handleCheckout() {
    if (myCart.length === 0) return setStatus("Cart Empty");
    navigate("/checkout", { state: { price: totalPrice } });
  }

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
          <div className="buy__body">
            {myCart &&
              myCart.map((item) => {
                if (item.type == "Buy")
                  return (
                    <div key={item.id}>
                      <figure className="photo__container">
                        <img
                          src={
                            item.data.Poster === "N/A"
                              ? NoPoster
                              : item.data.Poster
                          }
                          alt=""
                          className="photo"
                        />
                        <div className="description">
                          <p className="title">{item.data.Title}</p>
                          <p className="year">({item.data.Year})</p>
                          <p className="imdb">IMDB: {item.data.imdbID}</p>
                        </div>
                      </figure>
                      <div
                        className="button__trash"
                        onClick={() =>
                          dispatch(removeItemFromCart({ id: item.id }))
                        }
                      >
                        <Icon icon="akar-icons:trash-can" />
                      </div>
                    </div>
                  );
                else return;
              })}
          </div>
        </section>

        <section className="cart__rent">
          <header className="rent__header">
            <p>Rent List</p>
          </header>
          <div className="rent__body">
            {myCart &&
              myCart.map((item) => {
                if (item.type == "Rent")
                  return (
                    <div key={item.id}>
                      <figure className="photo__container">
                        <img
                          src={
                            item.data.Poster === "N/A"
                              ? NoPoster
                              : item.data.Poster
                          }
                          alt=""
                          className="photo"
                        />
                        <div className="description">
                          <p className="title">{item.data.Title}</p>
                          <p className="year">({item.data.Year})</p>
                          <p className="imdb">IMDB: {item.data.imdbID}</p>
                        </div>
                      </figure>
                      <div
                        className="button__trash"
                        onClick={() =>
                          dispatch(removeItemFromCart({ id: item.id }))
                        }
                      >
                        <Icon icon="akar-icons:trash-can" />
                      </div>
                    </div>
                  );
                else return;
              })}
          </div>
        </section>
        <div className="cart__price">
          <p>Subtotal : {formatMoney(totalPrice)}</p>
        </div>
        <div>
          <Button
            name="Checkout"
            className="button__checkout"
            onClick={handleCheckout}
          />
          {status && <p className="status__text">{status}</p>}
        </div>
      </div>
    </section>
  );
};

export default Cart;
