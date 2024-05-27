const Toast =({mensaje, modificada}) =>{
    // Obtener el elemento del toast y el botón de cerrar
  const toast = document.querySelector('.toast');
  const closeButton = toast ? toast.querySelector('.btn-close') : null;

  // Función para mostrar el toast
  const showToast = () => {
    if (toast) {
      toast.classList.add('show');
    }
  };

  // Función para ocultar el toast
  const hideToast = () => {
    if (toast) {
      toast.classList.remove('show');
    }
  };

  // Agregar evento de clic al botón de cerrar
  if (closeButton) {
    closeButton.addEventListener('click', hideToast);
  }

  // Llamar a la función para mostrar el toast
  showToast();

  const clase =`${modificada} toast align-items-center  border-0 `
    return(
        <div class={clase} role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
              <div class="toast-body">
                {mensaje}
              </div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
    )
}
export default Toast;