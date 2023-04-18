import axios from "axios";
import {SET_FILES} from "../redux/slice/FileSlice";

export function getFiles(dirId){
    return async dispatch =>{
        try {
            const response = await axios.get(`http://localhost:5000/api/files${dirId ? '?parent='+dirId : ''}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(SET_FILES(response.data));
        }catch (e) {
            alert(e.response.data.message);
        }
    }
}