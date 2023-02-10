const div = document.getElementById("main");
const p = document.createElement("p");
p.innerHTML = "";
div.appendChild(p);

//Recieve message from iframe
window.addEventListener("message", recieveMessage, false);

function recieveMessage(event) {
  console.log(event.data.result);
  if (event.data.Result != undefined) {
    p.innerHTML = JSON.stringify(event.data);
  }
}
