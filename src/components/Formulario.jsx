import { v4 as uuidv4} from "uuid"
import Mensajes from "./Mensajes"
import { useState } from "react"
import { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";

export const Formulario = ({ setEstado, idMetro }) => {
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState(false);
    const [form, setForm] = useState({
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
                        await fetch(`http://localhost:3000/metro/${idMetro}`)
                    ).json();
                    const {
                        id,
                        nombre,
                        sector,
                        salida,
                        llegada,
                        maquinista,
                        detalles
                    } = respuesta;
                    setForm({
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

    const handleFormSubmit = async (data) => {
        if (Object.values(data).some((value) => value === "")) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 1000);
            return;
        }
        try {
            if (idMetro) {
                const url = `http://localhost:3000/metro/${idMetro}`;
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

            setTimeout(() => {
                setMensaje(false);
                setEstado(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik initialValues={form} onSubmit={handleFormSubmit}>
            <Form>
                {error && <Mensajes tipo="bg-red-900">Existen campos vacíos</Mensajes>}
                {mensaje && <Mensajes tipo="bg-green-900">Registro exitoso</Mensajes>}
                <Mensajes tipo={"bg-red-900"}>Validar campos</Mensajes>

                <div>
                    <label htmlFor='nombre' className='text-gray-700 uppercase font-bold text-sm'>
                        Nombre:
                    </label>
                    <Field
                        type="text"
                        id="nombre"
                        name="nombre"
                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5`}
                        placeholder='nombre de la ruta'
                    /><ErrorMessage name="nombre" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                    <label htmlFor="sector" className='text-gray-700 uppercase font-bold text-sm'>
                        Sector:
                    </label>
                    <Field
                        type="text"
                        id="sector"
                        name="sector"
                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5`}
                        placeholder='sector de la ruta'
                    /><ErrorMessage name="sector" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                    <label htmlFor="salida" className='text-gray-700 uppercase font-bold text-sm'>
                        Punto de salida:
                    </label>
                    <Field
                        type="text"
                        id="salida"
                        name="salida"
                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5`}
                        placeholder='punto de salida'
                    /><ErrorMessage name="salida" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                    <label htmlFor="llegada" className='text-gray-700 uppercase font-bold text-sm'>
                        Punto de llegada:
                    </label>
                    <Field
                        type="text"
                        id="llegada"
                        name="llegada"
                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5`}
                        placeholder='punto de llegada'
                    /><ErrorMessage name="llegada" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                    <label htmlFor='maquinista' className='text-gray-700 uppercase font-bold text-sm'>
                        Nombre del maquinista:
                    </label>
                    <Field
                        type="text"
                        id="maquinista"
                        name="maquinista"
                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5`}
                        placeholder='nombre del maquinista'
                    /><ErrorMessage name="maquinista" component="div" className="text-red-500 mt-1" />
                </div>

                <div>
                    <label htmlFor='detalles' className='text-gray-700 uppercase font-bold text-sm'>
                        Detalles:
                    </label>
                    <Field
                        as="textarea"
                        id="detalles"
                        name="detalles"
                        className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5`}
                        placeholder='Detalles de la ruta'
                    /><ErrorMessage name="detalles" component="div" className="text-red-500 mt-1" />
                </div>

                <input
                type="submit"
                className='bg-sky-900 w-full p-3 
                text-white uppercase font-bold rounded-lg 
                hover:bg-red-900 cursor-pointer transition-all'
                value={form.id ? "Actualizar ruta" : "Registrar ruta"} />
            </Form>
        </Formik>
    );
};
