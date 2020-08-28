// pages/singerdetail/singerdetail.js
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
    artist: {},
    active: 0,
    hotrecom: [],
    briefDesc: '',
    introduction: [],
    hotList: [],
    Albums: [],
    video: [],
    idArray: []
  },
  // 获取歌手描述
  getData() {
    api.artistdesc(this.data.id).then(res => {
      this.setData({
        briefDesc: res.briefDesc,
        introduction: res.introduction
      })
    }).catch(err => {})
  },
  // 获取歌手热门50首
  getTopsong() {
    api.topsong(this.data.id).then(res => {
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
        hotrecom: res.songs.slice(0, 3),
        hotList: res.songs,
        idArray: idArray
      })
    }).catch(err => {})
  },
  // 获取歌手单曲
  getArtists() {
    api.artists(this.data.id).then(res => {
      this.setData({
        artist: res.artist
      })
    }).catch(err => {})
  },
  // 获取歌手mv
  getArtistmv() {
    api.artistmv(this.data.id).then(res => {
      res.mvs.map(item => {
        if (item.playCount >= 100000 && item.playCount < 100000000) {
          item.playCount = parseInt(item.playCount / 10000).toFixed(1) + '万'
        } else if (item.playCount >= 100000000) {
          item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
        } else {
          item.playCount = item.playCount
        }
        if (item.duration / 1000 < 60) {
          if (parseInt(item.duration / 1000) < 10) {
            item.duration = '00' + ':' + '0' + parseInt(item.duration / 1000)
          } else {
            item.duration = '00' + ':' + parseInt(item.duration / 1000)
          }
        } else {
          if (parseInt(item.duration / 1000 / 60) < 10 && parseInt(item.duration / 1000 % 60) >= 10) {
            item.duration = '0' + parseInt(item.duration / 1000 / 60) + ':' + parseInt(item.duration / 1000 % 60)
          } else if (parseInt(item.duration / 1000 / 60) >= 10 && parseInt(item.duration / 1000 % 60) < 10) {
            item.duration = parseInt(item.duration / 1000 / 60) + ':' + '0' + parseInt(item.duration / 1000 % 60)
          } else if (parseInt(item.duration / 1000 / 60) < 10 && parseInt(item.duration / 1000 % 60) < 10) {
            item.duration = '0' + parseInt(item.duration / 1000 / 60) + ':' + '0' + parseInt(item.duration / 1000 % 60)
          } else {
            item.duration = parseInt(item.duration / 1000 / 60) + ':' + parseInt(item.duration / 1000 % 60)
          }
        }
      })
      this.setData({
        video: res.mvs
      })
    }).catch(err => {})
  },
  // 获取歌手专辑
  getArtistAlbum() {
    api.artistAlbum(this.data.id).then(res => {
      res.hotAlbums.map(item => {
        item.publishTime = dayjs(item.publishTime).format('YYYY-MM-DD')
      })
      this.setData({
        Albums: res.hotAlbums
      })
    }).catch(err => {})
  },
  home() {
    this.setData({
      active: 0
    })
  },
  songs() {
    this.setData({
      active: 1
    })
  },
  album() {
    this.setData({
      active: 2
    })
    this.getArtistAlbum()
  },
  mv() {
    this.setData({
      active: 3
    })
    this.getArtistmv()
  },
  moresongs() {
    this.setData({
      active: 1
    })
  },
  // 播放
  play(e) {
    let arr = this.data.idArray
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../pages/play/play?id=${id}`,
    })
    wx.setStorageSync('idArray', arr)
  },
  // 专辑详情
  albumDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../pages/album/album?id=${id}`,
    })
  },
  // 播放mv
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
    this.getData()
    this.getTopsong()
    this.getArtists()
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