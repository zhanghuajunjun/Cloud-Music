// components/home/Rotation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banners: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    circular: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 每日推荐
    recommend() {

    },
    // 歌单
    songsheet() {
      wx.navigateTo({
        url: '../../pages/songsheet/songsheet',
      })
    },
    // 排行榜
    ranking() {
      wx.navigateTo({
        url: '../../pages/ranking/ranking',
      })
    },
    // 电台
    djprogram() {
      wx.navigateTo({
        url: '../../pages/djprogram/djprogram',
      })
    },
    // 直播
    live() {
      wx.navigateTo({
        url: '../../pages/live/live',
      })
    }
  }
})