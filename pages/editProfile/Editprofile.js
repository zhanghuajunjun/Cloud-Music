// pages/editProfile/Editprofile.js
const {
  default: api
} = require("../../http/api")
import dayjs from "../../lib/dayjs.min.js"
import area from "../../lib/area.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: '',
    show1: '',
    show2: '',
    show3: '',
    // 昵称
    nickname: '',
    // 性别
    gender: '',
    // 生日
    birthDay: '',
    // 省份
    provinceId: '',
    // 城市
    cityId: '',
    // 签名
    signature: '',
    sex: '',
    birthday: '',
    city: '',
    area: area,
    value: '',
    valueChange: '',
    columns: ['保密', '男', '女'],
    index: 0,
    currentDate: new Date().getTime(),
    minDate: '',
    birth: '',
    Date: ''
  },
  // 点击昵称显示弹框
  nickname() {
    this.setData({
      show: true,
      value: this.data.nickname
    })
  },
  // 获取input框的内容
  ipt(e) {
    this.setData({
      valueChange: e.detail.value
    });
  },
  // 关闭昵称弹框
  onCloseName() {
    this.setData({
      show: false
    });
  },
  // 昵称赋值
  onConfirmName() {
    this.setData({
      show: false,
      nickname: this.data.valueChange
    });
  },

  // 点击性别显示弹框
  sex() {
    this.setData({
      show1: true,
    })
  },
  // 点击确认性别赋值
  onConfirmSex(e) {
    this.setData({
      show1: false,
      sex: e.detail.value,
      gender: e.detail.index * 1
    });
  },
  // 点击生日显示弹框
  birthday() {
    let date = new Date("2011-01-01")
    let minDate = date.valueOf()
    if (this.data.birth * 1 < minDate) {
      this.setData({
        Date: minDate,
      })
    } else {
      this.setData({
        Date: this.data.birth * 1,
      })
    }
    this.setData({
      show2: true,
      minDate: minDate
    })
  },
  // 点击确定赋值生日
  confirmBir(e) {
    this.setData({
      birthDay: e.detail,
      birthday: dayjs(e.detail * 1).format('YYYY-MM-DD'),
      show2: false
    });
  },
  // 点击城市显示弹框
  city() {
    this.setData({
      show3: true,
    })
  },
  // 点击城市确认赋值
  confirmCity(e) {
    if (e.detail.values[0].name === e.detail.values[1].name) {
      let city = e.detail.values[0].name
      this.setData({
        city: city,
        provinceId: e.detail.values[0].code * 1,
        cityId: e.detail.values[1].code * 1,
        show3: false
      });
    } else {
      let city = `${e.detail.values[0].name}${e.detail.values[1].name}`
      this.setData({
        provinceId: e.detail.values[0].code * 1,
        cityId: e.detail.values[1].code * 1,
        city: city,
        show3: false
      });
    }

  },
  // 点击取消关闭弹框
  onCancel() {
    this.setData({
      show1: false,
      show2: false,
      show3: false
    });
  },
  // 点击签名赋值
  signature(e) {
    this.setData({
      signature: e.detail
    })
  },
  // 点击修改
  submit() {
    // 昵称
    let nickname = this.data.nickname
    // 性别
    let gender = this.data.gender
    // 生日
    let birthday = this.data.birthDay
    // 省份
    let province = this.data.provinceId
    // 城市
    let city = this.data.cityId
    // 签名
    api.status().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    // let signature = this.data.signature
    // api.update(gender,birthday,nickname,province,city,signature).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 昵称
    let nickname = options.nickname
    // 生日
    let birthday = dayjs(options.birthday * 1).format('YYYY-MM-DD')
    // 省份
    let province_list = this.data.area.province_list
    let province = options.province
    let arr = []
    for (let key in province_list) {
      let dict = {};
      dict.id = key,
     
        dict.name = province_list[key]
      arr.push(dict);
    }
    let provinceName = arr.filter(item => {
      return province === item.id
    })
    // 城市
    let city_list = this.data.area.city_list
    let city = options.city
    let array = []
    for (let i in city_list) {
      let obj = {};
      obj.id = i,
        obj.name = city_list[i]
      array.push(obj);
    }
    let cityName = array.filter(item => {
      return city === item.id
    })
    // 详细地址
    let detailCity = `${provinceName[0].name}${cityName[0].name}`
    // 签名
    let signature = options.signature
    // 性别
    let gender = options.gender
    if (gender == 0) {
      this.setData({
        sex: '保密',
        index: 0
      })
    } else if (gender == 1) {
      this.setData({
        sex: '男',
        index: 1
      })
    } else {
      this.setData({
        sex: '女',
        index: 2
      })
    }
    this.setData({
      nickname: nickname,
      birthday: birthday,
      city: detailCity,
      signature: signature,
      birth: options.birthday
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})