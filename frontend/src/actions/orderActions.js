import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_MYORDERS_REQUEST,
    ORDER_MYORDERS_SUCCESS,
    ORDER_MYORDERS_FAIL
} from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = order => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        // Destructuring 2 levels =>
        const {
            userLogin: { userInfo }
        } = getState()

        // We need to send this in the headers, used for authorization.
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders`, order, config)

        // If reqest is succeded:
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            // Sending generic err message, and also the custom one (in the payload).
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getOrderDetails = id => async (dispatch, getState) => {
    // Destructuring 2 levels =>
    const {
        userLogin: { userInfo }
    } = getState()

    // We need to send this in the headers, used for authorization.
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    try {
        // First send to our reducers that we're about to fetch products.
        dispatch({ type: ORDER_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            // Me quemé la cabeza 3 horas con esta solución.
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            // Sending generic err message, and also the custom one (in the payload).
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (
    dispatch,
    getState
) => {
    // Destructuring 2 levels =>
    const {
        userLogin: { userInfo }
    } = getState()

    // We need to send this in the headers, used for authorization.
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    try {
        // First send to our reducers that we're about to fetch products.
        dispatch({ type: ORDER_PAY_REQUEST })
        const { data } = await axios.put(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config
        )

        dispatch({
            // Me quemé la cabeza 3 horas con esta solución.
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            // Sending generic err message, and also the custom one (in the payload).
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const listMyOrders = userId => async (dispatch, getState) => {
    // Destructuring 2 levels =>
    const {
        userLogin: { userInfo }
    } = getState()

    // We need to send this in the headers, used for authorization.
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    try {
        // First send to our reducers that we're about to fetch products.
        dispatch({ type: ORDER_MYORDERS_REQUEST })
        const { data } = await axios.get('/api/orders/myorders', config)

        dispatch({
            // Me quemé la cabeza 3 horas con esta solución.
            type: ORDER_MYORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_MYORDERS_FAIL,
            // Sending generic err message, and also the custom one (in the payload).
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
