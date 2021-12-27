import { types } from "../types/types"

export const openModalAction = () => {
    return {
        payload:{
            openModal:true
        },
        type: types.uiOpenModal
    }
}

export const closeModalAction = () => {
    return {
        payload:{
            openModal:false
        },
        type: types.uiCloseModal
    }
}