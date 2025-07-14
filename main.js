
const canvas = document.getElementById("tryOnCanvas");
const ctx = canvas.getContext("2d");

const modelImg = new Image();
modelImg.src = "assets/model.png";
modelImg.onload = () => {
  ctx.drawImage(modelImg, 0, 0, canvas.width, canvas.height);
};

document.getElementById("clothingUpload").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (backgroundImg) ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(modelImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  if (file.type === "image/jpeg") {
    const reader = new FileReader();
    reader.onload = (event) => {
      const tempImg = new Image();
      tempImg.onload = () => {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = tempImg.width;
        tempCanvas.height = tempImg.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(tempImg, 0, 0);
        const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
          if (imgData.data[i] > 240 && imgData.data[i + 1] > 240 && imgData.data[i + 2] > 240) {
            imgData.data[i + 3] = 0;
          }
        }
        tempCtx.putImageData(imgData, 0, 0);
        img.src = tempCanvas.toDataURL("image/png");
      };
      tempImg.src = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    img.src = URL.createObjectURL(file);
  }
});

let backgroundImg = null;
document.getElementById("backgroundUpload").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  backgroundImg = new Image();
  backgroundImg.onload = () => {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(modelImg, 0, 0, canvas.width, canvas.height);
  };
  backgroundImg.src = URL.createObjectURL(file);
});

document.getElementById("saveLook").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "my-look.png";
  link.href = canvas.toDataURL();
  link.click();
});
