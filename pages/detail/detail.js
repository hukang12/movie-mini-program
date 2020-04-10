// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    film:'',
    filmImg:'1',
    timeList:[
      {time:'10:00'},
      {time:'13:15'},
      {time:'18:00'},
      {time:'20:30'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var filmId = options.filmId;
    
    wx.request({
      url: 'http://192.168.5.153:8088/movie/film/getById?filmId='+filmId,
      method:'GET',
      success:function(res){
        var film = res.data.films;
        if (film == null) {
          wx.showToast({
            title: '获取数据失败',
            icon: 'none',
            duration: 2000
          })
        } else {
          that.setData({
            film: film,
            filmImg:film.filmPoster
          })
        }
      }
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
  toChosenSeat:function(e){
    console.log(e);
    console.log(this.data);
    var film = this.data.film.filmName;
    var price = 30;
    var time = e.currentTarget.dataset.time;
    wx.navigateTo({
      url: '../../pages/seat/seat?film='+film+'&time='+time+'&price='+price,
    })
  }

})