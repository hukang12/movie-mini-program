// pages/movie/movie.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmList:'',
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
        /**
         * 获取当前设备的宽高
         */
      wx.getSystemInfo({

        success: function (res) {
          that.setData({
            winWidth: res.windowWidth,
            winHeight: res.windowHeight
          });
        }

      });
      //请求数据
      wx.request({
        url: 'http://192.168.5.153:8088/movie/film/getAll',
        method:'GET',
        success:function(res){
          var list = res.data.films;
          console.log(list);
          if(list==null){
            wx.showToast({
              title: '获取数据失败',
              icon:'none',
              duration:2000
            })
          }else{
            that.setData({
              filmList:list
            })
          }
        }
      })
  },
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

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
  toDetail:function(e){
    var filmId = e.currentTarget.dataset.filmid;
    var vip = app.globalData.vipInfo;
    wx.navigateTo({
        url: "../detail/detail?filmId="+filmId
      })
    // if(vip!=null){
    //   wx.navigateTo({
    //     url: "../detail/detail?filmId="+filmId
    //   })
    // }else{
    //   wx.showModal({
    //     title: '未登录',
    //     content: '是否立即登录？',
    //     showCancel: true,
    //     cancelText: "否",
    //     cancelColor: 'skyblue',
    //     confirmText: "是",
    //     confirmColor: 'skyblue',
    //     success: function (res){
    //       if(res.cancel){

    //       }else{
    //         wx.navigateTo({
    //           url: '../../pages/index/index',
    //         })
    //       }
    //     },
    //     fail: function (res) { },//接口调用失败的回调函数
    //     complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    //   })
    // }
    
  }
})