export default {
    setData({commit}){
        const cart=JSON.parse(localStorage.getItem('cart'))||{};
        // const totalPrice=Number(localStorage.getItem('totalPrice')||'22');
        // const totalMount=Number(localStorage.getItem('totalMount')||'22');
        // const cartData=JSON.parse(localStorage.getItem('cartData')||'[]');
        commit('SET_DATA',{
            cart:cart
        })
    },
    setCart({commit},payload){
        commit('SET_CART',payload);
    },
    setMember({commit},info){
        commit('SET_MEMBER',info)
    },
    loginOut({commit}){
        commit('LOGIN_OUT');
    }
}