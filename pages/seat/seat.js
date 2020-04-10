// pages/seat/seat.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    film:'',
    time:'',
    selectArr:'',
    seatArr:'',
    row: '6',
    col: '6',
    src: 'sit_admit.png',
    seatLoaction:'',
    price:'',
    fee:0,
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var film = this.options.film;
    var price = this.options.price;
    var time = this.options.time;
    //console.log(this.options);
    //this.showInputLayer();
    var row = 9;
    var col = 8;
    var src = "sit_admit.png";
    var seat = {}
    var seatArr = new Array(row);
    for (var i = 0; i < row; i++) {
      seatArr[i] = new Array(col);
      for (var j = 0; j < col; j++) {
        //随机产生不可选座位
        var random_seat = Math.ceil(Math.random() * col);
        if (random_seat % 3 == 0) {
          seat.src = "sit_ban.png";
        } else {
          seat.src = src;
        }
        seatArr[i][j] = seat;
        seat = {}
      }
    }
    this.setData({
      seatArr: seatArr,
      film: film,
      time: time,
      price:price
    })
  },
  /**
    * 显示支付密码输入层
    */
  showInputLayer: function () {
    this.setData({ showPayPwdInput: true, payFocus: true });
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function () {
    var that = this;
    var val = this.data.pwdVal;
    console.log(val);
    //从全局变量获取支付密码
    var payPwd = app.globalData.vipInfo.payPwd;
    
    this.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' }, function () {
      //判断支付密码与输入密码是否一致
      if (val.length<6) {
        wx.showToast({
          title: '提示未付款',
          icon:'',
          duration:2000
        })
      }else if (payPwd == val) {
        var arr = that.data.seatLoaction;
        var seats = '';
        for(var i=0;i<arr.length;i++){
          seats = seats+arr[i]+' ';
        }
        //console.log(that.data);
        var order = {
          orderId:'',
          vipId:app.globalData.vipInfo.vipId,
          movieId:'',
          movieName: that.data.film,
          roomId:3,
          money:that.data.fee,
          seatLocation: seats,
          paytime: '',
          orderStatus:'已付款',
          playTime:'04-09 18:00'
        }
        //console.log(order);
        wx.request({
          url: 'http://192.168.5.153:8088/movie/orders/addOrder',
          method:'POST',
          data: JSON.stringify(order),
          header: {
            'Content-Type': 'application/json'
          },
          success:function(res){
            var orderId = res.data.orderId;
            console.log(res.data.orderId);
            wx.redirectTo({
              url: '../../pages/success/success?orderId=' + orderId
            })
          }
        })
        
      } else {
        wx.showToast({
          title: '密码错误',
          icon:'none',
          duration:1000
        })
      }
    });

    
  },
  /**
   * 获取焦点
   */
  getFocus: function () {
    this.setData({ payFocus: true });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function (e) {
    this.setData({ pwdVal: e.detail.value });

    if (e.detail.value.length >= 6) {
      this.hidePayLayer();
    }
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
  /*选择座位 显示座位号 */
  seat_click: function (e) {
    var that = this;
    //获取座位坐标，位置
    var toastRow = e.currentTarget.dataset.x + 1;
    var toastCol = e.currentTarget.dataset.y + 1;
    var select_src = e.currentTarget.dataset.src;
    var src = 'seatArr[' + e.currentTarget.dataset.x + '][' + e.currentTarget.dataset.y + '].src';
    var select_seat = {
      x: toastRow,
      y: toastCol
    }
    var seat_location = toastRow + '排' + toastCol + '座';
    /*
    判断座位类型1.可选  2.已选  3.不可选
    */
    //已选座位个数（数组长度）
    var len = that.data.selectArr.length;
    //判断是否为可选座位
    if (select_src == 'sit_admit.png') {
      if (len<3){
        var arr = new Array();
        var loc = new Array();
        if(len==0){
          arr.push(select_seat);
          loc.push(seat_location);
        }else{
          arr = that.data.selectArr;
          loc = that.data.seatLoaction;
          arr.push(select_seat);
          loc.push(seat_location);
        }
         
        that.setData({
          [src]: 'sit_chosen.png',
          selectArr: arr,
          seatLoaction: loc,
          fee:(that.data.price)*(loc.length)
        }) 
      } else {
        wx.showToast({
          title: '最多购买3张票',
          icon: 'none'
        })
      }
    //判断是否为已选座位
    } else if (select_src == 'sit_chosen.png') {
      //取消选定座位  console.log(that.data.selectArr[0]);

      let arr = that.data.selectArr;  //let：局部变量   var:函数体内的全局变量
      let loc = that.data.seatLoaction;
      let price = that.data.price;
      //从已选座位数组删去一个
      arr.splice(0,1);
      //从已选位置文字中删去一个
      loc.splice(0,1);
      that.setData({
        [src]: 'sit_admit.png',
        seatLoaction:loc,
        selectArr:arr,
        fee: price * (loc.length)
      })
    } else {
      wx.showToast({
        title: '该座位已被预约！',
        icon: 'none'
      })
    }
  },
})