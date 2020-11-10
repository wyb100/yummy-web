import Vue from 'vue';
export default {
  SET_MEMBER(state,data){
    state.member=data;
    state.login=true;
    console.log('state'+state.member)
  },
  LOGIN_OUT(state){
    state.member={};
    state.login=false;
  },
  SET_DATA(state, data) {
    console.log(data.cart)
    state.cartData=data.cart;
  },
  SET_CART(state, payload) {
    const {
      id,
      shopId,
      price,
      type,
      name,
      img
    } = payload;
    if (!state.cartData[shopId]) {
      Vue.set(state.cartData,shopId,{
        totalPrice: 0,
        totalMount: 0,
        foodList: []
      })
      //state.cartData[shopId] = {
    }
    const index = state.cartData[shopId]['foodList'].findIndex(item => Number(item.id) === id)
    if (index === -1) {
      state.cartData[shopId]['foodList'].push({
        id,
        price,
        type,
        name,
        img,
        totalMount: 1,
        totalPrice: price
      })
      state.cartData[shopId]['totalPrice']+=price;
    } else {
      switch (type) {
        case 'PLUS':
          state.cartData[shopId]['totalPrice']+=price;
          state.cartData[shopId]['foodList'][index].totalPrice += price;
          state.cartData[shopId]['foodList'][index].totalMount += 1;
          break;
        case 'MINUS':
          state.cartData[shopId]['totalPrice']-=price;
          state.cartData[shopId]['foodList'][index].totalPrice -= price;
          state.cartData[shopId]['foodList'][index].totalMount -= 1;
          if (!state.cartData[shopId]['foodList'][index].totalMount) {
            state.cartData[shopId]['foodList'] = state.cartData[shopId]['foodList'].filter(item => item.id != id)
          }
          break;
        default:
          break;

      }
    }
    localStorage.setItem('cart',JSON.stringify(state.cartData))
  },
  
}
