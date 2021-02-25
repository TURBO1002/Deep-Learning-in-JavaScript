
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    list: [{
        title: 'MNIST手写数字识别',
        img: 'https://6861-hahacoder-2gfmedh2dc1701dd-1304334959.tcb.qcloud.la/mnist.png?sign=78b86d71c6ae0c5e3e6f61ef450e4d65&t=1612000675',
        url: '/pages/mnist/index'
    },
      {
        title: '姿势估计',
        img: 'https://6861-hahacoder-2gfmedh2dc1701dd-1304334959.tcb.qcloud.la/posenet.png?sign=56c66e0565a69a700f6155a4995344f8&t=1612000888',
        url: '/pages/posenet/index'
      },
      {
        title: '对象检测',
        img: 'https://6861-hahacoder-2gfmedh2dc1701dd-1304334959.tcb.qcloud.la/detection.jpeg?sign=0c512ebfcc56bdad1d30aef28e5ecd8f&t=1612671389',
        url: '/pages/coco-ssd/index'
      }
    ]
  },
  methods: {
    toChild(e) {
      let { url } = e.currentTarget.dataset;
      wx.navigateTo({ url });
    },
    onShareAppMessage: function () {
      return {
        title: 'hahaAI',
        desc: '石璞东',
      }
    },
    onShareTimeline: function (res) {
      return {
        title: 'hahaAI',
        desc: '石璞东',
      }
    } 
  }   
});