import { createSlice } from "@reduxjs/toolkit";

const storedItems = JSON.parse(localStorage.getItem("cart"))


const initialState = {
    cart: null,
    cartItems: storedItems || [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        itemDetails(state, action) {
            state.cart = action.payload;
        },
        addToCart: (state, action) => {
            let existingItem = state.cartItems.find((item) => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity = action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            };
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        decreaseItemQuantity(state, action) {
            state.cartItems = state.cartItems.map((item) => {
                if (item._id === action.payload) {
                    const newQuantity = item.quantity > 0 ? item.quantity - 1 : 0;
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        },
        increaseItemQuantity(state, action) {
            state.cartItems = state.cartItems.map((item) => {
                if (item._id === action.payload) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        },
        removeItem(state, action) {
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload
            );

            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        getCartTotal(state) {
            let { totalQuantity, totalPrice } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem;
                    const itemTotal = price * quantity;
                    cartTotal.totalPrice += itemTotal;
                    cartTotal.totalQuantity += quantity;
                    return cartTotal;
                },
                {
                    totalPrice: 0,
                    totalQuantity: 0
                }
            );
            state.totalPrice = totalPrice;
            state.totalQuantity = totalQuantity;
        }
    },
});

export const { itemDetails, reviewData, singleItem, addToCart, decreaseItemQuantity, increaseItemQuantity, removeItem, getCartTotal } = cartSlice.actions;
export default cartSlice.reducer;
