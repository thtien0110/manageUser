import axios from "axios"
import { FAIL_REQUEST, GET_USER_LIST, MAKE_REQUEST, ADD_USER, DELETE_USER, UPDATE_USER, GET_USER_OBJ } from "./ActionType"
import { toast } from "react-toastify"

const ENV = 'https://kt69r7-3000.csb.app/users'

export const makeRequest = () => {
    return {
        type: MAKE_REQUEST
    }
}

export const failRequest = (err) => {
    return {
        type: FAIL_REQUEST,
        payload: err
    }
}

export const getUserList = (data) => {
    return {
        type: GET_USER_LIST,
        payload: data
    }
}

export const deleteUser = () => {
    return {
        type: DELETE_USER
    }
}

export const addUser = () => {
    return {
        type: ADD_USER
    }
}

export const updateUser = () => {
    return {
        type: UPDATE_USER
    }
}

export const getUserObj = (data) => {
    return {
        type: GET_USER_OBJ,
        payload: data
    }
}

export const fetchUserList = () => {
    return (dispatch) => {
        axios.get(ENV).then(res => {
            const userList = res.data;
            dispatch(getUserList(userList));
        })
            .catch(err => {
                dispatch(failRequest(err.message));
            })
    }
}

export const funDeleteUser = (id) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.delete(ENV + '/' + id).then(res => {
            dispatch(deleteUser());
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}

export const funAddUser = (data) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.post(ENV, data).then(res => {
            dispatch(addUser());
            toast.success('User added successfully!')
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}

export const funUpdateUser = (data, id) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.put(ENV + '/' + id, data).then(res => {
            dispatch(updateUser());
            toast.success('User updated successfully!')
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}

export const fetchUserObj = (id) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get(ENV + '/' + id).then(res => {
            const userlist = res.data;
            dispatch(getUserObj(userlist));
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}