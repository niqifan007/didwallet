<template>
  <div class="home" id="app2">
    <van-grid :column-num="1" center>
      <van-grid-item>
        <van-image 
          round 
          width="120"
          height="120"
          src="https://img.yzcdn.cn/vant/cat.jpeg" 
          fit="cover"
        />
      </van-grid-item>
    </van-grid>
    <van-cell-group inset class="cell">
    <van-cell center title="DID 标识符" :value="did" is-link @click="openResolver" style="font-size: 18px;" />
    </van-cell-group>
    <van-button round type="primary" @click="generateDid">生成 DID 标识符</van-button>
  </div>
</template>

<script setup>

</script>

<script>

import { ec as EC } from 'elliptic';
import Web3 from 'web3';

export default {
  data() {
    return {
      did: '',
    };
  },
  methods: {
    generateDid() {
      const ec = new EC('secp256k1');
      const key = ec.genKeyPair();
      const privateKey = key.getPrivate(true,'hex');
      const publicKey = key.getPublic(true, 'hex');
      const web3 = new Web3();
      const hash = web3.utils.keccak256(publicKey);
      const ethereumAddress = hash.slice(-40);
      this.did = 'did:ethr:0x' + ethereumAddress;
      localStorage.setItem('did', this.did);
      localStorage.setItem('privateKey', privateKey);
      localStorage.setItem('publicKey', publicKey);
      console.log(this.did);
      console.log('Public key: ' + publicKey);
      console.log('Private key: ' + privateKey);
    },
    openResolver() {
      window.open('https://dev.uniresolver.io/#' + this.did, '_blank');
    },
  },
  mounted() {
    const savedDid = localStorage.getItem('did');
    if (savedDid) {
      this.did = savedDid;
    }
  },
};
</script>


<style lang="less" scoped>
.home {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.cell {
  width: 90%;
}
</style>