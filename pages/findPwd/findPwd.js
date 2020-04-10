// pages/findPwd/findPwd.js
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
  formSubmit: function (e) {
    var account = e.detail.value.userAccount;
    var pwd = e.detail.value.newPassword;
    var again = e.detail.value.againPwd;
    if (account == "") {
      wx.showToast({
        title: '手机号不能为空！',
        icon: 'none',
        duration: 1000
      })
    } else if (pwd == "") {
      wx.showToast({
        title: '密码不能为空！',
        icon: 'none',
        duration: 1000
      })
    } else if (pwd != again) {
      wx.showToast({
        title: '密码不一致！',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.request({
        url: 'http://192.168.5.153:8088/movie/vip/mLoginPwd',
        data: {
          account: account,
          password: pwd
        },
        success:function(res){
          console.log(res.data);
          if(res.data.success){
            wx.showModal({
              title: '密码重置成功',
              content: '是否重新登录？',
              showCancel: true,//是否显示取消按钮
              cancelText: "否",//默认是“取消”
              cancelColor: 'skyblue',//取消文字的颜色
              confirmText: "是",//默认是“确定”
              confirmColor: 'skyblue',//确定文字的颜色
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                  wx.navigateBack({
                    delta:1
                  })
                } else {
                  //点击确定
                  wx.reLaunch({
                    url: '../../pages/index/index',
                  })
                }
              },
              fail: function (res) { },//接口调用失败的回调函数
              complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
            })
           
            
          }else{
            wx.showToast({
              title: '密码重置失败！',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  }
})