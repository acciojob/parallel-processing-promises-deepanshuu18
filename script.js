//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img); // Resolve when image is loaded
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`); // Reject on error
    img.src = image.url; // Trigger image download
  });
}
function downloadAndDisplayImages() {
  // Disable button while images are downloading
  btn.disabled = true;

  // Use Promise.all to download images in parallel
  Promise.all(images.map(downloadImage))
    .then((imageElements) => {
      // Clear previous content in the output div
      output.innerHTML = "";

      // Append all the successfully loaded images to the output div
      imageElements.forEach((img) => {
        output.appendChild(img);
      });

      // Re-enable the button after images are displayed
      btn.disabled = false;
    })
    .catch((error) => {
      // Handle error (if any image fails to load)
      console.error(error);
      alert(error); // Optionally alert the error to the user
      btn.disabled = false; // Re-enable the button even on error
    });
}
btn.addEventListener("click", downloadAndDisplayImages);