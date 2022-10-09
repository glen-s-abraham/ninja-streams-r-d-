let socket = io("http://localhost:9000", { transports: ["websocket"] });
let nsSocket = "";
socket.on("nsList", (nsList) => {
  const nameSpaceDiv = document.querySelector(".namespaces");
  nameSpaceDiv.innerHTML = "";
  nsList.forEach(
    (ns) =>
      (nameSpaceDiv.innerHTML += `<div class = "namespace" ns=${ns.endpoint}><img src = "${ns.img}"></div>`)
  );
  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    elem.addEventListener("click", (e) => {
      const nsEndpoint = elem.getAttribute("ns");
      console.log(nsEndpoint);
    });
  });
  joinNs("/wiki");
});
