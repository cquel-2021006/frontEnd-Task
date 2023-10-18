import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://localhost:8080/api/task/";

export const getTask = async () => {
  try {
    const response = await axios.get(`${URL}get`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const DeleteTask = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}delete/${id}`);

    return true;
  } catch ({
    response: {
      data: { message },
    },
  }) {
    if (message === "Task Delete") {
      window.location.href = "/";
    }
    if (message) {
      return message;
    }
  }
};

export const createTask = async (nombre, descripcion, fecha, prioridad) => {
  console.log(nombre);
  try {
    const { taskSave } = await axios.post(`${URL}post`, {
      nombre: nombre.nombre,
      descripcion: nombre.descripcion,
      fecha: nombre.fecha,
      prioridad: nombre.prioridad
    });
    return true;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se pudo agregar el usuario",
    });
  }
};
