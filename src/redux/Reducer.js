import { FAIL_REQUEST, GET_USER_LIST, MAKE_REQUEST, ADD_USER, DELETE_USER, UPDATE_USER, GET_USER_OBJ } from "./ActionType"

const initState = {
    userList: [],
    userObj: {},
    loading: true,
    errmessage: ''
}

export const Reducer = (state = initState, action) => {
    switch (action.type) {
        case MAKE_REQUEST: return {
            ...state,
            loading: true
        }
        case FAIL_REQUEST: return {
            ...state,
            loading: false,
            errmessage: action.payload
        }
        case GET_USER_LIST: return {
            loading: false,
            userList: action.payload,
            userObj: {},
            errmessage: ''
        }
        case DELETE_USER: return {
            ...state,
            loading: false
        }
        case ADD_USER: return {
            ...state,
            loading: false
        }
        case UPDATE_USER: return {
            ...state,
            loading: false
        }
        case GET_USER_OBJ: return {
            ...state,
            loading: false,
            userObj: action.payload
        }
        default: return state
    }
}