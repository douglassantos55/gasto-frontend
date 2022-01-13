import sway from "sweetalert";

export default function () {
  function success(title, text) {
    sway({ icon: "success", title, text });
  }

  function error(title, text) {
    sway({ icon: "error", title, text });
  }

  // TODO: use loader instead
  function wait(title, text) {
    sway({
      icon: "info",
      title,
      text,
      buttons: false,
      closeOnEsc: false,
      closeOnClickOutside: false,
    });
  }

  async function confirm(title, text, callback) {
    const value = await sway({
      icon: "info",
      title,
      text,
      dangerMode: true,
      buttons: ["Cancelar", "Confirmar"],
    });
    return value && callback();
  }

  return { wait, error, success, confirm };
}
