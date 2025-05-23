document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const originalImageCanvas = document.getElementById('originalImageCanvas');
    const generateGifButton = document.getElementById('generateGifButton');
    const generatedGif = document.getElementById('generatedGif');
    const downloadGifButton = document.getElementById('downloadGifButton');
    const ctx = originalImageCanvas.getContext('2d');

    let uploadedImage = null; // To store the uploaded image object

    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            fileNameDisplay.textContent = file.name;
            generateGifButton.disabled = false; // Enable generate button

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    uploadedImage = img; // Store the image
                    // Resize canvas to fit image, maintaining aspect ratio
                    const maxWidth = 400; // Max width for preview
                    const maxHeight = 200; // Max height for preview
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = height * (maxWidth / width);
                        width = maxWidth;
                    }
                    if (height > maxHeight) {
                        width = width * (maxHeight / height);
                        height = maxHeight;
                    }

                    originalImageCanvas.width = width;
                    originalImageCanvas.height = height;
                    ctx.clearRect(0, 0, originalImageCanvas.width, originalImageCanvas.height);
                    ctx.drawImage(img, 0, 0, width, height);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);

            // Hide previous GIF and download button
            generatedGif.style.display = 'none';
            generatedGif.src = '';
            downloadGifButton.style.display = 'none';

        } else {
            fileNameDisplay.textContent = 'No image selected';
            generateGifButton.disabled = true;
            ctx.clearRect(0, 0, originalImageCanvas.width, originalImageCanvas.height);
            uploadedImage = null;
            generatedGif.style.display = 'none';
            generatedGif.src = '';
            downloadGifButton.style.display = 'none';
        }
    });

    generateGifButton.addEventListener('click', () => {
        if (!uploadedImage) {
            alert('Please upload an image first!');
            return;
        }

        generateGifButton.disabled = true; // Disable while generating
        generateGifButton.textContent = 'Generating...';

        // --- Core Waving Flag GIF Generation Logic (Conceptual) ---
        // This is where the complex part goes. You would need:
        // 1. A way to create multiple frames of the 'waving' image.
        //    This typically involves drawing the original image onto a new canvas
        //    for each frame and applying a distortion effect (e.g., sine wave
        //    transformations) to the image pixels.
        // 2. A GIF encoding library (e.g., gif.js, jsgif, or a server-side API).

        // For demonstration, let's simulate a delay and then show a placeholder
        // In a real application, you'd call your GIF generation function here.

        // Example using a placeholder and setTimeout:
        console.log("Starting GIF generation...");
        // Imagine this takes some time...
        setTimeout(() => {
            // After generation, update the GIF source
            // In a real scenario, 'gifBlobUrl' would be the actual generated GIF
            // from your processing.
            const placeholderGif = 'https://media.giphy.com/media/l4pSWQp7qg6kZ2vW8/giphy.gif'; // Replace with your generated GIF
            generatedGif.src = placeholderGif;
            generatedGif.style.display = 'block';
            downloadGifButton.href = placeholderGif; // Set download link
            downloadGifButton.style.display = 'block';

            generateGifButton.disabled = false;
            generateGifButton.textContent = 'Generate Waving Flag';
            alert('GIF generated! (This is a placeholder GIF)');
        }, 3000); // Simulate 3 seconds of processing

        // --- End of Core Logic ---
    });
});