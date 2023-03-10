const socket = io();

socket.on("all-productos", (data) => {
    console.log(data);

//   for (const el of data) {
//     const span = document.createElement("span");
//     span.innerText = `${el.socketId}: ${el.message}`;
//     textInpput.appendChild(span);
//   }
});