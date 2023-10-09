import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/searchBar";
import reload from "../img/reload.png"
import { postSerieId } from "../../actions/index"
import swal from 'sweetalert';

import {
    filterSeriesByGenero,
    order,
    getSeries,
} from "../../actions/index";


export default function Home() {
    const dispatch = useDispatch();
    const allseries = useSelector((state) => state.series);
    console.log(allseries)
    const allGeneros = useSelector((state)=> state.generos);
    allGeneros.sort(function (a, b) {
        if (a > b) {
            return 1;
        }
        if (b > a) {
            return -1
        }
        return 0;
    })

    useEffect(() => {
         dispatch(getSeries())
    }, [dispatch]);

    const [, setOrden] = useState("");

    useEffect(() => {
        dispatch(getSeries());
    },[dispatch]);


    function handleRefresh() {
        window.location.reload(false);
    }

    function handleSubmit(e){
        console.log("handleSubmit",e);
        //alert("editar serie")
        //agregar alerta confirmacion de cambio de estado
        //alertaCambioDeEstado()
        dispatch(postSerieId(e))
        handleRefresh()
    }


    const alertaCambioDeEstado = () => {
        swal({
            title: "estado cambiado",
            text:
                "La serie cambio a estado DESACTIVADA",
            icon: "success",
            button: "Ok",
        })
    };



    function handleOrder(e) {
        e.preventDefault();
        dispatch(order(e.target.value));
        setOrden(`${ e.target.value }`);
    }
    
    
    function handleFilterSerieByGeneros(e) {
        e.preventDefault();
        dispatch(filterSeriesByGenero(e.target.value));
    }
    
    
    return (
        <div data-bs-theme="dark">
            <div>
                <h1 className="titulo" data-bs-theme="dark">Administrador de series</h1>
                <button
                    type="submit"
                    onClick={handleRefresh}
                    className="refresh"
                    >
                <img
                    width="20px" height="20px"
                    className="icon"
                    src={reload}
                    alt="">
                </img>
                </button>
                <div className="btn btn-primary">
                    <Link
                        to="/createSerie"
                        className=""
                    >Nueva serie</Link>    
                </div>

                <SearchBar/>

                {/* <select onChange={e=>handleOrder(e)} class="dropdown" data-bs-theme="dark">
                    <option value="default">Orden Alfabetico</option>
                    <option value="Asc"> A-Z</option>
                    <option value="Des"> Z-A</option>
                </select>

                <select onChange={(e) => handleFilterSerieByGeneros(e)} class="dropdown" data-bs-theme="dark">
                    <option value="All">Categorias</option>
                    {
                        allGeneros.map((Generos) => (
                        <option
                            value={Generos}
                            key={Generos}
                        >{Generos}</option>
                        ))
                    }
                </select> */}
            </div>



            <div>
            <table className="table table-striped table-bordered" data-bs-theme="dark">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Descripcion</th>
                        <th>Fecha de estreno</th>
                        <th>Estrellas</th>
                        <th>Genero</th>
                        <th>Precio Alquiler</th>
                        <th>ATP</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                        {allseries.length > 0 ? (
                            allseries.map(d => {
                                let result
                                d.atp == true ? result = "SI" : result = "NO"
                                return (
                                    <tr key={d.id}>
                                        <td>{d.name}</td>
                                        <td>{d.description}</td>
                                        <td>{d.date}</td>
                                        <td>{d.stars}</td>
                                        <td>{d.gender}</td>
                                        <td>${d.price}</td>
                                        <td>{result}</td>
                                        <td>{d.state}</td>
                                        <td><Link to={`/serie/${d.id}`}>
                                                <button className="btn btn-primary" >Modificar</button>
                                            </Link> 
                                        </td>
                                        {d.state == "ACTIVO"?
                                        <td>
                                            <button 
                                                type="submit"
                                                onClick={(e) => {
                                                    let imput = {
                                                        id:d.id,
                                                        name:d.name,
                                                        description:d.description,
                                                        date:d.date,
                                                        stars:d.stars,
                                                        gender:d.gender,
                                                        price:d.price,
                                                        result:result,
                                                        state:"ANULADO"
                                                    }
                                                    handleSubmit(imput)}}
                                                className="btn btn-danger" 
                                                >Desactivar</button> 
                                        </td> :
                                        <td>
                                            <button 
                                                type="delete"
                                                onClick={(e) => handleSubmit(e)}
                                                className="btn btn-danger" 
                                                >Eliminar</button> 
                                        </td> 
                                        }
                                        
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td></td>
                            </tr>
                        )}
                </tbody>
            </table>
            </div>

        </div>
    )

}