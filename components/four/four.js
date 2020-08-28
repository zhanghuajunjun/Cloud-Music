// components/four/four.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    three1: {
      type: Array
    },
    three2: {
      type: Array
    },
    three3: {
      type: Array
    },
    four1: {
      type: Array
    },
    four2: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    newDisc() {
      if (this.data.active === 1) {
        this.setData({
          active: 0
        })
      }
    },
    newSong() {
      if (this.data.active === 0) {
        this.setData({
          active: 1
        })
      }
    },
    play(e) {
      let id = e.currentTarget.dataset.id
      let arr = this.properties.three1.concat(this.properties.three2, this.properties.three3)
      let idArray = []
      arr.map(item => {
        let arr2 = []
        item.song.album.artists.map(item1 => {
          arr2.push(item1.name)
        })
        let obj = {}
        obj.id = item.id
        obj.title = item.name
        obj.img = item.picUrl
        obj.name = arr2
        idArray.push(obj)
      })
      wx.navigateTo({
        url: `../../pages/play/play?id=${id}`,
      })
      wx.setStorageSync('idArray', idArray)
    }
  }
})