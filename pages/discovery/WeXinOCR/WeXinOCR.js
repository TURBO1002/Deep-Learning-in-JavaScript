Page({
  data:{
    // 身份证
    name:'',
    gender:'',
    nation:'',
    birth:'',
    address:'',
    identifier:'',
    authority:'',
    valid_date:'',
    // 银行卡
    bankCardId:'',
    // 营业执照
    enterprise:'',
    enterprise_type:'',
    representative:'',
    business:'',
    capital:'',
    date:'',
    valid_period:'',
    enterprise_addr:'',
    // 驾驶证识别
    name_car:'',
    gender_car:'',
    nationality:'',
    num:'',
    birth_car:'',
    issue_date:'',
    car_class:'',
    addr:'',
    official_seal:'',
    valid_from:'',
    valid_to:'',
    // 行驶证识别
    plate_num:'',
    vehicle_type:'',
    owner:'',
    addr_car:'',
    use_character:'',
    model:'',
    vin:'',
    engine_num:'',
    addr_car:'',
    register_date:'',
    issue_date:'',
    elements: ["WeXinOCR"],
  },
  success(res){
    let result = res.detail
    if(result.type == 0){
      this.setData({
        name:result.name.text,
        gender:result.gender.text,
        nation:result.nationality.text,
        birth:result.birth.text,
        address:result.address.text,
        identifier:result.id.text
      })
    }else{
      this.setData({
        authority:result.authority.text,
        valid_date:result.valid_date.text
      })
    }
  },
  blankSuccess(res_bank){
    let result = res_bank.detail
    this.setData({
      bankCardId:result.number.text
    })
  },
  businessSuccess(res){
    let result = res.detail
    this.setData({
      enterprise:result.enterprise_name.text,
      enterprise_type:result.type_of_enterprise.text,
      representative:result.legal_representative.text,
      business:result.business_scope.text,
      capital:result.registered_capital.text,
      date:result.registered_date.text,
      valid_period:result.valid_period.text,
      enterprise_addr:result.address.text
    })
  },
  driverLicenseSuccess(res){
    let result = res.detail
    this.setData({
      name_car:result.name.text,
      gender_car:result.sex.text,
      nationality:result.nationality.text,
      num:result.id_num.text,
      birth_car:result.birth_date.text,
      issue_date:result.issue_date.text,
      car_class:result.car_class.text,
      addr:result.address.text,
      official_seal:result.official_seal.text,
      valid_from:result.valid_from.text,
      valid_to:result.valid_to.text
    })
  },
  driverSuccess(res){
    console.log(res);
    let result = res.detail
    this.setData({
      plate_num:result.plate_num.text,
      vehicle_type:result.vehicle_type.text,
      owner:result.owner.text,
      addr_car:result.addr.text,
      use_character:result.use_character.text,
      model:result.model.text,
      vin:result.vin.text,
      engine_num:result.engine_num.text,
      register_date:result.register_date.text,
      issue_date:result.issue_date.text

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
})