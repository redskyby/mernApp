import axios from "axios";
import {ADD_FILE, SET_FILES} from "../redux/slice/FileSlice";

export function getFiles(dirId){
    return async dispatch =>{
        try {
            const response = await axios.get(`http://localhost:5000/api/files${dirId ? '?parent='+dirId : ''}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(SET_FILES(response.data));
            //console.log(response.data);
        }catch (e) {
            alert(e.response.data.message);
        }
    }
}

export function createDir(dirId , name){
    return async dispatch =>{
        try {
            const response = await axios.post(`http://localhost:5000/api/files`,{
                name,
                parent : dirId,
                type : 'dir'

            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(ADD_FILE(response.data));
        }catch (e) {
            alert(e.response.data.message);
        }
    }
}

export function upLoadFile(file , dirId) {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file' , file);
            if(dirId){
                formData.append('parent' , dirId);
            }
            const response = await axios.post(`http://localhost:5000/api/files/upload`, formData ,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress :( progressEvent )=> {

                        const totalLength = progressEvent.event.lengthComputable ? progressEvent.total : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
                        console.log('total', totalLength);
                        if (totalLength ) {
                            let progress = Math.round((progressEvent.loaded * 100) / totalLength);
                            console.log(progress);
                        }
                }
            });
            dispatch(ADD_FILE(response.data));
        } catch (e) {
            alert(e.response.data.message);
        }
    }
}

export async function downloadFile(file){
        const response = await fetch(`http://localhost:5000/api/files/download?id=${file.id}`,{
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')} `
            }
        })
        if(response.status === 200){
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            document.appendChild(link);
            link.click();
            link.remove();
        }
}