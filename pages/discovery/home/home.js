Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [
      {
        name:"WeXinOCR",
        text:'身份证、银行卡等信息识别（OCR技术）',
        date:'2021-01-23',
        info:"OCR",
        banner_src:'https://6861-hahacoder-2gfmedh2dc1701dd-1304334959.tcb.qcloud.la/ocr.png?sign=631350a19471a5540d47369f0c6cece0&t=1611464516'
       },
      {
        name:"face2face",
        text:'语音识别（支持中英文）',
        date:'2021-01-24',
        info:"同声传译",
        banner_src:"https://6861-hahacoder-2gfmedh2dc1701dd-1304334959.tcb.qcloud.la/weixin.jpg?sign=f36fd28af8e693b7ac02f08fbe4e3a4f&t=1611464301"
      }
    ],
  },
  methods:{
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