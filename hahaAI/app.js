//app.js
var fetchWechat = require('fetch-wechat');
var tf = require('@tensorflow/tfjs-core');
var webgl = require('@tensorflow/tfjs-backend-webgl');
var cpu = require('@tensorflow/tfjs-backend-cpu');
var plugin = requirePlugin('tfjsPlugin');
App({
  onLaunch: function () {
     // 展示本地存储能力
     var logs = wx.getStorageSync('logs') || []
     logs.unshift(Date.now())
     wx.setStorageSync('logs', logs)

    this.getDeviceInfo();
    tf.ENV.flagRegistry.WEBGL_VERSION.evaluationFn = () => { return 1 };
    plugin.configPlugin({
      // polyfill fetch function
      fetchFunc: fetchWechat.fetchFunc(),
      // inject tfjs runtime
      tf,
      // inject webgl backend
      webgl,
      // inject cpu backend
      cpu,
      // provide webgl canvas
      canvas: wx.createOffscreenCanvas()
    });
    // 微信面对面翻译
    wx.getStorage({
      key: 'history',
      success: (res) => {
          this.globalData.history = res.data
      },
      fail: (res) => {
          console.log("get storage failed")
          console.log(res)
          this.globalData.history = []
      }
    })
     // 获取用户信息
     wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
         	this.globalData.Custom = capsule;
        	this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
        	this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  getDeviceInfo() {
    try {
      const res = wx.getSystemInfoSync();
      this.globalData.appWidth = typeof res.screenWidth === 'number' ? res.screenWidth : 320;
      this.globalData.appHeight = typeof res.screenHeight === 'number' ? res.screenHeight : 500;
      this.globalData.benchmarkLevel = typeof res.benchmarkLevel === 'number' ? res.benchmarkLevel : -1;
      wx.reportAnalytics('get_device_info', {
        device_info: JSON.stringify(res)
      });
    } catch (e) {
      console.log(e);
    }
  },
  
  // 权限询问
  getRecordAuth: function() {
    wx.getSetting({
      success(res) {
        console.log("succ")
        console.log(res)
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                console.log("succ auth")
            }, fail() {
                console.log("fail auth")
            }
          })
        } else {
          console.log("record has been authed")
        }
      }, fail(res) {
          console.log("fail")
          console.log(res)
      }
    })
  },
  onHide: function () {
    wx.stopBackgroundAudio()
  },
  globalData: {
    appWidth: 320,
    appHeight: 500,
    benchmarkLevel: -1,
    userInfo: null,
    history: []
  }
})