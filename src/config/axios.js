import axios from "axios";

//la configuracion del servidor, en caso de subir un dominio
//solo es cambiar la direccion del host.

const clienteAxios = axios.create(
    {
        baseURL:'https://proyect-seep-46bb6469e324.herokuapp.com',
    }
);
export default clienteAxios