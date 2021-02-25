Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0
  },
  attached() {
    console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            starCount: i,
            forksCount: i,
            visitTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(165),
          forksCount: that.coutNum(321),
          visitTotal: that.coutNum(1002)
        })
      }
    }
    wx.hideLoading()
  },
  methods: {
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://6861-hahacoder-2gfmedh2dc1701dd-1304334959.tcb.qcloud.la/wechatPay.png?sign=6748b5d3a2a5b1e0e84d2023045623d5&t=1607827211'],
        current: 'https://6861-hahacoder-2gfmedh2dc1701dd-1304334959.tcb.qcloud.la/wechatPay.png?sign=6748b5d3a2a5b1e0e84d2023045623d5&t=1607827211' // 当前显示图片的http链接      
      })
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
})