
const canvas = document.getElementById('previewCanvas');
const ctx = canvas.getContext('2d');

let backgroundImage = null;
let clothingImage = null;

document.getElementById('backgroundInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const img = new Image();
    img.onload = () => {
        backgroundImage = img;
        drawPreview();
    };
    img.src = URL.createObjectURL(file);
});

document.getElementById('clothingInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const img = new Image();
    img.onload = () => {
        clothingImage = img;
        drawPreview();
    };
    img.src = URL.createObjectURL(file);
});

function drawPreview() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (backgroundImage) ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    const model = new Image();
    model.onload = () => {
        ctx.drawImage(model, 0, 0, canvas.width, canvas.height);
        if (clothingImage) ctx.drawImage(clothingImage, 0, 0, canvas.width, canvas.height);
    };
    model.src = 'model.png'; // Place a transparent model image named "model.png" in the folder
}

function saveOutfit() {
    const tag = document.getElementById('tagInput').value;
    const imgData = canvas.toDataURL();
    const savedGallery = document.getElementById('savedGallery');

    const img = new Image();
    img.src = imgData;
    img.title = tag;
    savedGallery.appendChild(img);

    // Optional: Save to localStorage (not persistent across sessions)
}
