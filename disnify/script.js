const upload = document.getElementById('upload');
const previewImage = document.getElementById('previewImage');
const convertBtn = document.getElementById('convertBtn');

upload.addEventListener('change', () => {
  const file = upload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

convertBtn.addEventListener('click', () => {
  alert("This is where the Disney-style conversion would happen! 🪄✨ (Connect to an API here)");
});
