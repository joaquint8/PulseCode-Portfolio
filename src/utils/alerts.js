export const showLoading = async () => {
  const { default: Swal } = await import('sweetalert2');
  Swal.fire({
    title: 'Enviando...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });
};

export const showSuccess = async () => {
  const { default: Swal } = await import('sweetalert2');
  Swal.fire({
    icon: 'success',
    title: 'Mensaje enviado',
    confirmButtonColor: '#d4ff00',
    customClass: {
      confirmButton: 'swal-confirm-btn'
    }
  });
};

export const showError = async () => {
  const { default: Swal } = await import('sweetalert2');
  Swal.fire({
    icon: 'error',
    title: 'Error al enviar',
    confirmButtonColor: '#d4ff00'
  });
};