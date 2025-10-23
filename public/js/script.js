document.querySelector("#searchBtn").addEventListener("click", getData);

async function getData() {
    let zip = document.querySelector("#cityInput").value;
    window.location.href = "/weather?zip=" + zip; // stack overflow
}