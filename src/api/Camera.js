class Camera {
  constructor(videoNode) {
    this._videoNode = videoNode;
  }

  isPowerOn() {
    return this._isPowerOn;
  }

  isPhotoTaken() {
    return this._photo != null;
  }

  async power(facingMode) {
    this._photo = null;

    if (!facingMode) facingMode = "environment";
    // Obten la camara del dispositivo
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 350,
        height: 350,
        facingMode: { exact: facingMode },
      },
    });

    if (stream) {
      // Empieza la transmisión en el objeto de Video
      this._videoNode.srcObject = stream;
      this._stream = stream;

      return (this._isPowerOn = true);
    }

    return (this._isPowerOn = false);
  }

  off() {
    // Pausa el video para que pueda capturar la foto
    this._videoNode.pause();

    if (this._stream) {
      this._isPowerOn = false;
      this._stream.getTracks()[0].stop();
    }
  }

  async takePhoto() {
    let canvas = document.createElement("canvas");

    canvas.setAttribute("width", 300);
    canvas.setAttribute("height", 300);

    let context = canvas.getContext("2d");

    context.drawImage(this._videoNode, 0, 0, canvas.width, canvas.height);

    this._photo = context.canvas.toDataURL();

    canvas = context = null;

    return this._photo;
  }
}

export { Camera };
