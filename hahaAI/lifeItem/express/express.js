// pages/lifeItem/express/express.js
Page({
  data:{
    expressInfo:[],
    nu:''
  },
  getValue(e){
    this.setData({
      nu:e.detail.value
    })
  },
  search(e){
    wx.showLoading({
      title: '努力查询中...',
    })
    let that = this
    wx.request({
      url: 'https://route.showapi.com/64-19',
      data:{
        "showapi_appid": '454633', //这里需要改成自己的appid
        "showapi_sign": '9100c8dfb9444c0bae8726c1e53764c0',  //这里需要改成自己的应用的密钥secret
        "com":"auto",
        "nu":this.data.nu
      },
      success(res){
        let result = res.data.showapi_res_body.data;
        console.log(result);
        that.setData({
          expressInfo:result
        })
        wx.hideLoading()
        if(!result){
          wx.showModal({
            cancelColor: 'cancelColor',
            title:"提示",
            content:"查询失败，请重新确认订单号"
          })
          that.setData({
            expressInfo:[]
          })
        }else{
          wx.showToast({
            title: '查询成功!',
            icon:"success"
          })
        }
      }
    })
  },
  onShareAppMessage(){
    return {
      title: 'hahaAI',
      desc: '石璞东',
    }
  },
  onShareTimeline(){
    return {
      title: 'hahaAI',
      desc: '石璞东',
    }
  }
  
})