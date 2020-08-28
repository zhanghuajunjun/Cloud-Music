// pages/searchDetail/searchdetail.js
const {
  default: api
} = require("../../http/api")
import dayjs from "../../lib/dayjs.min.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: '',
    keyWords: '',
    showKeyWord: '',
    searchHis: [],
    hotSearch: [],
    suggestList: [],
    active: 0,
    value: '',
    type: 1018,
    // 感兴趣歌手
    artist: {},
    album: {},
    fansSize: 0,
    // 单曲
    songs: {},
    playList: {},
    video: {},
    albums: {},
    singer: {},
    sim_query: {},
    talk: {},
    user: {},
    flag: true,
    allsongs: [],
    mvs: [],
    uzi: 'adc',
    imp: 'adc',
    idArray: []
  },
  // 取消
  onCancel() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 值的变化
  onChange(e) {
    this.setData({
      keyWords: e.detail
    })
    if (e.detail !== '') {
      api.suggest(e.detail).then(res => {
        this.setData({
          suggestList: res.result.allMatch
        })
      }).catch(err => {})
    }
  },
  onFocus() {
    this.setData({
      keyWords: this.data.keyWord,
      uzi: 'adc'
    })
    if (this.data.keyWord !== '') {
      api.suggest(this.data.keyWord).then(res => {
        this.setData({
          suggestList: res.result.allMatch
        })
      }).catch(err => {})
    }
  },
  Change(e) {
    if (e.detail.index === 0) {
      this.setData({
        type: 1018
      })
    } else if (e.detail.index === 1) {
      this.setData({
        type: 1
      })
    } else if (e.detail.index === 2) {
      this.setData({
        type: 1004
      })
    } else if (e.detail.index === 3) {
      this.setData({
        type: 1014
      })
    } else if (e.detail.index === 4) {
      this.setData({
        type: 100
      })
    } else if (e.detail.index === 5) {
      this.setData({
        type: 10
      })
    } else if (e.detail.index === 6) {
      this.setData({
        type: 1000
      })
    } else if (e.detail.index === 7) {
      this.setData({
        type: 1006
      })
    } else if (e.detail.index === 8) {
      this.setData({
        type: 1009
      })
    } else {
      this.setData({
        type: 1002
      })
    }
    this.getData()
  },
  getData() {
    api.search(this.data.value, this.data.type).then(res => {
      if (this.data.type === 1018) {
        res.result.playList.playLists.map(item => {
          if (item.playCount >= 100000 && item.playCount < 100000000) {
            item.playCount = parseInt(item.playCount / 10000).toFixed(1) + '万'
          } else if (item.playCount >= 100000000) {
            item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
          } else {
            item.playCount = item.playCount
          }
        })
        res.result.video.videos.map(item => {
          if (item.durationms / 1000 < 60) {
            if (parseInt(item.durationms / 1000) < 10) {
              item.durationms = '00' + ':' + '0' + parseInt(item.durationms / 1000)
            } else {
              item.durationms = '00' + ':' + parseInt(item.durationms / 1000)
            }
          } else {
            if (parseInt(item.durationms / 1000 / 60) < 10 && parseInt(item.durationms / 1000 % 60) >= 10) {
              item.durationms = '0' + parseInt(item.durationms / 1000 / 60) + ':' + parseInt(item.durationms / 1000 % 60)
            } else if (parseInt(item.durationms / 1000 / 60) >= 10 && parseInt(item.durationms / 1000 % 60) < 10) {
              item.durationms = parseInt(item.durationms / 1000 / 60) + ':' + '0' + parseInt(item.durationms / 1000 % 60)
            } else if (parseInt(item.durationms / 1000 / 60) < 10 && parseInt(item.durationms / 1000 % 60) < 10) {
              item.durationms = '0' + parseInt(item.durationms / 1000 / 60) + ':' + '0' + parseInt(item.durationms / 1000 % 60)
            } else {
              item.durationms = parseInt(item.durationms / 1000 / 60) + ':' + parseInt(item.durationms / 1000 % 60)
            }
          }
        })
        res.result.album.albums.map(item => {
          item.publishTime = dayjs(item.publishTime).format('YYYY-MM-DD')
        })
        let idArray = []
        res.result.song.songs.map(item => {
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
          // 单曲
          songs: res.result.song,
          // 歌单
          playList: res.result.playList,
          // 视频
          video: res.result.video,
          // 专辑
          albums: res.result.album,
          // 歌手
          singer: res.result.artist,
          // 相关搜索
          sim_query: res.result.sim_query,
          // 主题
          talk: res.result.talk,
          // 用户
          user: res.result.user,
          // all id
          idArray: idArray
        })
      } else if (this.data.type === 1) {
        let idArray = []
        res.result.songs.map(item => {
          let arr2 = []
          item.artists.map(item1 => {
            arr2.push(item1.name)
          })
          let obj = {}
          obj.id = item.id
          obj.img = item.album.artist.img1v1Url
          obj.title = item.name
          obj.name = arr2
          idArray.push(obj)
        })
        this.setData({
          // 全部单曲
          allsongs: res.result.songs,
          idArray: idArray
        })
      } else if (this.data.type === 1004) {
        res.result.mvs.map(item => {
          if (item.playCount >= 100000 && item.playCount < 100000000) {
            item.playCount = parseInt(item.playCount / 10000).toFixed(1) + '万'
          } else if (item.playCount >= 100000000) {
            item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
          } else {
            item.playCount = item.playCount
          }
        })
        this.setData({
          // mv
          mvs: res.result.mvs
        })
      } else if (this.data.type === 1014) {
        res.result.videos.map(item => {
          if (item.durationms / 1000 < 60) {
            if (parseInt(item.durationms / 1000) < 10) {
              item.durationms = '00' + ':' + '0' + parseInt(item.durationms / 1000)
            } else {
              item.durationms = '00' + ':' + parseInt(item.durationms / 1000)
            }
          } else {
            if (parseInt(item.durationms / 1000 / 60) < 10 && parseInt(item.durationms / 1000 % 60) >= 10) {
              item.durationms = '0' + parseInt(item.durationms / 1000 / 60) + ':' + parseInt(item.durationms / 1000 % 60)
            } else if (parseInt(item.durationms / 1000 / 60) >= 10 && parseInt(item.durationms / 1000 % 60) < 10) {
              item.durationms = parseInt(item.durationms / 1000 / 60) + ':' + '0' + parseInt(item.durationms / 1000 % 60)
            } else if (parseInt(item.durationms / 1000 / 60) < 10 && parseInt(item.durationms / 1000 % 60) < 10) {
              item.durationms = '0' + parseInt(item.durationms / 1000 / 60) + ':' + '0' + parseInt(item.durationms / 1000 % 60)
            } else {
              item.durationms = parseInt(item.durationms / 1000 / 60) + ':' + parseInt(item.durationms / 1000 % 60)
            }
          }
        })
        this.setData({
          video: res.result.videos,
        })
      } else if (this.data.type === 100) {
        this.setData({
          // 歌手
          singer: res.result.artists,
        })
      } else if (this.data.type === 10) {
        res.result.albums.map(item => {
          item.publishTime = dayjs(item.publishTime).format('YYYY-MM-DD')
        })
        this.setData({
          // 专辑
          albums: res.result.albums,
        })
      } else if (this.data.type === 1000) {
        res.result.playlists.map(item => {
          if (item.playCount >= 100000 && item.playCount < 100000000) {
            item.playCount = parseInt(item.playCount / 10000).toFixed(1) + '万'
          } else if (item.playCount >= 100000000) {
            item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
          } else {
            item.playCount = item.playCount
          }
        })
        this.setData({
          // 歌单
          playList: res.result.playlists,
        })
      }
    }).catch(err => {})
  },
  getDatas() {
    api.multimatch(this.data.value).then(res => {
      if (res.result.album != null) {
        let fansSize = res.result.artist[0].fansSize
        if (fansSize >= 100000 && fansSize < 100000000) {
          fansSize = parseInt(fansSize / 10000).toFixed(1) + '万'
        } else if (fansSize >= 100000000) {
          fansSize = (fansSize / 100000000).toFixed(1) + '亿'
        } else {
          fansSize = fansSize
        }
        this.setData({
          fansSize: fansSize,
          album: res.result.album[0],
          artist: res.result.artist[0],
        })
      } else {
        this.setData({
          imp: 'mid'
        })
      }

    }).catch(err => {})
  },
  // 历史记录搜索
  historySearch(e) {
    let arr = this.data.searchHis
    if (arr !== []) {
      let index = arr.findIndex(item => {
        return item == e.currentTarget.dataset.keyword
      })
      if (index < 0) {
        arr.push(e.currentTarget.dataset.keyword)
        wx.setStorageSync('searchHis', arr)
        let ass = wx.getStorageSync('searchHis');
        this.setData({
          searchHis: ass
        })
      }
    } else {
      arr.push(e.currentTarget.dataset.keyword)
      wx.setStorageSync('searchHis', arr)
      let ass = wx.getStorageSync('searchHis');
      this.setData({
        searchHis: ass
      })
    }
    this.setData({
      keyWord: e.currentTarget.dataset.keyword,
      value: e.currentTarget.dataset.keyword,
      flag: false,
      uzi: 'mid'
    })
    this.getData()
    this.getDatas()
  },
  // 搜索
  onSearch(e) {
    this.setData({
      uzi: 'mid'
    })
    let arr = this.data.searchHis
    if (e.detail === '') {
      this.setData({
        value: this.data.showKeyWord,
        flag: false
      })
      this.getData()
      this.getDatas()
      if (arr !== []) {
        let index = arr.findIndex(item => {
          return item == e.detail
        })
        if (index < 0) {
          arr.push(this.data.showKeyWord)
          wx.setStorageSync('searchHis', arr)
          let ass = wx.getStorageSync('searchHis');
          this.setData({
            searchHis: ass
          })
        }
      } else {
        arr.push(this.data.showKeyWord)
        wx.setStorageSync('searchHis', arr)
        let ass = wx.getStorageSync('searchHis');
        this.setData({
          searchHis: ass
        })
      }
    } else {
      this.setData({
        value: e.detail,
        flag: false
      })
      this.getData()
      this.getDatas()
      if (arr !== []) {
        let index = arr.findIndex(item => {
          return item == e.detail
        })
        if (index < 0) {
          arr.push(e.detail)
          wx.setStorageSync('searchHis', arr)
          let ass = wx.getStorageSync('searchHis');
          this.setData({
            searchHis: ass
          })
        }
      } else {
        arr.push(e.detail)
        wx.setStorageSync('searchHis', arr)
        let ass = wx.getStorageSync('searchHis');
        this.setData({
          searchHis: ass
        })
      }
    }
  },
  // 热搜（详细）
  getHotSearch() {
    api.hotSearch().then(res => {
      this.setData({
        hotSearch: res.data
      })
    }).catch(err => {})
  },
  // 清空历史记录
  delete() {
    wx.showModal({
      title: '提示',
      content: '是否要删除全部历史记录？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('searchHis')
          this.setData({
            searchHis: []
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      showKeyWord: options.showKeyWord
    })
    this.getHotSearch()
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
    let arr = wx.getStorageSync('searchHis');
    if (arr) {
      this.setData({
        searchHis: arr
      })
    }
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
        url: `../../pages/play/play`,
      })
    }
    wx.setStorageSync('idArray', arr)
  },
  // 专辑详情
  albumDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../pages/album/album?id=${id}`,
    })
  },
  // 查看单曲
  moreSongs() {
    this.setData({
      active: 1
    })
  },
  // 查看视频
  moreVideos() {
    this.setData({
      active: 3
    })
  }, // 查看歌手
  moreSings() {
    this.setData({
      active: 4
    })
  }, // 查看专辑
  moreAlbums() {
    this.setData({
      active: 5
    })
  },
  // 查看歌单
  moreSongss() {
    this.setData({
      active: 6
    })
  },
  // 查看yonghu
  moreyonghu() {
    this.setData({
      active: 9
    })
  },
  // 歌手详情
  singerDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../singerdetail/singerdetail?id=${id}`,
    })
  },
  // 歌单详情
  playlistDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../pages/gedan/gedan?id=${id}`,
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
})