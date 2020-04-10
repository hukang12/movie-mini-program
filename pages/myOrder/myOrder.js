// pages/myOrder/myOrder.js
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://192.168.5.153:8088/movie/orders/getAll',
      method: "GET",
      success: function (res) {
        console.log(res.data);
        var list = res.data.orders;
        for (var i = 0; i < list.length; i++) {
          list[i].paytime = utils.formatTime(new Date(list[i].paytime));
          //console.log(list[i]);
        }
        if(list == null){
          wx.showToast({
            title: '获取数据失败',
            icon: "none",
            duration: 2000
          })
        }else{
          that.setData({
            orderList:list
          })
        }
      }
    })
  },
  toOrderDetail:function(e){
    var orderId = e.currentTarget.dataset.orderid;

    wx.navigateTo({
      url: '../../pages/orderDetail/orderDetail?orderId='+orderId,
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

  }
})