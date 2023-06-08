<template>
    <div class="order">
      <van-nav-bar :value="qrcodeData" v-if="isCameraOpen"/>
      <div v-else>
        <button @click="openCamera">打开摄像头</button>
      </div>
      <canvas ref="mediaData"></canvas>
      <p v-if="qrcodeData !== ''">扫描结果: {{ qrcodeData }}</p>
      <button v-if="qrcodeData !== ''" @click="reScanQRCode">重新扫描</button>
    </div>
    <button v-if="isCameraOpen" @click="closeCamera">关闭摄像头</button>
  </template>
  
  <script>
  import jsQR from "jsqr";
  
  export default {
    data() {
      return {
        isCameraOpen: false,
        qrcodeData: '',
        video: null,
        stream: null,
        canvas: null,
        ctx: null
      };
    },
    mounted() {
      this.video = document.createElement('video');
      this.canvas = this.$refs.mediaData;
      this.ctx = this.canvas.getContext('2d');
    },
    methods: {
      openCamera() {
        navigator.mediaDevices.getUserMedia({video: true})
            .then(stream => {
              this.stream = stream;
              this.video.srcObject = stream;
              this.video.play();
              this.isCameraOpen = true;
              this.tick();
            })
            .catch(error => {
              console.error('无法打开摄像头:', error);
            });
      },
      closeCamera() {
        this.video.pause();
        this.video.srcObject = null;
        this.stream.getTracks().forEach(track => track.stop());
        this.isCameraOpen = false;
        this.qrcodeData = '';
        this.clearCanvas();
      },
      clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
      tick() {
        if (!this.isCameraOpen) return;
  
        if (this.video.videoWidth === 0 || this.video.videoHeight === 0) {
          setTimeout(this.tick, 200);
          return;
        }
  
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
  
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
  
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const qrCodeData = this.decodeQRCode(imageData);
        if (qrCodeData) {
          console.log(qrCodeData);
          this.closeCamera();
          this.qrcodeData = qrCodeData;
        }
  
        requestAnimationFrame(this.tick);
      },
      decodeQRCode(imageData) {
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        return code ? code.data : null;
      },
      reScanQRCode() {
        this.qrcodeData = '';
        this.isCameraOpen=true;
        this.openCamera();
      },
    },
  };
  </script>
  
  <style scoped>
  .order{
    position: relative; /* Add this line */
    margin-bottom: 50px; /* Increase this value if your NavBar is taller than 50px */
  
  }
  
  </style>
  