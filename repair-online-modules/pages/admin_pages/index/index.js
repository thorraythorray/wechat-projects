// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    swiper_list: [
      "/images/slider1.jpg",
      "/images/slider2.jpg",
      "/images/slider3.jpg",
      "/images/slider4.jpg"
    ]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  
  xiushuinuan: function(e) {
    let url = "/pages/admin_pages/repair/repair?t=shui";
    wx.navigateTo({
      url: url,
    })
  },

  xiudian: function(e) {
    let url = "/pages/admin_pages/repair/repair?t=dian";
    wx.navigateTo({
      url: url,
    })
  },

  notice: function() {
    wx.navigateTo({
      url: '/pages/admin_pages/notify/index',
    })
  },

  onLoad() {
    //加载本页面的tabBar样式
    var that = this;
    var username = app.globalData.username;
    wx.hideTabBar({
      success: function () {
          app.onTabBar('admin');
      }
    });
    that.setData({
      username: username
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
