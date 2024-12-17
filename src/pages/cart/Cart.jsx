import React, { useEffect, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { CartContext } from "../../Context/cartContext/CartContext";
import { useMutation } from "@tanstack/react-query";
import axiosConfig from "../../axios/axiosConfig/AxiosConfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const { cart, setCart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Get username from session storage
  const userName = sessionStorage.getItem("username");

  // Submit order mutation
  const submitOrder = useMutation({
    mutationFn: async ({ cartItems }) => {
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const formattedCartItems = cartItems.map((item) => ({
        quantity: item.quantity,
        price: item.price,
        product: item.title,
        productId: item.id,
      }));

      // Send the request with the JWT token
      return axiosConfig.post(
        "/api/carts",
        {
          data: {
            cart_items: formattedCartItems,
            userName: userName, // Add userName if needed in data
            totalPrice: totalPrice,
            orderStatus: "active",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Order submitted successfully", {
        style: {
          border: "1px solid #A88E5A",
          padding: "16px",
          color: "#A88E5A",
        },
        iconTheme: {
          primary: "#A88E5A",
          secondary: "#FFFAEE",
        },
      });
      setCart([]); // Clear the cart on success
    },
    onError: (error) => {
      console.error(
        "Error submitting order:",
        error.response?.data || error.message
      );
      toast.error("Order failed. Please try again", {
        style: {
          border: "1px solid #A88E5A",
          padding: "16px",
          color: "#A88E5A",
        },
        iconTheme: {
          primary: "#A88E5A",
          secondary: "#FFFAEE",
        },
      });
    },
  });

  // Handle order submission
  const handleSubmitOrder = () => {
    if (cart.length > 0) {
      const formattedCartItems = cart.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        id: item.id,
      }));

      submitOrder.mutate({ cartItems: formattedCartItems });
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
