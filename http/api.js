import fly from "./index"
export default {
  // 获取轮播图
  banner() {
    return fly.get(`/banner`)
  },
  // 推荐歌单
  personalized() {
    return fly.get(`/personalized`)
  },
  // 手机登录
  cellphone(phone, password) {
    return fly.get(`/login/cellphone?phone=${phone}&password=${password}`)
  },
  // 邮箱登录
  email(email, password) {
    return fly.get(`/login/cellphone?email=${email}&password=${password}`)
  },
  // 检测手机号是否已注册
  checkPhone(phone) {
    return fly.get(`/cellphone/existence/check?phone=${phone}`)
  },
  // 发送验证码
  captcha(phone) {
    return fly.get(`/captcha/sent?phone=${phone}`)
  },
  // 注册
  register(captcha, phone, password, nickname, ) {
    return fly.get(`/register/cellphone?captcha=${captcha}&phone=${phone}&password=${password}&nickname=${nickname}`)
  },
  // 验证验证码
  verify(phone, captcha) {
    return fly.get(`/captcha/verify?phone=${phone}&captcha=${captcha}`)
  },
  // 获取用户详情
  userdetail(uid) {
    return fly.get(`/user/detail?uid=${uid}`)
  },
  // 获取新歌
  newsong() {
    return fly.get(`/personalized/newsong`)
  },
  // 退出登录
  logout() {
    return fly.get(`/logout`)
  },
  // 刷新用户信息
  update(gender, birthday, nickname, province, city, signature) {
    return fly.get(`/user/update?gender=${gender}&birthday=${birthday}&nickname=${nickname}&province=${province}&city=${city}&signature=${signature}`)
  },
  // 登录状态
  status() {
    return fly.get(`/login/status`)
  },
  // 新碟
  album() {
    return fly.get(`/top/album?offset=0&limit=6`)
  },
  // 推荐电台
  djprogram() {
    return fly.get(`/personalized/djprogram`)
  },
  // 推荐节目
  recommend() {
    return fly.get(`/program/recommend`)
  },
  // 歌单广场-推荐
  playlist() {
    return fly.get(`/top/playlist?limit=51`)
  },
  // 歌单广场-精品
  highquality(cat) {
    return fly.get(`/top/playlist/highquality?limit=51&cat=${cat}`)
  },
  // 华语
  Chinese() {
    return fly.get(`/top/playlist?cat=华语&limit=51`)
  },
  // 电子
  Electronics() {
    return fly.get(`/top/playlist?cat=电子&limit=51`)
  },
  // 轻音乐
  lightMusic() {
    return fly.get(`/top/playlist?cat=轻音乐&limit=51`)
  },
  // 流行
  popular() {
    return fly.get(`/top/playlist?cat=流行&limit=51`)
  },
  // 摇滚
  Rock() {
    return fly.get(`/top/playlist?cat=摇滚&limit=51`)
  },
  // 所有榜单
  toplist() {
    return fly.get(`/toplist`)
  },
  // 榜单内容摘要
  abstract() {
    return fly.get(`/toplist/detail`)
  },
  // 默认搜索历史
  srarchHis() {
    return fly.get(`/search/default`)
  },
  // 热搜（详细）
  hotSearch() {
    return fly.get(`/search/hot/detail`)
  },
  // 搜索建议
  suggest(keywords) {
    return fly.get(`/search/suggest?keywords=${keywords}&type=mobile`)
  },
  // 搜索详情
  multimatch(keywords) {
    return fly.get(`/search/multimatch?keywords=${keywords}`)
  },
  // 搜索详情
  search(keywords, type) {
    return fly.get(`/search?keywords=${keywords}&type=${type}`)
  },
  // 歌手
  artistList(type,area,initial) {
    return fly.get(`/artist/list?type=${type}&area=${area}&initial=${initial}`)
  },
  // 歌手描述
  artistdesc(id) {
    return fly.get(`/artist/desc?id=${id}`)
  },
  // 歌手热门50首
  topsong(id) {
    return fly.get(`/artist/top/song?id=${id}`)
  },
  // 获取歌手单曲
  artists(id) {
    return fly.get(`/artists?id=${id}`)
  },
  // 歌手视频
  artistmv(id) {
    return fly.get(`/artist/mv?id=${id}`)
  },
  // 获取歌手专辑
  artistAlbum(id){
    return fly.get(`/artist/album?id=${id}`)
  },
  // 播放音乐
  songurl(id) {
    return fly.get(`/song/url?id=${id}`)
  },
  // 歌词
  lyric(id) {
    return fly.get(`/lyric?id=${id}`)
  },
  // 专辑详情
  albumDetail(id) {
    return fly.get(`/album?id=${id}`)
  },
  // 歌单详情
  playlistDetail(id) {
    return fly.get(`/playlist/detail?id=${id}`)
  },
  // 歌曲详情
  songDetail(ids) {
    return fly.get(`/song/detail?ids=${ids}`)
  },
  // 获取mv地址
  mvurl(id) {
    return fly.get(`/mv/url?id=${id}`)
  },
  // 获取视频地址
  videourl(id){
    return fly.get(`/video/url?id=${id}`)
  }
}