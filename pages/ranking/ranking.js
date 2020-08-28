// pages/ranking/ranking.js
const {
  default: api
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recomList: [],
    officalList: [],
    features: [],
    world: [],
    diqu: [],
    qufeng: [],
    more: []
  },
  playlistDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../pages/gedan/gedan?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.abstract().then(res => {
      let a = res.list.slice(7,8)
      let b = res.list.slice(5,6)
      let c = res.list.slice(23,24)
      let abc = a.concat(b,c)
      let d = res.list.slice(12,13)
      let e = res.list.slice(14,16)
      let f = res.list.slice(18,20)
      let g = res.list.slice(24,25)
      let defg = d.concat(e,f,g)
      let h = res.list.slice(22,23)
      let i = res.list.slice(29,30)
      let j = res.list.slice(10,11)
      let hij = h.concat(i,j)
      let k = res.list.slice(4,5)
      let l = res.list.slice(6,7)
      let m = res.list.slice(9,10)
      let n = res.list.slice(30)
      let klmn = k.concat(l,m,n)
      let o = res.list.slice(8,9)
      let r = res.list.slice(11,12)
      let s = res.list.slice(13,14)
      let t = res.list.slice(28,29)
      let p = res.list.slice(16,18)
      let q = res.list.slice(20,22)
      let opqrst = o.concat(p,q,r,s,t)
      this.setData({
        recomList: res.list.slice(25,28),
        officalList: res.list.slice(0,4),
        features: abc,
        world: defg,
        diqu: hij,
        qufeng: klmn,
        more: opqrst
      })
    }).catch(err => {})
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