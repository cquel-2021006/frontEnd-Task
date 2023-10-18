import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { DeleteTask, getTask } from '../api/apiTask'


export const Task = () => {
    const [taskList, setTaskList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [task, setTask] = useState([]);

    const viewTask = async () => {
        const listTask = await getTask();
        setTaskList(listTask);
    };

    useEffect(() => {
        viewTask();
    }, [showModal]);

    const eliminar = async (id) => {
        const confirmacion = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará la tarea permanentemente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        });

        if (confirmacion.isConfirmed) {
            let result = await DeleteTask(id);
            if (result) {
                setTaskList(taskList.filter((c) => c._id !== id));
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: "Se eliminó el tarea correctamente!",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se pudo eliminar la tarea",
                });
            }
        }
    };

    return (
        <div>
            <br />
            <br />
            <div
                style={{
                    backgroundColor: " #f8f7f6",
                    textAlign: "center",
                    opacity: "100%",
                    marginBottom: "20px",
                }}
            >
                <h3 >Tus Tareas:</h3>
            </div>
            <table className="table">
                <thead style={{ backgroundColor: "#FAD7A0" }} className="text-center">
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Fecha</th>
                        <th>Prioridad</th>
                        <th>Opcion</th>
                    </tr>
                </thead>

                {taskList?.map((t) => {
                    return (

                        <tbody key={t._id} className="text-center">
                            <tr>
                                <td>{t.nombre}</td>
                                <td>{t.descripcion}</td>
                                <td>{t.fecha}</td>
                                <td>{t.prioridad}</td>
                                <td>
                                    <div className="d-grid gap-2">
                                        <button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => {
                                                eliminar(t._id);
                                            }}
                                            style={{ backgroundColor: "#CD5C5C", borderRadius: '15px', border: 'none', color: 'white', padding:'5px' }} >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                    );
                })}
            </table>

            <br />
            <br />
        </div>
    );
};
