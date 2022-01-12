import sway from "sweetalert";

export default function () {
  function success(title, text) {
    sway({ icon: "success", title, text });
  }

  function error(title, text) {
    sway({ icon: "error", title, text });
  }

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

  return { wait, error, success };
}
