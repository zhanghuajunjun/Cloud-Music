// components/Recommendedlist/Recommendedlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    result: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    songsheet() {
      wx.navigateTo({
        url: '../../pages/songsheet/songsheet',
      })
    },
    // 歌单详情
    playlistDetail(e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `../../pages/gedan/gedan?id=${id}`,
      })
    }
  }
})
