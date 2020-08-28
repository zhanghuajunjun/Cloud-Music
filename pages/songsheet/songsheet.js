// pages/songsheet/songsheet.js
const {
  default: api
} = require("../../http/api")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: '',
    cat: '',
    num: 0,
    active: 0,
    swiperCurrent: 0,
    circular: true,
    autoplay: true,
    interval: 2000,
    easeInOutCubic: 'easeInOutCubic',
    previousmargin: '200rpx',
    nextmargin: '200rpx',
    // 推荐
    arrlist: [],
    list: [],
    // 精品
    highquality: [],
    // 华语
    Chinese: [],
    // 电子
    Electronics: [],
    // 轻音乐
    lightMusic: [],
    // 流行
    popular: [],
    // 摇滚
    Rock: [],
    catlist: [
      '华语', '欧美', '韩语', '日语', '粤语', '另类/独立', 'R&B/Soul', '民族', '怀旧', '小语种', '学习', '运动', 'ACG', '影视原声', '流行', '性感', '摇滚', '英伦', '后摇', '古风', '民谣', '蓝调', '乡村', '治愈', '浪漫', '快乐', '经典', '轻音乐', '电子', '乐器', '说唱', '古典', '爵士'
    ]
  },
  //轮播图的切换事件 
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  // 筛选
  filter() {
    this.setData({
      show: true
    })
  },
  // 关闭
  onClose() {
    this.setData({
      show: false
    })
  },
  cilckItem(e) {
    if (e.currentTarget.dataset.item !== this.data.cat) {
      this.setData({
        cat: e.currentTarget.dataset.item,
        num: e.currentTarget.dataset.index,
        show: false
      })
      this.getHighquality()
    }
  },
  allSong() {
    if (this.data.cat !== '') {
      this.setData({
        cat: '',
        show: false
      })
      this.getHighquality()
    }
  },
  getHighquality() {
    api.highquality(this.data.cat).then(res => {
      res.playlists.map(item => {
        if (item.playCount >= 100000 && item.playCount < 100000000) {
          item.playCount = parseInt(item.playCount / 10000) + '万'
        } else if (item.playCount >= 100000000) {
          item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
        } else {
          item.playCount
        }
      })
      this.setData({
        highquality: res.playlists
      })
    }).catch(err => {})
  },
  // 歌单详情
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
    // 获取推荐
    api.playlist().then(res => {
      res.playlists.map(item => {
        if (item.playCount >= 100000 && item.playCount < 100000000) {
          item.playCount = parseInt(item.playCount / 10000) + '万'
        } else if (item.playCount >= 100000000) {
          item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
        } else {
          item.playCount
        }
      })
      this.setData({
        arrlist: res.playlists.slice(0, 3),
        list: res.playlists.slice(3)
      })
    }).catch(err => {})
    // 获取精品
    this.getHighquality()
    // 获取华语
    api.Chinese().then(res => {
      res.playlists.map(item => {
        if (item.playCount >= 100000 && item.playCount < 100000000) {
          item.playCount = parseInt(item.playCount / 10000) + '万'
        } else if (item.playCount >= 100000000) {
          item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
        } else {
          item.playCount
        }
      })
      this.setData({
        Chinese: res.playlists
      })
    }).catch(err => {})
    // 获取电子
    api.Electronics().then(res => {
      res.playlists.map(item => {
        if (item.playCount >= 100000 && item.playCount < 100000000) {
          item.playCount = parseInt(item.playCount / 10000) + '万'
        } else if (item.playCount >= 100000000) {
          item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
        } else {
          item.playCount
        }
      })
      this.setData({
        Electronics: res.playlists
      })
    }).catch(err => {})
    // 获取轻音乐
    api.lightMusic().then(res => {
      res.playlists.map(item => {
        if (item.playCount >= 100000 && item.playCount < 100000000) {
          item.playCount = parseInt(item.playCount / 10000) + '万'
        } else if (item.playCount >= 100000000) {
          item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
        } else {
          item.playCount
        }
      })
      this.setData({
        lightMusic: res.playlists
      })
    }).catch(err => {})
    // 获取流行
    api.popular().then(res => {
      res.playlists.map(item => {
        if (item.playCount >= 100000 && item.playCount < 100000000) {
          item.playCount = parseInt(item.playCount / 10000) + '万'
        } else if (item.playCount >= 100000000) {
          item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
        } else {
          item.playCount
        }
      })
      this.setData({
        popular: res.playlists
      })
    }).catch(err => {})
    // 获取摇滚
    api.Rock().then(res => {
      res.playlists.map(item => {
        if (item.playCount >= 100000 && item.playCount < 100000000) {
          item.playCount = parseInt(item.playCount / 10000) + '万'
        } else if (item.playCount >= 100000000) {
          item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
        } else {
          item.playCount
        }
      })
      this.setData({
        Rock: res.playlists
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