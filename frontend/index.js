const check = () => {
  if (!("serviceWorker" in navigator)) {
    alert("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    alert("No Push API Support!");
  }
};

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register("service.js");
  return swRegistration;
};

const main = async () => {
  check();
  const swRegistration = await registerServiceWorker();
  const permission = await window.Notification.requestPermission();
  alert(permission)
};
// main(); we will not call main in the beginning.
