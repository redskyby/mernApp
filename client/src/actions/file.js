import axios from "axios";
import {ADD_FILE, DELETE_FILE, SET_FILES} from "../redux/slice/FileSlice";
import {ADD_UPLOADER_FILE, CHANGE_UPLOAD_FILE, SHOW_UPLOADER} from "../redux/slice/UploadSlice";
import {HIDE_LOADER, SHOW_LOADER} from "../redux/slice/AppSlice";
import {API_URL} from "../config";

export function getFiles(dirId, sort) {
    return async dispatch => {
        try {
            dispatch(SHOW_LOADER());
            let url = `${API_URL}api/files`;
            if (dirId) {
                url = `${API_URL}api/files?parent=${dirId}`;
            }
            if (sort) {
                url = `${API_URL}api/files?sort=${sort}`;
            }
            if (dirId && sort) {
                url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`;
            }
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(SET_FILES(response.data));
            //console.log(response.data);
        } catch (e) {
            alert(e.response.data.message);
        } finally {
            dispatch(HIDE_LOADER());
        }
    }
}

export function createDir(dirId , name){
    return async dispatch =>{
        try {
            const response = await axios.post(`${API_URL}api/files`,{
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
            const uploadFile = {name: file.name, progress: 0, id: Date.now()}
            dispatch(SHOW_UPLOADER());
            dispatch(ADD_UPLOADER_FILE(uploadFile));
            const response = await axios.post(`${API_URL}api/files/upload`, formData ,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress :( progressEvent )=> {
                        const totalLength = progressEvent.event.lengthComputable ? progressEvent.total : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
                        console.log('total', totalLength);
                        if (totalLength ) {
                            // uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                            // dispatch(CHANGE_UPLOAD_FILE(uploadFile));
                            const updatedFile = { ...uploadFile, progress: Math.round((progressEvent.loaded * 100) / totalLength) };
                            dispatch(CHANGE_UPLOAD_FILE(updatedFile));
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
        const response = await fetch(`${API_URL}api/files/download?id=${file._id}`,{
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
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
}

export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(DELETE_FILE(file._id));
            alert(response.data.message);
        } catch (e) {
            alert(e.response.data.message);
        }
    }
}

export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/files/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(SET_FILES(response.data));
        } catch (e) {
            alert(e.response.data.message);
        }finally {
            dispatch(HIDE_LOADER())
        }
    }
}