const {
  default: api
} = require("../../http/api")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlist: {},
    playCount: '',
    idArray: []
  },
  // 播放
  play(e) {
    let arr = this.data.idArray
    let id = e.currentTarget.dataset.id
    if (id) {
      wx.navigateTo({
        url: `../../pages/play/play?id=${id}`,
      })
    } else {
      wx.navigateTo({
        url: '../../pages/play/play',
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
    let id = options.id
    api.playlistDetail(id).then(res => {
      let playCount = res.playlist.playCount
      if (playCount >= 100000 && playCount < 100000000) {
        playCount = parseInt(playCount / 10000) + '万'
      } else if (playCount >= 100000000) {
        playCount = (playCount / 100000000).toFixed(1) + '亿'
      } else {
        playCount
      }
      let idArray = []
      res.playlist.tracks.map(item => {
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
        playlist: res.playlist,
        playCount: playCount,
        idArray: idArray
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