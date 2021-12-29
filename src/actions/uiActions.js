import { types } from "../types/types"

export const uiOpenModalAction = () => {
    return {
        payload:{
            openModal:true
        },
        type: types.uiOpenModal
    }
}

export const uiCloseModalAction = () => {
    return {
        payload:{
            openModal:false
        },
        type: types.uiCloseModal
    }
}