/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var app = new Vue({
  el: "#player",
  data: {
    query: "",
    musicList: [],
    musicUrl: "",
    musicCover: "",
    hotComments: [],
    isPlaying: false,
    isShow:false,
    mvUrl:""
  },
  methods: {
    searchMusic: function () {
      axios.get("https://autumnfish.cn/search?keywords=" + this.query)
        .then(res => {
          // console.log(res);
          this.musicList = res.data.result.songs;
          console.log(res.data.result.songs);
        })
        .catch(err => {
          console.log(err);
        })
    },
    playMusic: function (musicId) {
      // console.log(musicId);
      axios.get("https://autumnfish.cn/song/url?id=" + musicId)
        .then(res => {
          // console.log(res.data.data[0].url);
          this.musicUrl = res.data.data[0].url;
        })
        .catch(err => {
          console.log(err);
        })

      axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
        .then(res => {
          // console.log(res.data.songs[0].al.picUrl);
          this.musicCover = res.data.songs[0].al.picUrl;
        })
        .catch(err => {
          console.log(err);
        })

      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
        .then(res => {
          // console.log(res.data.hotComments);
          this.hotComments = res.data.hotComments;
        })
        .catch(err => {
          console.log(err);
        })
    },
    play: function () {
      // console.log("play");
      this.isPlaying = true;
    },
    pause: function () {
      // console.log("pause");
      this.isPlaying = false;
    },
    playMV: function (mvid) {
      axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
        .then(res => {
          // console.log(res.data.data.url);
          // this.hotComments = res.data.hotComments;
          this.isShow = true;
          this.mvUrl = res.data.data.url;
        })
        .catch(err => {
          console.log(err);
        })
    },
    hide:function(){
      this.isShow = false;
      this.mvUrl = "";
    }
  }
})