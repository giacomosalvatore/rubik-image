
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
    var originalCanvas = document.createElement('canvas');
    var original = originalCanvas.getContext('2d');
    let width = 90;
    // computes the height in proportion to the width
    let height = Math.floor(width / image.width * image.height);
    originalCanvas.width = width;
    originalCanvas.height = height;
    // draw the image on the canvas
    original.drawImage(image, 0, 0, width, height);

    var rubikCanvas = document.getElementById("rubik");
    rubikCanvas.width = width * 4;
    rubikCanvas.height = height * 4;
    var rubik = rubikCanvas.getContext("2d");

    const colors = [
        [0, 0, 255],    // blue
        [255, 0, 0],    // red
        [255, 128, 0],  // orange
        [0, 255, 0],    // green
        [255, 255, 0],  // yellow
        [255, 255, 255],    // white
        []
    ];
    // checks the lowest and highest brightness;
    let bright = {
        min: 255,
        max: 0,
    }
    for(let i = 0; i < originalCanvas.height; i++) {
        for(let j = 0; j < originalCanvas.width; j++) {
            let px = original.getImageData(j,i,1,1).data;
            // averages the rgb values to get the total brightness of the pixel
            let brightness = 0;
            for(let k = 1; k < px.length; k++){
                brightness += px[k];
            }
            brightness /= 3;
            if(brightness < bright.min){
                bright.min = brightness;
            }
            if(brightness > bright.max){
                bright.max = brightness;
            }
        }
    }


    for(let i = 0; i < originalCanvas.height; i++){
        for(let j = 0; j < originalCanvas.width; j++){

            let px = original.getImageData(j,i,1,1).data;

            // averages the rgb values to get the total brightness of the pixel
            let brightness = 0;
            for(let k = 1; k < px.length; k++){
                brightness += px[k];
            }
            brightness /= 3;
            // selects the color in proportion to the brightness
            let index = Math.floor( (brightness - bright.min) / (bright.max - bright.min) * (colors.length - 1));
            let closestColor = colors[index];


            // fills the pixel with the closest color
            rubik.fillStyle = 'rgb(' + closestColor[0] + ',' + closestColor[1] + ',' + closestColor[2] + ')';
            rubik.fillRect(j*4,i*4,4,4);

        }
    }

}