// pages/login/login.js
const {
  default: api
} = require("../../http/api")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    phone: '',
    password: '',
    email: '',
    passwords: '',
    length: '',
    flag: false
  },
  // 点击切换手机邮箱登录
  onChange() {
    if (this.data.active === 0) {
      this.setData({
        active: 1
      })
    } else {
      this.setData({
        active: 0
      })
    }
  },
  // 去注册
  register() {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  // 确认邮箱
  confirmE(e) {
    this.setData({
      email: e.detail
    })
  },
  // 邮箱登录确认密码
  confirmPa(e) {
    this.setData({
      passwords: e.detail
    })
  },
  // 手机登录失去焦点
  blurPhone(){
    this.setData({
      flag: true
    })
  },
  // 获取手机号
  confirmPhone(e) {
    this.setData({
      phone: e.detail,
      length: e.detail.length
    })
  },
  // 手机登录确认密码
  confirmPass(e) {
    this.setData({
      password: e.detail
    })
  },
  // 确认登录
  submit() {
    if (this.data.active === 0) {
      if (this.data.length === 11 && this.data.password !== '') {
        api.cellphone(this.data.phone, this.data.password).then(res => {
          if (res.code === 200) {
            wx.setStorageSync('uid', res.profile.userId)
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
              success: () => {
                wx.switchTab({
                  url: '../account/account',
                })
              }
            })
          }
        }).catch(err => {
          if (err.status === 501) {
            wx.showToast({
              title: '手机号或密码错误',
              icon: 'none',
              duration: 2000,
              complete: () => {
                this.setData({
                  password: '',
                  phone: ''
                })
              }
            })
          }
        })
      } else {
        wx.showToast({
          title: '手机号或密码不能为空或手机号格式错误',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      if (this.data.email !== '' && this.data.passwords !== '') {
        api.email(this.data.email, this.data.passwords).then(res => {
          if (res.code === 200) {
            console.log(res.profile.userId)
            wx.setStorageSync('uid', res.profile.userId)
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
              success: () => {
                wx.switchTab({
                  url: '../account/account',
                })
              }
            })
          }
        }).catch(err => {
          if (err.status === 501) {
            wx.showToast({
              title: '邮箱号或密码错误',
              icon: 'none',
              duration: 2000,
              complete: () => {
                this.setData({
                  password: '',
                  email: ''
                })
              }
            })
          }
        })
      } else {
        wx.showToast({
          title: '邮箱号或密码不能为空',
          icon: 'none',
          duration: 2000
        })
      }
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