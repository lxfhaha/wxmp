// pages/cart/cart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartGroup: [],
    allWeight: 0,
    totalMoney: 0,
    isAllSelected: false,
    isCartNull: false,
    isHidden: null,
    checkedStatusArr: []
  },
  /**
   * 点击跳转到首页
   */
  goToHomePage() {
    wx.switchTab({
      url: '/pages/home/home',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 点击增加商品数量
   */
  addProductCount(e) {
    console.log(e)
    console.log(this)
    const item = this.data.cartGroup.filter(cp => cp.id === e.currentTarget.dataset.id)[0];
    console.log(item)
    app.addCount(item.id);
    this.setData({
      cartGroup: app.cart
    });
    this.setData({
      totalMoney: this.data.cartGroup.reduce((result, items) => {
        if (items.checked) {
          result += (items.price * items.count)
        }
        return result;
      }, 0)
    })
  },
  /**
   * 点击减少商品数量
   */
  reduceProductCount(e) {
    console.log(e)
    console.log(this)
    const item = this.data.cartGroup.filter(cp => cp.id === e.currentTarget.dataset.id)[0];
    console.log(item)
    app.reduceCount(item.id);
    this.setData({
      cartGroup: app.cart
    });
    this.setData({
      totalMoney: this.data.cartGroup.reduce((result, items) => {
        if (items.checked) {
          result += (items.price * items.count)
        }
        return result;
      }, 0)
    })
  },
  /**
   * 点击删除商品
   */
  delCartProduct(e) {
    console.log(e)
    wx.showModal({
      content: '确认删除该商品?',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确认',
      success: (res) => {
        console.log(res)
        if (res.confirm) {
          const item = this.data.cartGroup.filter(delcp => delcp.id === e.currentTarget.dataset.id)[0];
          app.del(item.id);
          this.setData({
            cartGroup: app.cart
          });
          this.setData({
            totalMoney: this.data.cartGroup.reduce((result, items) => {
              if (items.checked) {
                result += (items.price * items.count)
              }
              return result;
            }, 0)
          });
          if (this.data.cartGroup.length === 0) {
            this.setData({
              isCartNull: false,
              isHidden: true
            })
          }
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  checkboxChange(e) {
    console.log(e)
    app.selected(e.detail.value)
    this.setData({
      checkedStatusArr: e.detail.value,
      cartGroup: app.cart,
    });
    this.setData({
      totalMoney: this.data.cartGroup.reduce((result, items) => {
        if (items.checked) {
          result += (items.price * items.count)
        }
        return result;
      }, 0)
    })
    if (this.data.checkedStatusArr.length === this.data.cartGroup.length) {
      this.setData({
        isAllSelected: true
      })
    } else {
      this.setData({
        isAllSelected: false
      })
    }
  },
  allCheckboxChange(e) {
    console.log(e.detail.value.length)
    app.allSelected(e.detail.value.length);
    this.setData({
      cartGroup: app.cart,
    })
    this.setData({
      totalMoney: this.data.cartGroup.reduce((result, items) => {
        if (items.checked) {
          result += (items.price * items.count)
        }
        return result;
      }, 0)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cartGroup: app.cart
    })
    this.setData({
      totalMoney: this.data.cartGroup.reduce((result, items) => {
        if (items.checked) {
          result += (items.price * items.count)
        }
        return result;
      }, 0)
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
    const carts = wx.getStorageSync('wx-mall') || [];
    console.log(carts)
    if (carts.length > 0) {
      this.setData({
        cartGroup: carts,
        isCartNull: true,
        isHidden: false
      })
    } else {
      this.setData({
        isCartNull: false,
        isHidden: true
      })
    }
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