import axios from "axios";
import {
    GET_SERIES,
    GET_SERIE_NAME,
    FILTER_SERIE_BY_GENERO,
    POST_SERIE,
    ORDER,
    GET_DETAIL,
    PUT_SERIE_ID

} from "./action"

export function getSerieDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/series/${id}`);
            console.log("json getseriedetail ",json.data)
            return dispatch({
                type: GET_DETAIL,
                payload: json.data,
            })
        } catch (error) {
            alert("conection failed");
        }
    }
}



export function getSeries() {
    return async function (dispatch) {
        try {
            var json = await axios.get("/series");
            return dispatch({
                type: GET_SERIES,
                payload: json.data,
            })
        } catch (error) {
            alert("conection failed");
        }
    }
}

export function getSerieName(name) {
    //console.log(name)
    return async function (dispatch) {
        try {
            var resp = await axios.get(`/series?name=${name}`)
            return dispatch({
                type: GET_SERIE_NAME,
                payload: resp.data
            })
        } catch (error) {
            alert("Error al buscar la serie")
        }
    }
}

export function order(payload) {
    return {
        type: ORDER,
        payload
    }
}

export function filterSeriesByGenero(payload) {
    return {
        type: FILTER_SERIE_BY_GENERO,
        payload
    }
}

export function postSerie (payload) {
    return async function(){
        try{
            await axios.post('/serie', payload);
            return {
                type: POST_SERIE,
            }
        } 
        catch(error){
            alert("Post failed")
        }
    } 
} 


export function postSerieId (payload) {
    console.log("payload",payload)
    return async function(){
        try{
            await axios.put(`/series/${payload.id}`, payload);
            return {
                type: PUT_SERIE_ID,
            }
        } 
        catch(error){
            alert("Post failed")
        }
    } 
} 

//-------------------------------------------------------



