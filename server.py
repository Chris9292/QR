from flask import Flask, request, Response, jsonify, redirect, url_for, render_template
from functions import *
import time
import numpy as np
import cv2
import pyzbar.pyzbar as pyzbar

app = Flask(__name__)



@app.route('/')
def index():
    return render_template("index.html")

# save the image as a picture
@app.route('/image', methods=['POST'])
def image():

    if request.method == "POST":
        img = request.files['image'].read()  # get the  image in bytes

        #convert data to numpy array
        np_img = np.frombuffer(img, np.uint8)
        # convert numpy array to image
        img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
        data = None
        # decode QrCodes and print text
        decodedObjects = pyzbar.decode(img)
        if decodedObjects:
            for obj in decodedObjects:

            # if QrCode: retrieve data from qrcode
                data = obj.data.decode("ascii")


            response = {"Timestamp": time.strftime("%Y-%m-%d %H:%M"),
                        "ticket ID": data,
                        "response status": fetch_ticket(data)}

            return jsonify(response)
        return "No QrCode scanned! Please try again."

if __name__ == "__main__":
    app.run(debug = True, host = "0.0.0.0")
