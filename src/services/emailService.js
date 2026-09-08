export const sendEmail = async (form) => {
  const { default: emailjs } = await import('@emailjs/browser');
  return emailjs.sendForm(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    form,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};