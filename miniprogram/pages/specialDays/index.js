// miniprogram/pages/specialDays/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarArr:[
      {day:30,thisMonth:false},
      {day:1,thisMonth:true}
    ],
    year:'',
    month:'',
    day:''
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

  //根据年月获取该月有多少天
  getMonthDaysCount: function(){

  },

  //根据年月日获取星期几
  getWeekDay: function(){

  }
})