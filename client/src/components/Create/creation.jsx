import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {postSerie} from "../../actions/index"
import icon from "../img/reload.png"
import iconHome from "../img/home1.png"
import "./creation.css"
import swal from 'sweetalert';

const validate = function(input){

    /* 
    name                                    
    description
    date
    stars     
    gender    
    price    
    state
    atp                     
    */

    let errors = {}
    if (!input.gender){
        errors.gender = "Ingresar un genero a la serie"
    }
     if (!input.name){
         errors.name = "Ingresar un titulo a la serie"
     }
     if (!input.description){
        errors.description = "Ingresar una descripcion para la serie"
    }
     //Valida cualquier fecha, incluyendo los días de febrero en años bisiestos.
     if (!input.date.match(/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/)){
        errors.date = "El fecha debe de ser en el formato correcto  DD/MM/AAAA"
    }
    if (!input.stars){
        errors.stars = "Ingresar una calificacion a la serie"
    }
    if (parseInt(input.stars) < 1 ){
        errors.stars = "Ingresar una calificacion a la serie debe de ser entre 1 a 5 estrellas"
    }
    if (parseInt(input.stars) > 5 ){
        errors.stars = "Ingresar una calificacion a la serie debe de ser entre 1 a 5 estrellas"
    }
    if (input.price){
        if (input.price.match(/^[a-zA-Z]+$/)){
            errors.price = "El precio debe de ser un numero"
        }
        if (parseInt(input.price) < 0){
        errors.price = "Ingresar un precio a la serie debe de ser meyor o igual que 0"
        }
        if (parseInt(input.price) > 999){
            errors.price = "Ingresar un precio a la serie debe de ser menor a 999"
        }
    }
    else{
        errors.price = "Ingresar un precio a la serie"
    }
    return errors
}

export default function DogCreate(){ 
    const dispatch = useDispatch()
    const generos = useSelector((state) => state.generos)
    const [errors, setErrors] = useState({})
    
    const [input, setInput] = useState({
        name: "",                                   
        description: "",
        date:"",
        stars: 0,
        gender:"", 
        price: 0,
        state:"ACTIVO",
        atp:false,
    })

    //console.log(input)
    
    function refreshPage() {
        window.location.reload(false);
    }

    function handleChange(e){
        //console.log("handrechange",e)
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e){
        //console.log(e.target.value);
        setInput({
            ...input,
            gender : e.target.value
        })
    }

    function handleChecked(e){
        console.log("handrechange",e.target.checked)
        setInput({
            ...input,
            atp : e.target.checked
        })
        console.log("state",input)
    }

    function handlePrice(e){
        console.log("handrechange",e.target.value)
        let precio = e.target.value.toString().replace(/\,/g,'.');

        setInput({
            ...input,
            price : precio
        })
        console.log("state",input)
    }



    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        setErrors(validate(input))
        const errorSaver = validate(input)

        console.log(errorSaver)

        if (Object.values(errorSaver).length !== 0) {
            messajeError()
            //alert("Error, Completa los campos con valores que cumplan las condiciones para crear tu serie")
        } else {
            dispatch(postSerie(input))
            navigate("/")
            console.log("input enviado", input);
            //alert("Serie creada")
            alertaSerieGuardada()
            setInput({
                name:"",
                description:"",
                date:"",
                gender:"",
                stars:"",
                price:"",
                atp:false,
            })
        }
    }

    const alertaSerieGuardada = () => {
        swal({
            title: "Serie creada",
            text:
                "Tu serie creada se guardará para que puedas visualizarlo en cualquier momento",
            icon: "success",
            button: "Ok",
        })
    };

    const messajeError= () => {
        swal({
            title: "Error",
            text:
                "Error, Completa los campos con valores que cumplan las condiciones para crear la nueva serie",
            icon: "error",
            button: "Ok",
        })
    };

    return(
        <div className="fondo">

            <div className="titleRefreshHome">
            <button
                type="submit"
                onClick={refreshPage}
                className="buttonRefresh">
			    <img
                    className="iconRefresh"
                        src={icon}
                        width="35px"
                    alt="">
                </img>
            </button>
            
            <div className="homeButton">
                <Link
                    to="/"
                    className=""
                    >
                        <img
                        src={iconHome}
                            alt=""
                            width="35px"
                        className="iconHome"
                    />
                    Volver
                </Link>
            </div>
            
            <h1 className="tituleCrear">Crea una serie nueva</h1> 

            </div>

            <div className="card-containers">

                <div className="form-group">

                    <div className="form-control">
                        <label>Titulo</label>
                        <input className="form-check"
                        type= "text"
                        value= {input.name = input.name.substring(0, 1).toUpperCase() + input.name.substring(1)}
                        name="name"
                        placeholder="Titulo de serie"
                        onChange={(e) => handleChange(e)}/>
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div className="form-control">
                        <label>Descripcion</label>
                        <input className="form-check"
                        type= "textarea"
                        value= {input.description = input.description.substring(0, 1).toUpperCase() + input.description.substring(1)}
                        name="description"
                        placeholder="Descripcion de serie"
                        onChange={(e) => handleChange(e)}/>
                        {errors.description && <p className="error">{errors.description}</p>}
                    </div>

                    <div className="form-control">
                        <label>Fecha de creacion</label>
                        <input className="form-check"
                        type= "text"
                        value= {input.date}
                        name="date"
                        placeholder="DD/MM/AAAA"
                        onChange={(e) => handleChange(e)}/>
                        {errors.date && <p className="error">{errors.date}</p>}
                    </div>

                    <div className="form-control">
                        <label>Estrellas</label>
                        <input className="form-check"
                        type= "number"
                        min="1"
                        max="5"
                        value= {input.stars}
                        name="stars"
                        placeholder="Del 1 al 5"
                        onChange={(e) => handleChange(e)}/>
                        {errors.stars && 
                            <p className="error">{errors.stars}</p>}
                    </div>

                    <div className="form-control">
                        <label>Precio de alquiler</label>
                        <input className=""
                        type= "text"
                        value= {input.price}
                        name="price"
                        placeholder="$$$$"
                        onChange={(e) => handlePrice(e)}/>
                        {errors.price && 
                            <p className="error">{errors.price}</p>}
                    </div>

                    <div className="form-control">
                        <label>Apto para todo publico</label>
                        <input className="inputs"
                        type= "radio"
                        checked= {input.atp}
                        name="atp"
                        onChange={(e) => handleChecked(e)}/>
                        {errors.atp && <p className="error">{errors.atp}</p>}
                    </div>

                    <div>
                    <select onChange={(e) => handleSelect(e)}  className="form-control form-control-lg">
                        <option hidden value="default">Generos</option>
                        {generos.map((g) => (
                            <option
                                key={g}
                                value={g}
                            >{g}</option>
                        ))}
                    </select>
                    {errors.gender && <p className="error">{errors.gender}</p>}
                    </div>

                </div>

                <div>
                        <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={(e) => handleSubmit(e)}
                        >Crear serie</button>
                    </div>
            </div>
        </div>
    )

}