import Swal from "sweetalert2";
import { createTask } from "../api/apiTask";

export const sendData = async (state, option) => {
  let resultado;
  console.log(state.task);
  switch (option) {
    case 1:
      resultado = await createTask({
        nombre: state.task.nombre,
        descripcion: state.task.descripcion,
        fecha: state.task.fecha,
        prioridad: state.task.prioridad
      });
      if (resultado) {
        Swal.fire({
          icon: "success",
          title: "Genial!",
          text: "Se agrego la tarea",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        })
      }

      break;
  }
};

