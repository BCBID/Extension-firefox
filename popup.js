document.addEventListener("DOMContentLoaded", function () {
  const captureButton = document.getElementById("capture");

  captureButton.addEventListener("click", function () {
    const port = chrome.runtime.connect({ name: "screenshotChannel" });
    port.postMessage({ action: "startCapturing" });
    });
  });

