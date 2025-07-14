const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let bgImg = new Image();
let modelImg = new Image();
let clothesImg = new Image();

document.getElementById("bgInput").addEventListener("change", function (e) {
    loadImageFromFile(e.target.files[0], img => {
        bgImg = img;
        drawImages();
    });
});

document.getElementById("modelInput").addEventListener("change", function (e) {
    loadImageFromFile(e.target.files[0], img => {
        modelImg = img;
        drawImages();
    });
});

document.getElementById("clothesInput").addEventListener("change", function (e) {
    loadImageFromFile(e.target.files[0], img => {
        clothesImg = img;
        drawImages();
    });
});

function loadImageFromFile(file, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = () => callback(img);
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function drawImages() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (bgImg.src) ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    if (modelImg.src) ctx.drawImage(modelImg, 0, 0, canvas.width, canvas.height);
    if (clothesImg.src) ctx.drawImage(clothesImg, 0, 0, canvas.width, canvas.height);
}

function saveLook() {
    const link = document.createElement("a");
    link.download = "ji-look.png";
    link.href = canvas.toDataURL();
    link.click();
}
