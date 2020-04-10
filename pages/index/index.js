// pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //提交表单验证登录
  formSubmit: function (e) {
    if (e.detail.value.userAccount == "") {
      wx.showToast({
        title: '用户名不能为空！',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.userPassword == "") {
      wx.showToast({
        title: '密码不能为空！',
        icon: 'none',
        duration: 1000
      })
    } else {
      console.log(e.detail.value);
      var formData = e.detail.value;
      wx.request({
        url: 'http://192.168.5.153:8088/movie/vip/login',
        data: {
          account: formData.userAccount,
          password: formData.userPassword,
        },
        method: 'GET',
        //登录成功返回用户信息
        success: function (res) {
          var result = res.data.result;
          if(result != null){
            wx.showToast({
              title: '登录成功',
              icon:'',
              duration:2000
            })
            //返回用户信息保存到全局变量
            app.globalData.vipInfo = result;
            //console.log(app.globalData.vipInfo);
            wx.reLaunch({
              url: '../../pages/my/my',
            })
          }else{
            wx.showToast({
              title: '用户名或密码错误！',
              icon:'none'
            })
          }
          }
          
      })
    }
  }
})