import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { removeAllItem } from "../../Redux/reducer/cartSlice";
import { formatMoney } from "../../utils/utils";
import "./Checkout.scss";

const todayDate = new Date().getTime();

const Checkout = () => {
  const auth = useSelector((state) => state.user.isAuthenticated) || false;
  const [orderDetail, setOrderDetail] = useState({
    id_transaction: todayDate.toString(),
    date: new Date(todayDate).toUTCString(),
    price: 0,
    time_limit: new Date(todayDate + 86400000).toUTCString(),
  });

  const dispatch = useDispatch();

  const { state } = useLocation();

  function handlePayment() {
    dispatch(removeAllItem());
    navigate("/", { replace: true });
  }

  useEffect(() => {
    if (state) {
      setOrderDetail({ ...orderDetail, price: state.price });
    }
  }, [state]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login", { state: { msg: "Login to make transactions" } });
    }
  }, []);

  return (
    <div className="checkout">
      <div className="checkout__wrapper">
        <header className="checkout__header">
          <p>Order Details</p>
        </header>
        <section className="checkout__body">
          <div className="checkout__info">
            <p>Transaction ID</p>
            <p>{orderDetail.id_transaction}</p>
          </div>
          <div className="checkout__info">
            <p>Transaction Date</p>
            <p>{orderDetail.date}</p>
          </div>
          <div className="checkout__info">
            <p>Virtual Account Number</p>
            <p>192038748</p>
          </div>
          <div className="checkout__info">
            <p>Status</p>
            <p>Pending</p>
          </div>
          <div className="checkout__info">
            <p>Total</p>
            <p>{formatMoney(orderDetail.price)}</p>
          </div>
          <div className="checkout__info">
            <p>Batas Waktu</p>
            <p>{orderDetail.time_limit}</p>
          </div>
          <div className="checkout__button">
            <Button
              name="Done"
              onClick={handlePayment}
              className="button__signin"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
