// pages/register/register.js
const {
  default: api
} = require("../../http/api")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    length: '',
    phone: '',
    password: '',
    sms: '',
    username: '',
    flag: false,
    num: '',
    variable: false
  },
  goToLogin() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  // 验证手机号
  confirmPhone(e) {
    this.setData({
      length: e.detail.length
    })
    if (e.detail.length === 11) {
      api.checkPhone(e.detail).then(res => {
        if (res.exist === -1) {
          this.setData({
            phone: e.detail
          })
        } else {
          this.setData({
            flag: true
          })
        }
      }).catch(err => {})
    }
  },
  blurPhone(){
    this.setData({
      flag: true
    })
  },
  // 获取密码
  confirmPass(e) {
    this.setData({
      password: e.detail
    })
  },
  // 发送验证码
  message() {
    api.captcha(this.data.phone).then(res => {}).catch(err => {})
  },
  // 获取验证码
  changeSms(e) {
    this.setData({
      num: e.detail.length,
    })
    if (e.detail.length === 4) {
      api.verify(this.data.phone, e.detail).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.setData({
            sms: e.detail,
          })
        } else {
          this.setData({
            variable: true,
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  // 获取昵称
  confirmName(e) {
    this.setData({
      username: e.detail
    })
  },
  // 注册
  register() {
    if (this.data.phone === '' || this.data.password === '' || this.data.sms === '' || this.data.username === '') {
      wx.showToast({
        title: '手机号或密码或验证码或昵称不能为空',
        icon: 'none',
        duration: 2000,
      })
    } else {
      api.register(this.data.sms,
        this.data.phone,
        this.data.password,
        this.data.username).then(res => {
        if (res.code === 200) {
          wx.showToast({
            title: '注册成功',
            icon: "success",
            duration: 2000,
            success: () => {
              wx.navigateTo({
                url: '../login/login',
              })
            }
          })
        } else {
          wx.showToast({
            title: '注册失败',
            image: "../../image/error.png",
            duration: 2000,
            complete: () => {
              this.setData({
                phone: '',
                password: '',
                sms: '',
                username: '',
              })
            }
          })
        }
      }).catch(err => {})
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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