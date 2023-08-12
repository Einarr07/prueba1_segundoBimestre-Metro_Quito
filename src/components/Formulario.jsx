import { v4 as uuidv4} from "uuid"
import Mensajes from "./Mensajes"
import { useState } from "react"
import { useEffect } from 'react'
import { useForm, Controller } from "react-hook-form";

export const Formulario = ({ setEstado, idMetro }) => {
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState(false);
  
    const [form, setform] = useState({
      nombre: "",
      sector: "",
      salida: "",
      llegada: "",
      maquinista: "",
      detalles: ""
    });
  
    useEffect(() => {
      if (idMetro) {
        (async function (idMetro) {
          try {
            const respuesta = await (
              await fetch(`http://localhost:3000/metro/${idMetro}`)).json();
            const {
              id,
              nombre,
              sector,
              salida,
              llegada,
              maquinista,
              detalles
            } = respuesta;
            setform({
              ...form,
              nombre,
              sector,
              salida,
              llegada,
              maquinista,
              detalles,
              id
            });
          } catch (error) {
            console.log(error);
          }
        })(idMetro);
      }
    }, [idMetro]);
  
    const handleChange = (e) => { 
        setform({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleFormSubmit = async (data) => {
        if (Object.values(data).includes("") || Object.entries(data).length === 0) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 1000);
            return;
        }
        try {
            if (form.id) {
                const url = `http://localhost:3000/metro/${form.id}`;
                await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" }
                });
                setEstado(true);
            } else {
                const url = "http://localhost:3000/metro";
                const newData = { ...data, id: uuidv4() };
                await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(newData),
                    headers: { "Content-Type": "application/json" }
                });
                setMensaje(true);
                setEstado(true);
            }
            // Resetear el estado form a valores vacíos después del envío exitoso
            setform({
                nombre: "",
                sector: "",
                salida: "",
                llegada: "",
                maquinista: "",
                detalles: ""
            });
            setTimeout(() => {
                setMensaje(false);
                setEstado(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            {error && <Mensajes tipo="bg-red-900">"Existen campos vacíos"</Mensajes>}
	        {mensaje && <Mensajes tipo="bg-green-900">"Registro exitoso"</Mensajes>}
            <Mensajes tipo={"bg-red-900"}>validar campos</Mensajes>

            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: 
                </label>
                <Controller
                    name="nombre"
                    control={control}
                    defaultValue=""
                    rules={{ required: "El nombre es obligatorio" }}
                    render={({ field }) => (
                    <div>
                    <input
                        {...field}
                        id='nombre'
                        type="text"
                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.nombre ? "border-red-500" : ""}`}
                        placeholder='nombre de la ruta'
                    />{errors.nombre && <span className="text-red-500">{errors.nombre.message}</span>}
                    </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='sector' className='text-gray-700 uppercase font-bold text-sm'>
                    Sector:
                </label>
                <Controller 
                    name="sector"
                    control={control}
                    defaultValue=""
                    rules={{ required: "El sector es obligatorio" }}
                    render={({ field }) => (
                        <div>
                            <input
                                {...field}
                                id='sector'
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.sector ? "border-red-500" : ""}`}
                                placeholder='sector de la ruta'
                            />
                            {errors.sector && <span className="text-red-500">{errors.sector.message}</span>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='salida' className='text-gray-700 uppercase font-bold text-sm'>
                    Punto de salida:
                </label>
                <Controller
                    name="salida"
                    control={control}
                    defaultValue=""
                    rules={{ required: "El punto de salida es obligatorio" }}
                    render={({ field }) => (
                        <div>
                            <input 
                                {...field}
                                id='salida'
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.salida ? "border-red-500" : ""}`}
                                placeholder='punto de salida'
                            />
                            {errors.salida && <span className="text-red-500">{errors.salida.message}</span>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='llegada' className='text-gray-700 uppercase font-bold text-sm'>
                    Punto de llegada:
                </label>
                <Controller
                    name="llegada"
                    control={control}
                    defaultValue=""
                    rules={{ required: "El punto de llegada es obligatorio" }}
                    render={({ field }) => (
                        <div>
                            <input 
                                {...field}
                                id='llegada'
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.llegada ? "border-red-500" : ""}`}
                                placeholder='punto de llegada'
                            />
                            {errors.llegada && <span className="text-red-500">{errors.llegada.message}</span>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='maquinista' className='text-gray-700 uppercase font-bold text-sm'>
                    Nombre del maquinista:
                </label>
                <Controller
                    name="maquinista"
                    control={control}
                    defaultValue=""
                    rules={{ required: "El nombre del maquinista es obligatorio" }}
                    render={({ field }) => (
                        <div>
                            <input 
                                {...field}
                                id='maquinista'
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.maquinista ? "border-red-500" : ""}`}
                                placeholder='nombre del maquinista'
                            />
                            {errors.maquinista && <span className="text-red-500">{errors.maquinista.message}</span>}
                        </div>
                    )}
                />
            </div>

            <div>
                <label htmlFor='detalles' className='text-gray-700 uppercase font-bold text-sm'>
                    Detalles: 
                </label>
                <Controller
                    name="detalles"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Los detalles son obligatorios" }}
                    render={({ field }) => (
                        <div>
                            <textarea
                                {...field}
                                id='detalles'
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.detalles ? "border-red-500" : ""}`}
                                name='detalles'
                                placeholder='Detalles de la ruta'
                            />
                            {errors.detalles && <span className="text-red-500">{errors.detalles.message}</span>}
                        </div>
                    )}
                />
            </div>


            <input
                type="submit"
                className='bg-sky-900 w-full p-3 
                text-white uppercase font-bold rounded-lg 
                hover:bg-red-900 cursor-pointer transition-all'
                value={form.id ? "Actualizar ruta" : "Registrar ruta"} />
        </form>
    )
}
