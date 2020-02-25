let v = document.getElementById("myVideo");
let b = document.getElementById("myButton");
//create a canvas to grab an image for upload
let imageCanvas = document.getElementById('canvas');
let imageCtx = imageCanvas.getContext("2d");

//Add file blob to a form and post
function postFile(file) {
    let formdata = new FormData();
    formdata.append("image", file);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/image', true);
    xhr.onload = function () {
        if (this.status === 200)
            console.log(this.response);
        else
            console.error(xhr);
        
        //return response text
        const serverResponse = document.getElementById("serverResponse");
        serverResponse.innerHTML = this.responseText;
    };
    xhr.send(formdata);
};

//Get the image from the canvas
function sendImagefromCanvas() {

    //Make sure the canvas is set to the current video size
    imageCanvas.width = v.videoWidth;
    imageCanvas.height = v.videoHeight;

    imageCtx.drawImage(v, 0, 0, v.videoWidth, v.videoHeight);

    //Convert the canvas to blob and post the file
    imageCanvas.toBlob(postFile, 'image/jpeg');
}

//Take a picture on click
b.onclick = function() {
    console.log('click');
    sendImagefromCanvas();
};

window.onload = function () {

    //Get camera video
    navigator.mediaDevices.getUserMedia({video: {width: 1280, height: 720}, audio: false})
        .then(stream => {
            v.srcObject = stream;
        })
        .catch(err => {
            console.log('navigator.getUserMedia error: ', err)
        });

};