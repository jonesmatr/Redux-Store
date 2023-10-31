import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateProducts: (state, action) => {
            state.products = action.payload;
        },
        addToCart: (state, action) => {
            state.cartOpen = true;
            state.cart.push(action.payload);
        },
        addMultipleToCart: (state, action) => {
            state.cart = state.cart.concat(action.payload);
        },
        updateCartQuantity: (state, action) => {
            state.cartOpen = true;
            const product = state.cart.find(p => p._id === action.payload._id);
            if (product) {
                product.purchaseQuantity = action.payload.purchaseQuantity;
            }
        },
        removeFromCart: (state, action) => {
            const newState = state.cart.filter(product => product._id !== action.payload);
            state.cartOpen = newState.length > 0;
            state.cart = newState;
        },
        clearCart: (state) => {
            state.cartOpen = false;
            state.cart = [];
        },
        toggleCart: (state) => {
            state.cartOpen = !state.cartOpen;
        },
        updateCategories: (state, action) => {
            state.categories = action.payload;
        },
        updateCurrentCategory: (state, action) => {
            state.currentCategory = action.payload;
        }
    }
});

export const { actions } = appSlice;
export default appSlice.reducer;
