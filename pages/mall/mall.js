// pages/mall/mall.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tablists: [],
    idChecked: 0,
    products: []
  },
  /**
   * 左侧商品分类切换
   */
  tabListChange(e) {
    // console.log(e)
    // console.log(this)
    const currentList = this.data.tablists.filter(item => item.id === e.currentTarget.dataset.id)[0];
    // console.log(currentList.id);
    this.setData({
      toListId: currentList.id
    });
    this.loadProductList();
    // this.data.isChecked = true;
    // console.log(this.data.isChecked)
  },
  /**
   * 点击跳转到详情页
   */
  goToDetail(e) {
    // console.log(e)
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 加入购物车
   */
  addToCart(e) {
    // console.log(e.currentTarget.dataset.id)
    // console.log(this.data.products)
    const item = this.data.products.filter(product => product.id === e.currentTarget.dataset.id)[0];
    app.addToCart(item);
  },
  /**
   * 加载商品列表，与左侧商品分类对应
   */
  loadProductList: function () {
    // console.log(this)
    wx.request({
      url: `https://wap.fruitday.com/v3/product/sub_category_list?store_id_list=2&class2_id=${this.data.toListId}&class3_id=0&sort_type=1&tms_region_type=1`,
      success: (res) => {
        // console.log(res)
        this.setData({
          products: res.data.data.productGroup
        });
        console.log(res.data.data)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(this)
    wx.request({
      url: 'https://wap.fruitday.com/v3/product/category_list?store_id_list=2&class_id=',
      success: (res) => {
        console.log(res);
        this.setData({
          tablists: res.data.data.classOneGroup,
          idChecked: res.data.data.classId,
          toListId: res.data.data.childrenList[0].class2Name.id
        });
        console.log(this.data.toListId)
        this.loadProductList();
      },
      fail: function(res) {},
      complete: function(res) {
        wx.hideLoading();
      },
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

  }
})