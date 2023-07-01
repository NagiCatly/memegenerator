const generateMemeButton = document.querySelector(".generate-meme-btn");
const memeImage = document.getElementById("meme-image");
const memeCaption = document.getElementById("meme-caption");
const imageInput = document.getElementById("image-input");
const captionInput = document.getElementById("caption");
const sendMemeButton = document.getElementById("send-meme-btn");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

generateMemeButton.addEventListener("click", generateMeme);
sendMemeButton.addEventListener("click", sendMeme);

function generateMeme() {
  fetch("/api/memes")
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const meme = data[randomIndex];
        memeImage.src = meme.image;
        memeCaption.textContent = meme.caption;
      } else {
        showErrorMessage("No approved memes available.");
      }
    })
    .catch((error) => {
      console.error("Error fetching memes:", error);
      showErrorMessage("An error occurred while fetching memes.");
    });
}

function sendMeme() {
  const imageFile = imageInput.files[0];
  const caption = captionInput.value;

  if (!imageFile || !caption) {
    showErrorMessage("Both meme image and caption are required.");
    return;
  }

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("caption", caption);

  fetch("/api/memes", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.approved) {
        showSuccessMessage("Meme sent successfully!");
      } else {
        showErrorMessage("Meme sent for approval.");
      }
    })
    .catch((error) => {
      console.error("Error sending meme:", error);
      showErrorMessage("An error occurred while sending the meme.");
    });
}

function showSuccessMessage(message) {
  captionInput.value = "";
  successMessage.textContent = message;
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.textContent = "";
    successMessage.style.display = "none";
  }, 5000);
}

function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  setTimeout(() => {
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
  }, 5000);
}
