// pages/orderDetail/orderDetail.js
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:'',
    oId:'',
    paytime:'',
    status:'yiwancheng'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var orderId = this.options.orderId;
    console.log("detail:" + orderId);
    wx.request({
      url: 'http://192.168.5.153:8088/movie/orders/TheOrder',
      data: {
        orderId: orderId
      },
      method: 'GET',
      success: function (res) {
        var order = res.data.order;
        if (order != null) {
          var time = utils.formatTime(new Date(order.playTime));
          that.setData({
            order: order,
            paytime: time,
            oId: orderId
          })
        } else {
          console.log("获取数据失败！")
        }
        //console.log(res.data);
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
  deleteOrder: function () {
      var id = this.data.oId;
      wx.request({
        url: 'http://192.168.5.153:8088/movie/orders/delete',
        method: 'GET',
        data:{
          orderId:id
        },
        success:function(res){
          if(res.data.success){
            wx.showToast({
              title: '删除成功！',
              icon:'',
              duration:2000
            });
            var page = getCurrentPages();
            //获取上一个页面的页面栈
            var lastPage = page[page.length - 2];
            lastPage.onLoad();
            wx.navigateBack({
              delta:1
            })
          }else{
            wx.showToast({
              title: '系统异常',
              icon: 'none',
            })
          }
        }
      })
  },
})