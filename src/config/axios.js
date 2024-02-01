import axios from "axios";

//la configuracion del servidor, en caso de subir un dominio
//solo es cambiar la direccion del host.

const clienteAxios = axios.create(
    {
        baseURL:'http://localhost:8000'
    }
);
export default clienteAxios