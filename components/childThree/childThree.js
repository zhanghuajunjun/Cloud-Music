// components/childThree/childThree.js
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
      if(id) {
        wx.navigateTo({
          url: `../../pages/play/play?id=${id}`,
        })
      } else {
        wx.navigateTo({
          url: `../../pages/play/play`,
        })
      }
      wx.setStorageSync('idArray', idArray)
    }
  }
})