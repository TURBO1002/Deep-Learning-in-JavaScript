Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [
      {
        title: '天气预报',
        name: 'weather',
        color: 'blue',
        icon: 'clothes'
      },
      {
        title: '快递查询',
        name: 'express',
        color: 'purple',
        icon: 'deliver_fill'
      }
    ],
  },
  methods:{
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
  }
})