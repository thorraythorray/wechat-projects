//获取应用实例
const app = getApp();
const dy = 'xjgKAUwpSkIW9QM4kM4jHbjVT9k8gwqDrwgjxLtzyVA'
 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    y:0,
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo) {
      that.setUserInfo(app.globalData.userInfo);
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setUserInfo(res.userInfo);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          that.setUserInfo(res.userInfo);
        }
      })
    }
  },
 
  onShow:function(){
    var that = this
    var p = app.globalData.youke
    wx.getStorage({
      key: 'hide',
      success(res){
        console.log(res.data)
        if(res.data==1){
          wx.hideTabBar({
            animation: true,
          })
        }
      }
    })
    that.setData({
      y:p
    })
    if(!this.data.hasUserInfo && this.data.canIUse){
      wx.showToast({
        title: '点击问号可进行登录',
        icon:"none",
        duration:1500
      })
    }
    if(app.globalData.show==1){
      wx.showToast({
        title: '点击你的头像',
        icon:"none",
        duration:1500
      })
      app.globalData.show = 0
    }
  },

  getUserInfo: function (e) {
    this.setUserInfo(e.detail.userInfo);
    if(!e.detail.userInfo){
      wx.getStorage({
        key: 'openid',
        success (res) {
          console.log(res.data)
        },
        fail(){
          wx.showToast({
            title: '请下拉刷新',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
  },

  wdst:function(){
    wx.navigateTo({
      url: '../../pages/message/index',
    })
  },

  // 我的消息
  dyxx:function(){
    wx.navigateTo({
      url: '../../pages/message/index',
    })
  },

  logout: function() {
    wx.navigateTo({
      url: '../../pages/login/index',
    })
  },

  userid:function(){
    wx.login({
      success (res) {
        console.log(res.code)
        if (res.code) {
        //发起网络请求
        wx.request({
          url: 'https://www.toilet-mis.cn/login.php',
          data: {
            code: res.code
          },
          success(res){
            console.log(res)
          },
          fail(res){
            wx.showToast({
              title: '登录失败',
              icon: 'loading',
              duration: 2000
            })
          }
        })
      }
      else {
        console.log('登录失败！' + res.errMsg)
        wx.showToast({
          title: '请尝试重新登录，否则可能影响您的使用',
          icon: 'none',
          duration: 2000
        })
      }
    }
  })
  },

  us: function(){
    wx.navigateTo({
      url: '../../pages/profile/index',
    })
  },

  login:function(){
    wx.showModal({
      title: '提示',
      content: '确定要返回登录界面吗',
      success (res) {
        if (res.confirm) {
          app.globalData.youke = 1
          app.globalData.twice = 1
          app.globalData.inform = 0
          console.log(app.globalData.youke)
          wx.navigateTo({
            url: '/pages/login/main',
          })
        } 
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  setUserInfo: function (userInfo) {
    if (userInfo != null) {
      app.globalData.userInfo = userInfo
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    }
  },

  onPullDownRefresh:function()
{
  wx.showNavigationBarLoading() //在标题栏中显示加载
  this.userid2()
  setTimeout(function()
  {
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },1500);
},

})