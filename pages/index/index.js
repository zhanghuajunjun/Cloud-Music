//index.js
//获取应用实例
const {
  default: api
} = require("../../http/api")
import create from "../../utils/store/create"
import store from "../../store/index"

create.Page(store,{
  use:['img','paused'],
  data: {
    banners: [],
    result: [],
    three1: [],
    three2: [],
    three3: [],
    four1: [],
    four2: [],
    recommend: [],
    six: [],
    showKeyWord: '',
    img: ''
  },
  //事件处理函数
  // 轮播
  getRatation() {
    api.banner().then(res => {
      this.setData({
        banners: res.banners
      })
    }).catch(err => {})
  },
  // 推荐歌单
  getRecommendedlist() {
    api.personalized().then(res => {
      res.result.map(item => {
        if (item.playCount >= 100000 && item.playCount < 100000000) {
          item.playCount = parseInt(item.playCount / 10000) + '万'
        } else if (item.playCount >= 100000000) {
          item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
        } else {
          item.playCount
        }
      })
      this.setData({
        result: res.result.slice(0, 6)
      })
    }).catch(err => {})
  },
  // 推荐音乐
  getNewsong() {
    api.newsong().then(res => {
      this.setData({
        three1: res.result.slice(0, 3),
        three2: res.result.slice(3, 6),
        three3: res.result.slice(6, 9),
      })
    }).catch(err => {})
  },
  // 新碟
  getAlbum() {
    api.album().then(res => {
      this.setData({
        four1: res.albums.slice(0, 3),
        four2: res.albums.slice(3),
      })
    }).catch(err => {})
  },
  // 推荐电台
  getDjprogram() {
    api.djprogram().then(res => {
      this.setData({
        six: res.result,
      })
    }).catch(err => {})
  },
  // 推荐节目
  getRecommend() {
    api.recommend().then(res => {
      wx.hideLoading()
      this.setData({
        recommend: res.programs
      })
    }).catch(err => {})
  },
  // 默认搜索
  getSrarchHis() {
    api.srarchHis().then(res => {
      this.setData({
        showKeyWord: res.data.showKeyword
      })
    }).catch(err => {})
  },
  // 搜索
  foucs() {
    wx.navigateTo({
      url: `../searchDetail/searchdetail?showKeyWord=${this.data.showKeyWord}`,
    })
  },
  // 播放页面
  play() {
    wx.navigateTo({
      url: '../play/play',
    })
  },
  onLoad: function () {
    let img = wx.getStorageSync('img')
    if(img) {
      this.setData({
        img: img
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    this.getRatation()
    this.getRecommendedlist()
    this.getNewsong()
    this.getAlbum()
    this.getDjprogram()
    this.getRecommend()
  },
  onShow: function () {
    this.getSrarchHis();
  },
})