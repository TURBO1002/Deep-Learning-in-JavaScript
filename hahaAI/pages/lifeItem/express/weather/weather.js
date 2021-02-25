Page({
  data:{
    inputValue:'',

    flag:'none',

    cityName:'',
    cityLocate:'',
    cityProvince:'',
    cityCountry:'',
    latitude:'',
    longitude:'',
    
    f1_day:'',
    f1_weather:'',
    f1_wind_direction:'',
    f1_temperature:'',
    f1_jiangshui:'',

    f2_day:'',
    f2_weather:'',
    f2_wind_direction:'',
    f2_temperature:'',
    f2_jiangshui:'',

    f3_day:'',
    f3_weather:'',
    f3_wind_direction:'',
    f3_temperature:'',
    f3_jiangshui:'',


    n_weather:'',
    n_wind_direction:'',
    n_temperature:'',
    
  },
  getValue(e){
    this.setData({
      inputValue:e.detail.value
    })
  },
  search(){
    let that = this
    wx.request({
      url: 'https://route.showapi.com/9-2',
      data:{
        "showapi_appid": '454633', //这里需要改成自己的appid
        "showapi_sign": '9100c8dfb9444c0bae8726c1e53764c0',  //这里需要改成自己的应用的密钥secret
        "area":this.data.inputValue,
      },
      success(res){
        console.log(res);
        let cityInfo = res.data.showapi_res_body.cityInfo;
        let fNow = res.data.showapi_res_body;

        if(!that.data.inputValue){
          wx.showModal({
            cancelColor: 'cancelColor',
            title: '提示',
            content:"请输入正确内容"
          })
          return 
        }
        that.setData({

          flag:'block',

          cityName:cityInfo.c3,
          cityLocate:cityInfo.c5,
          cityProvince:cityInfo.c7,
          cityCountry:cityInfo.c9,
          latitude:cityInfo.latitude,
          longitude:cityInfo.longitude,

          // 当日天气
          f1_day:fNow.f1.day,
          f1_weather:fNow.f1.day_weather,
          f1_wind_direction:fNow.f1.day_wind_direction,
          f1_temperature:fNow.f1.day_air_temperature,
          f1_jiangshui:fNow.f1.jiangshui,

          // 未来一天天气
          f2_day:fNow.f2.day,
          f2_weather:fNow.f2.day_weather,
          f2_wind_direction:fNow.f2.day_wind_direction,
          f2_temperature:fNow.f2.day_air_temperature,
          f2_jiangshui:fNow.f2.jiangshui,

          // 未来两天天气
          f3_day:fNow.f3.day,
          f3_weather:fNow.f3.day_weather,
          f3_wind_direction:fNow.f3.day_wind_direction,
          f3_temperature:fNow.f3.day_air_temperature,
          f3_jiangshui:fNow.f3.jiangshui,

          // 即时天气
          n_weather:fNow.now.weather,
          n_wind_direction:fNow.now.wind_direction,
          n_temperature:fNow.now.temperature,
        })
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