const {
  default: api
} = require("../../http/api")
import dayjs from "../../lib/dayjs.min.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    album: {},
    songs: [],
    artists: [],
    idArray: []
  },
  // 获取专辑详情
  getAlbum() {
    api.albumDetail(this.data.id).then(res => {
      console.log(res)
      let arr = []
      res.album.artists.map(item => {
        arr.push(item.name)
      })
      res.album.publishTime = dayjs(res.album.publishTime).format('YYYY-MM-DD')
      let idArray = []
      res.songs.map(item => {
        let arr1 = []
        item.ar.map(item1 => {
          arr1.push(item1.name)
        })
        let obj = {}
        obj.id = item.id
        obj.img = item.al.picUrl
        obj.title = item.name
        obj.name = arr1
        idArray.push(obj)
      })
      this.setData({
        songs: res.songs,
        album: res.album,
        artists: arr,
        idArray: idArray
      })
    }).catch(err => {})
  },
  // 播放
  play(e) {
    let arr = this.data.idArray
    let id = e.currentTarget.dataset.id
    if(id) {
      wx.navigateTo({
        url: `../../pages/play/play?id=${id}`,
      })
    } else {
      wx.navigateTo({
        url: `../../pages/play/play`,
      })
    }
    wx.setStorageSync('idArray', arr)
  },
  playMV(e) {
    let id = e.currentTarget.dataset.id
    let style = e.currentTarget.dataset.style
    wx.navigateTo({
      url: `../../pages/playVideo/playVideo?id=${id}&style=${style}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getAlbum()
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