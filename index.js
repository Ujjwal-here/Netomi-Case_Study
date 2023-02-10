const div = document.getElementById("main");
const p = document.createElement("p");
p.innerHTML = "";
div.appendChild(p);

window.addEventListener("message", recieveMessage, false);

function recieveMessage(event) {
  // Do something with event.data

  console.log(event.data.result);
  if (event.data.Result != undefined) {
    p.innerHTML = JSON.stringify(event.data);
  }
}
