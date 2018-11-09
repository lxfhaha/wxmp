//app.js
App({
  onLaunch: function () {
    this.setBadge();
  },
  cart: wx.getStorageSync('wx-mall') || [],
  setBadge() {
    const total = this.cart.reduce((result, item) => {
      result += item.count;
      return result;
    }, 0)
    wx.setTabBarBadge({
      index: 2,
      text: `${total}`
    })
  },
  addToCart(item) {
    const isInCart = this.cart.some(cartItem => cartItem.id === item.id);
    if (isInCart) {
      this.cart = this.cart.map(ci => {
        if (ci.id === item.id) {
          ci.count++;
        }
        return ci;
      })
    } else {
      this.cart.push({
        ...item,
        count: 1
      });
    }
    wx.setStorageSync('wx-mall', this.cart);
    this.setBadge();
  }
})