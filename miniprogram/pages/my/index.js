// miniprogram/pages/my/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readRule:false,
    userInfo:null,
    login:-1
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
    app.initUserInfo().then(res => {
      if(res.login){
        this.setData({
          userInfo: app.globalData.userInfo,
          login:1
        })
      } else {
        this.setData({
          login:0
        })
      }
    });

  },

  //登录
  onLoginIn: function(e){
    console.log(e);
    if (e.detail.userInfo) {
      wx.cloud.callFunction({
        name:'addCustomer'
      })
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName
      })
      app.globalData.userInfo = e.detail.userInfo;
      this.addCustomer();
    }
  },

  //用户点击标记是否已经阅读用户服务协议
  readRule: function(){
    this.setData({
      readRule:!this.data.readRule
    })
  },

  //用户注册进数据库
  addCustomer: function(){
    wx.cloud.callFunction({
      name:'addCustomer',
      success:(res) => {
        console.log(res);
        if(res.result.code == 0){
          app.globalData.openid = res.result.openid;
        }
      }
    })
  }
})