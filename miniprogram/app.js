//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'dev-orjiw',
        traceUser: true,
      })
    }

    this.globalData = {
      openid:'',
      userInfo:null

    }
  },

  //初始化用户信息，判断用户是否授权，若已授权，直接获取用户的头像和昵称，并且调用云函数，获取openid，成功后，封装成userinfo,存储到globalData中
  initUserInfo: function(){
    let that = this;
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: (res) => {
                wx.cloud.callFunction({
                  name: 'login',
                  success: (r) => {
                    let userInfo = res.userInfo;
                    userInfo.openid = r.result.openid;
                    that.globalData.userInfo = userInfo;
                    resolve({
                      login:true
                    })
                  },
                  fail: (err) => {
                    resolve({
                      login: false
                    })
                  }
                })
              }
            })
          } else {
            resolve({
              login: false
            })
          }
        }
      })
    })

  }
})
