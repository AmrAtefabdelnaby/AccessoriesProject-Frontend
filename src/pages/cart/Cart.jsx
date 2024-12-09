import React, { useEffect, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { CartContext } from "../../Context/cartContext/CartContext";
import { useMutation } from "@tanstack/react-query";
import axiosConfig from "../../axios/axiosConfig/AxiosConfig";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const { cart, setCart, removeFromCart, updateQuantity } = useContext(CartContext);
  const userName = sessionStorage.getItem("username");

  const submitOrder = useMutation({
    mutationFn: async ({ cartItems, userName }) => {
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const formattedCartItems = cartItems.map((item) => ({
        quantity: item.quantity,
        price: item.price,
        product: item.productName,
        productId: item.productId,
      }));

      return axiosConfig.post("/api/carts?populate=*", {
        data: {
          cart_items: formattedCartItems,
          userName: userName,
          totalPrice: totalPrice,
          orderStatus: "active",
        },
      });
    },
    onSuccess: () => {
      alert("Your order has been successfully submitted!");
      setCart([]); // Clear the cart on success
    },
    onError: (error) => {
      console.error(
        "Error submitting order:",
        error.response?.data || error.message
      );
    },
  });

  const handleSubmitOrder = () => {
    if (cart.length > 0) {
      const formattedCartItems = cart.map((item) => ({
        productName: item.title, // Assuming title is the product name
        quantity: item.quantity,
        price: item.price,
      }));

      submitOrder.mutate({
        cartItems: formattedCartItems,
        userName,
      });
    } else {
      alert("Your cart is empty.");
    }
  };

  return (
    <div className="cart px py">
      <h1 className="cart-title">Cart</h1>
      <div className="cart-items-sections">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-image-container">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-text-container">
                <div className="title">{item.title}</div>
                <div className="description">{item.description}</div>
                <div className="price">{item.price} EGP</div>
                <div className="btn-section">
                  <button
                    className="remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <MdDelete />
                  </button>
                  <div className="quantity">
                    <button onClick={() => updateQuantity(item.id, false)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, true)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      {cart.length > 0 && (
        <h2 className="total">
          Total:{" "}
          {cart.reduce((total, item) => total + item.price * item.quantity, 0)}{" "}
          EGP
        </h2>
      )}
      {cart.length > 0 && (
        <div className="check-out">
          <button
            className="checkout-btn"
            onClick={handleSubmitOrder}
            disabled={submitOrder.isLoading}
          >
            {submitOrder.isLoading ? "Processing..." : "Checkout"}
          </button>
        </div>
      )}
    </div>
  );
}
