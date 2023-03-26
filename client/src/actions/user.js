import axios from 'axios'
import {SET_USER} from "../redux/slice/UserSlice";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login =  (email, password) => {
    return async  dispatch =>{
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
                email,
                password
            })
            dispatch(SET_USER(response.data.user));
            localStorage.setItem('token' ,response.data.token);
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(SET_USER(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            localStorage.removeItem('token');
            alert(e.response.data.message);
        }
    }
}