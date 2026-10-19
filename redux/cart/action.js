import { ADD_TO_CART, REMOVE_FROM_CART, SET_CART } from "./type"

const saveCart = (items) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(items))
    }
}

export const addToCart = (product) => {
    return (dispatch, getState) => {
        const items = getState().cartReducer.items

        // جلوگیری از اضافه شدن محصول تکراری
        const exists = items.find((item) => item.id === product.id)
        if (exists) return

        const newItems = [...items, product]
        saveCart(newItems)
        dispatch({ type: ADD_TO_CART, payload: product })
    }
}

export const removeFromCart = (id) => {
    return (dispatch, getState) => {
        const newItems = getState().cartReducer.items.filter(
            (item) => item.id !== id
        )
        saveCart(newItems)
        dispatch({ type: REMOVE_FROM_CART, payload: id })
    }
}

// بازیابی سبد از localStorage هنگام لود صفحه سبد خرید
export const loadCart = () => {
    return (dispatch) => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("cart")
            const items = saved ? JSON.parse(saved) : []
            dispatch({ type: SET_CART, payload: items })
        }
    }
}