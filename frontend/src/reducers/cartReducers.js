import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'

export const cartReducer = (
    state = { cartItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            // If the item exist in the store, save it in this variable.
            const existItem = state.cartItems.find(
                x => x.product === item.product
            )
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item] // Adding to cart
                }
            }
        // Filter returns the elements that meet the condition.
        // Strip out whatever the ID that we remove is.
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    x => x.product !== action.payload
                )
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                // The data we're passing from the form.
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                // The data we're passing from the form.
                paymentMethod: action.payload
            }
        default:
            return state
    }
}
