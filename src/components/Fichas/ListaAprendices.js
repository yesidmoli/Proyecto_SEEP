import { Fragment } from "react"
import '../../../src/css/stylelista.css'
function ListaAprendices(){

    return(
        <Fragment>
             <div class="contenedor-lista">
                <div class="ficha">
                    <section className="info">
                    <img src="https://certificadossena.net/wp-content/uploads/2022/10/logo-sena-naranja-png-2022.png"  className="img-logo" alt="img"/>
                    <h4>Análisis y desarrollo de software</h4>
                    <h4>2653755</h4>
                    </section>
                   
                   <br></br>

                    <div class="texto">
                        <select class="seleccion"  name="acount-type">
                            <option value="" disabled selected hidden>Filtrar</option>
                            <option value="aprobado">Aprobado</option>
                            <option value="No aprobado">No aprobado</option>
                            <option value="Pendiente por aprobar">Pendiente por aprobar</option>
                            <option value="Aplazado">Aplazado</option>
                            <option value="Visita 1">Visita 1</option>
                            <option value="Visita 2">Visita 2</option>
                            <option value="Visita 3">Visita 3</option>
                            
                        </select>
                        </div>
                </div>

                <div class="lista">
                <h3 class="titulo-aprendices">Aprendices</h3>
                <ul class="lista-aprendices">
                    <li>
                        <div class="img-aprendiz"><img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="img aprendiz"/><a href="aprendiz.html">Yesid Molina Becerra</a></div><p>Aprendiz</p></li>
                    <li><div class="img-aprendiz"><img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="img aprendiz"/><a href="aprendiz.html">Laura Ximena</a></div><p>Aprendiz</p></li>
                    <li><div class="img-aprendiz"><img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="img aprendiz"/><a href="aprendiz.html">Jhon Andres</a></div><p>Aprendiz</p></li>
                    <li><div class="img-aprendiz"><img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="img aprendiz"/><a href="aprendiz.html">Jhon Parra</a></div><p>Aprendiz</p></li>
                    <li><div class="img-aprendiz"><img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="img aprendiz"/><a href="aprendiz.html">Yesid Molina Becerra</a></div><p>Aprendiz</p></li>
                    

                </ul>
            </div>
                </div>
            
        </Fragment>
    )
}
export default ListaAprendices