// pages/account/account.js
const {
  default: api
} = require("../../http/api")
import create from "../../utils/store/create"
import store from "../../store/index"

create.Page(store,{

  /**
   * 页面的初始数据
   */
  use: [],
  data: {
    level: '',
    profile: {},
    uid: '',
    flag: false
  },
  submit() {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  editprofile() {
    let nickname = this.data.profile.nickname
    let gender = this.data.profile.gender
    let birthday = this.data.profile.birthday
    let province = this.data.profile.province
    let city = this.data.profile.city
    let signature = this.data.profile.signature
    wx.navigateTo({
      url: `../editProfile/Editprofile?nickname=${nickname}&gender=${gender}&birthday=${birthday}&province=${province}&city=${city}&signature=${signature}`
    })
  },
  // 签到
  Signin() {
    this.setData({
      flag: true
    })
    wx.showToast({
      title: '签到成功',
      icon: 'success',
      duration: 2000
    })
  },
  // 退出登录
  button(){
    wx.showLoading({
      title: '加载中',
    })
    api.logout().then(res => {
      if(res.code === 200) {
        wx.showToast({
          title: '退出登录成功',
          icon: 'success',
          duration: 2000
        })
        wx.removeStorageSync('uid')
        this.setData({
          uid: ''
        })
      }
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
    })
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
    let uid = wx.getStorageSync('uid')
    if(uid) {
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        uid: uid
      })
      api.userdetail(uid).then(res => {
        wx.hideLoading()
        console.log(res)
        this.setData({
          level: res.level,
          profile: res.profile
        })
      }).catch(err => {})
    }
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