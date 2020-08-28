// pages/play/play.js
const {
  default: api
} = require("../../http/api")
const BAM = wx.getBackgroundAudioManager()
import create from "../../utils/store/create"
import store from "../../store/index"

create.Page(store,{

  /**
   * 页面的初始数据
   */
  use:['img','paused'],
  data: {
    id: 0,
    idArray: [],
    indicatordots: true,
    indicatorcolor: '#bbb',
    activecolor: '#eee',
    active: 0,
    num: 0,
    flag: true,
    lyric: '',
    finalLyric: [],
    currentIndex: 0,
    marginTop: '',
    duration: '',
    currentTime: '00:00',
    index: 0,
    value: '',
    endTime: '',
    lastIndex: '',
    nextIndex: '',
  },
  // 获取歌曲
  songurl() {
    api.songurl(this.data.id).then(res => {
      this.setData({
        lastIndex: this.data.index
      })
      BAM.src = res.data[0].url
      BAM.title = this.data.idArray[this.data.index].title
      let img = this.data.idArray[this.data.index].img
      this.store.data.img = img
    }).catch(err => {})
  },
  // 获取歌词
  getLyric() {
    api.lyric(this.data.id).then(res => {
      this.setData({
        lyric: res.lrc.lyric
      })
      let lyricRes = this.handleLyric()
      let finalLyric = []
      lyricRes.map(item => {
        if (item[1] !== '') {
          finalLyric.push(item)
        }
      })
      this.setData({
        finalLyric: finalLyric
      })
    }).catch(err => {})
  },
  active() {
    this.setData({
      active: 1
    })
  },
  actives() {
    this.setData({
      active: 0
    })
  },
  // 暂停
  unplay() {
    BAM.pause()
    this.setData({
      flag: false
    })
  },
  // 播放
  play() {
    BAM.play()
    this.setData({
      flag: true
    })
  },
  // 歌词处理
  handleLyric() {
    let lyricRes = []
    // 将歌词组成的字符串转换成数组
    // 使用split对换行字符串进行切割（\n; \r:回车 \t Tab键位）
    let lyricArray = this.data.lyric.split('\n')
    // 判断最后一个是否为空，是，删除
    if (lyricArray[lyricArray.length - 1] == '') {
      lyricArray.pop() /*删除*/
    }
    // 找到[xx:xx.xxx]格式   使用正则表达式替换
    // 书写正则表达式 []表示特殊字符 使用\[]进行转义  数字[0-9] === \表示 {n} 表示几个
    // 点也表示特殊字符
    let pattren = /\[\d{2}\:\d{2}\.\d{1,4}\]/
    // 循环替换
    lyricArray.forEach(function (v, i, a) {
      let new_lyric = v.replace(pattren, '')
      // 将时间取出来 match返回的是数组
      let time = v.match(pattren)
      if (time != '') {
        // 截取
        let timeRes = time[0].slice(1, -1)
        // 将分和秒分开
        let timeArray = timeRes.split(':')
        // 将时间转换成秒
        let finalTime = parseFloat(timeArray[0] * 60) + parseFloat(timeArray[1])

        lyricRes.push([finalTime, new_lyric])
      }
    })
    return lyricRes
  },
  // 上一曲
  lastSong() {
    let index = this.data.index
    if (this.data.num === 0 || this.data.num === 2) {
      if (index > 0) {
        index--
        this.setData({
          index: index,
          id: this.data.idArray[index].id,
        })
      } else {
        let index1 = this.data.idArray.length - 1
        this.setData({
          index: index1,
          id: this.data.idArray[index1].id,
        })
      }
    }
    if (this.data.num === 1) {
      if (this.data.lastIndex != '') {
        this.setData({
          index: this.data.lastIndex,
          id: this.data.idArray[this.data.lastIndex].id,
        })
      } else {
        let newIndex = Math.floor(Math.random() * this.data.idArray.length)
        this.setData({
          index: newIndex,
          id: this.data.idArray[newIndex].id,
        })
      }
    }
    this.songurl()
    this.getLyric()
  },
  // 下一曲
  nextSong() {
    let index = this.data.index
    // 循环列表
    if (this.data.num === 0 || this.data.num === 2) {
      if (index < this.data.idArray.length - 1) {
        index++
        this.setData({
          index: index,
          id: this.data.idArray[index].id,
        })
      } else {
        this.setData({
          index: 0,
          id: this.data.idArray[0].id,
        })
      }
    }
    // 随机
    if (this.data.num === 1) {
      this.setData({
        lastIndex: index
      })
      let newIndex = Math.floor(Math.random() * this.data.idArray.length)
      if (newIndex === index) {
        if (newIndex === 0) {
          this.setData({
            index: newIndex + 1,
            id: this.data.idArray[newIndex + 1].id,
          })
        } else {
          this.setData({
            index: newIndex - 1,
            id: this.data.idArray[newIndex - 1].id,
          })
        }
      } else {
        this.setData({
          index: newIndex,
          id: this.data.idArray[newIndex].id,
        })
      }
    }
    this.songurl()
    this.getLyric()
  },
  //动态样式
  change(e) {
    this.setData({
      value: e.detail.value
    })
    BAM.seek(this.data.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let idArray = wx.getStorageSync('idArray')
    this.setData({
      idArray: idArray
    })
    let id = options.id
    let index = idArray.findIndex(item => {
      return item.id == id
    })
    if (index < 0) {
      this.setData({
        id: idArray[0].id,
        index: 0
      })
    } else {
      this.setData({
        id: idArray[index].id,
        index: index
      })
    }
    this.songurl()
    this.getLyric()
    BAM.onTimeUpdate(() => {
      // 获取当前播放时间
      let currentTime = BAM.currentTime
      // 获取歌词时间
      let finalLyric = this.data.finalLyric
      // 计算滚动的位置
      if (this.data.currentIndex >= 3 && this.data.currentIndex < finalLyric.length - 6) {
        this.setData({
          marginTop: (this.data.currentIndex - 3) * 35
        })
      }
      // 循环
      if (this.data.currentIndex == finalLyric.length - 2) {
        if (currentTime >= finalLyric[finalLyric.length - 1][0]) {
          this.setData({
            currentIndex: finalLyric.length - 1
          })
        }
      } else {
        for (let i = 0; i < finalLyric.length - 1; i++) {
          if (currentTime >= finalLyric[i][0] && currentTime < finalLyric[i + 1][0]) {
            // 设置正在播放的行号
            this.setData({
              currentIndex: i
            })
          }
        }
      }
      // 改变当前播放时间的样式
      let currentTimes = BAM.currentTime
      if (currentTimes < 60) {
        if (parseInt(currentTimes) < 10) {
          currentTimes = '00' + ':' + '0' + parseInt(currentTimes)
        } else {
          currentTimes = '00' + ':' + parseInt(currentTimes)
        }
      } else {
        if (parseInt(currentTimes / 60) < 10 && parseInt(currentTimes % 60) >= 10) {
          currentTimes = '0' + parseInt(currentTimes / 60) + ':' + parseInt(currentTimes % 60)
        } else if (parseInt(currentTimes / 60) >= 10 && parseInt(currentTimes % 60) < 10) {
          currentTimes = parseInt(currentTimes / 60) + ':' + '0' + parseInt(currentTimes % 60)
        } else if (parseInt(currentTimes / 60) < 10 && parseInt(currentTimes % 60) < 10) {
          currentTimes = '0' + parseInt(currentTimes / 60) + ':' + '0' + parseInt(currentTimes % 60)
        } else {
          currentTimes = parseInt(currentTimes / 60) + ':' + parseInt(currentTimes % 60)
        }
      }
      // 获取总时长
      let duration = BAM.duration
      this.setData({
        currentTime: currentTimes,
        value: currentTime,
        endTime: duration
      })
    })
    BAM.onPlay(() => {
      this.store.data.paused = BAM.paused
      let duration = BAM.duration
      if (duration < 60) {
        if (parseInt(duration) < 10) {
          duration = '00' + ':' + '0' + parseInt(duration)
        } else {
          duration = '00' + ':' + parseInt(duration)
        }
      } else {
        if (parseInt(duration / 60) < 10 && parseInt(duration % 60) >= 10) {
          duration = '0' + parseInt(duration / 60) + ':' + parseInt(duration % 60)
        } else if (parseInt(duration / 60) >= 10 && parseInt(duration % 60) < 10) {
          duration = parseInt(duration / 60) + ':' + '0' + parseInt(duration % 60)
        } else if (parseInt(duration / 60) < 10 && parseInt(duration % 60) < 10) {
          duration = '0' + parseInt(duration / 60) + ':' + '0' + parseInt(duration % 60)
        } else {
          duration = parseInt(duration / 60) + ':' + parseInt(duration % 60)
        }
      }
      this.setData({
        duration: duration
      })
    })
    BAM.onEnded(() => {
      this.setData({
        currentIndex: 0,
        marginTop: '',
      })
      if (this.data.num === 0 || this.data.num === 1) {
        this.nextSong()
      } else {
        let index = this.data.index
        this.setData({
          index: index,
          id: this.data.idArray[index].id,
        })
        this.songurl()
        this.getLyric()
      }
    })
    BAM.onPause(() => {
      this.store.data.paused = BAM.paused
    })
  },
  circulation() {
    this.setData({
      num: 1
    })
    wx.showToast({
      title: '随机播放',
      icon: 'none',
      duration: 2000
    })
  },
  random() {
    this.setData({
      num: 2
    })
    wx.showToast({
      title: '单曲循环',
      icon: 'none',
      duration: 2000
    })
  },
  repeat() {
    this.setData({
      num: 0
    })
    wx.showToast({
      title: '列表循环',
      icon: 'none',
      duration: 2000
    })
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

  },

})