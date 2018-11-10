//app.js
App({
  onLaunch: function () {
    this.setBadge();
  },
  cart: wx.getStorageSync('wx-mall') || [],
  setBadge() {
    console.log(wx.getStorageSync('wx-mall'))
    console.log(this.cart)
    const total = this.cart.reduce((result, item) => {
      result += item.count;
      return result;
    }, 0);
    wx.setTabBarBadge({
      index: 2,
      text: `${total}`
    });
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
  },
  addCount(id) {
    this.cart.map(item => {
      if (item.id === id) {
        item.count++;
      }
      return item; 
    })
    wx.setStorageSync('wx-mall', this.cart);
    this.setBadge();
  },
  reduceCount(id) {
    this.cart.map(item => {
      if (item.id === id) {
        item.count--;
        if (item.count <= 1) {
          item.count = 1;
        }
      }
      return item;
    })
    wx.setStorageSync('wx-mall', this.cart);
    this.setBadge();
  },
  del(id) {
    this.cart = this.cart.filter(item => item.id !== id);
    wx.setStorageSync('wx-mall', this.cart);
    this.setBadge();
  },
  selected(arr) {
    console.log(arr)
    const cartGroup = this.cart.map(item => {
      console.log(item)
      if (arr.includes(item.id)) {
        item.checked = true;
      } else {
        item.checked = false;
      }
      return item;
    })
    wx.setStorageSync('wx-mall', this.cart);
  },
  allSelected(val) {
    console.log(val)
    if (val === 1) {
      this.cart.map(item => {
        console.log(item)
        item.checked = true;
        return item;
      })
    } else {
      this.cart.map(item => {
        item.checked = false;
        return item;
      })
    }
  }
})