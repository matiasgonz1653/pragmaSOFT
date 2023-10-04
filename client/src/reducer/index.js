import {
    GET_SERIES,
    GET_GENEROS,
    ORDER,
    GET_SERIE_NAME,
    GET_DETAIL
} from "../actions/action"

const initialState = {
    detailSerie:[],
    series:[],
    allSeries:[],
    generos:["Accion","Animada","Comedia","Drama","Suspenso","Terror"],

    // dogs: [],
    // detailsDog:[],
    // temperaments: [],
    // allDogs: []
}


function rootReducer(state = initialState, action) {
    
    switch (action.type) {

        case GET_DETAIL:
            return {
                ...state,
                detailSerie : action.payload
            
            }


        case GET_SERIES:
            return {
                ...state,
                series: action.payload,
                allSeries: action.payload
            }


        case GET_GENEROS:
            return {
                ...state,
                generos: action.payload
            }


        case GET_SERIE_NAME:
            return {
                ...state,
                series: action.payload
            }




         //---------------------------------------------------------   
/*         case ORDER_BY_ALPHABETICAL:
            if (action.payload === "default") {
                return {
                    ...state,
                    dogs: state.dogs
                }
            }
            if (action.payload === "Asc") {
                return {
                    ...state,
                    dogs: state.dogs.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0
                    })
                }
            }
            if (action.payload === "Des") {
                return {
                    ...state,
                    dogs: state.dogs.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1
                        }
                        return 0;
                    })
                }
            }
            break;


        case ORDER_BY_WEIGHT:
            //console.log(action)
            if (action.payload === "default") {
                return {
                    ...state,
                    dogs: state.dogs
                }
            }
            if (action.payload === "min_weight") {
                return {
                    ...state,
                    dogs: state.dogs.sort((a, b) => {
                        if (a.weight[0] > b.weight[0]) {
                            return 1;
                        }
                        if (b.weight[0] > a.weight[0]) {
                            return -1;
                        }
                        return 0;
                    })
                }
            }
            if (action.payload === "max_weight") {
                return {
                    ...state,
                    dogs: state.dogs.sort((a, b) => {
                        if (a.weight[1] > b.weight[1]) {
                            return -1;
                        }
                        if (b.weight[1] > a.weight[1]) {
                            return 1;
                        }
                        return 0;
                    })
                }
            }
            break; */

        case ORDER:
            if (action.payload === "default") {
                return {
                    ...state,
                    dogs: state.dogs
                }
            }
            if (action.payload === "Asc") {
                return {
                    ...state,
                    dogs: state.dogs.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0
                    })
                }
            }
            if (action.payload === "Des") {
                return {
                    ...state,
                    dogs: state.dogs.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1
                        }
                        return 0;
                    })
                }
            }
            break;

        default:
            return state;
    }
}

export default rootReducer;