<template>
  <div class="order">
    <van-nav-bar :value="qrcodeData" v-if="isCameraOpen"/>
    <div class="text-center" v-else>
      <van-button class="openCamera" @click="openCamera">打开摄像头</van-button>
    </div>
    <canvas ref="mediaData"></canvas>

    <van-button v-if="isCameraOpen" @click="closeCamera" class="text-center">关闭摄像头</van-button>
  </div>

</template>

<script>
import jsQR from "jsqr";
import {Dialog} from "vant";


export default {
  data() {
    return {
      isCameraOpen: false,
      qrcodeData: "",
      video: null,
      stream: null,
      canvas: null,
      ctx: null,
      dialogVisible: false,
    };
  },
  mounted() {
    this.video = document.createElement("video");
    this.canvas = this.$refs.mediaData;
    this.ctx = this.canvas.getContext("2d");
    this.openCamera();
  },
  methods: {
    openCamera() {
      navigator.mediaDevices
          .getUserMedia({video: true})
          .then((stream) => {
            this.qrcodeData = "";
            this.stream = stream;
            this.video.srcObject = stream;
            this.video.play();
            this.isCameraOpen = true;
            this.tick();
          })
          .catch((error) => {
            console.error("无法打开摄像头:", error);
          });
    },
    closeCamera() {
      this.video.pause();
      this.video.srcObject = null;
      this.stream.getTracks().forEach((track) => track.stop());
      this.isCameraOpen = false;
      this.clearCanvas();
      // this.qrcodeData = "";
      this.closeDialog();
    },
    closeDialog() {
      this.dialogVisible = false;
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

      const imageData = this.ctx.getImageData(
          0,
          0,
          this.canvas.width,
          this.canvas.height
      );
      const qrCodeData = this.decodeQRCode(imageData);
      if (qrCodeData) {
        console.log(qrCodeData);
        this.qrcodeData = qrCodeData;
        this.dialogVisible = true;
        this.closeCamera();
        Dialog.confirm({
          title: "凭证信息",
          message: qrCodeData,
          confirmButtonText: "接受",
          cancelButtonText: "取消",
        })
            .then(() => {
          // on confirm


        })
            .catch(() => {
              // on cancel
            });

      }
      requestAnimationFrame(this.tick);
    },
    decodeQRCode(imageData) {
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      return code ? code.data : null;
    },
  },
};
</script>
<style scoped>
.order {
  position: relative;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text-center {
  display: flex;
  justify-content: center;
}

.openCamera {
  color: lightcoral;
  border-radius: 10px;
}
</style>

