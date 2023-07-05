import axios from 'axios'
import {SET_USER} from "../redux/slice/UserSlice";
import {API_URL} from "../config";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password
            })
            dispatch(SET_USER(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/api/auth/auth`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(SET_USER(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            localStorage.removeItem('token');
            alert(e.response.data.message);
        }
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(`${API_URL}/api/auth/avatar`, formData,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(SET_USER(response.data))
        } catch (e) {
            console.log(e);
        }
    }
}

export const deletedAvatar = (file) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}/api/auth/avatar`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(SET_USER(response.data))
        } catch (e) {
            console.log(e);
        }
    }
}