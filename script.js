
// the image to convert
var image = new Image();

// the input of the image file
var fileSelector = document.getElementById('file-selector');

// when a file is selected it puts it in the image
fileSelector.onchange = () => {
    
    let reader = new FileReader();
    reader.onload = () => {
        image.src = reader.result;
    }
    reader.readAsDataURL(fileSelector.files[0]);
}

// when the image is loaded it's converted into a set of char
image.onload = () => {

    // sets up the canvas with a preset width
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    let width = 150;
    // computes the height in proportion to the width
    let height = Math.floor(width / image.width * image.height);
    canvas.width = width;
    canvas.height = height;
    // draw the image on the canvas
    context.drawImage(image, 0, 0, width, height);

    var textBox = document.getElementById("text-image");
    textBox.innerHTML = "";

    const greyScale = "@#%*+=:-..";
    var textImage = "";
    for(let i = 0; i < canvas.height; i++){
        for(let j = 0; j < canvas.width; j++){
            // averages the rgb values to get the total brightness of the pixel
            let brightness = 0;
            let px = context.getImageData(j,i,1,1).data;
            for(let k = 1; k < px.length; k++){
                brightness += px[k];
            }
            // selects the character in proportion to the brightness
            let index = Math.floor( brightness / (255 * 3) * (greyScale.length - 1));
            textImage += greyScale.charAt(index);
        }
        
        textBox.innerText += textImage;
        textBox.appendChild(document.createElement("br"));

        textImage = "";
    }

}