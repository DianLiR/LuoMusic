import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search_history: [],
    info_data: '',
    is_login: false,
    cookie: '',
    show_min_play: true,
    is_play: false,
    music_play_data: {
      coverImgUrl:
        'http://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
      name: '无播放歌曲'
    }
  },
  mutations: {
    UpData_login(state, data) {
      state.is_login = data
    },
    // out_login(state) {
    //   state.is_login = false
    //   state.cookie = null
    //   state.info_data = null
    //   console.log('out_login->', state)
    // },
    del_search(state, value) {
      state.search_history.splice(value, 1)
    },
    set_search(state, data) {
      //数组去重(indexOf)
      let search = state.search_history
      // function unique(state) {
      search = [data, ...state.search_history]
      var res = []
      for (var i = 0; i < search.length; i++) {
        if (res.indexOf(search[i]) == -1) {
          res.push(search[i])
        }
        // }
        // return res
        state.search_history = res
      }
      // console.log(state, data)
    },
    toggle_show_minplay(state, flag) {
      state.show_min_play = flag
    },
    set_music_data(state, data) {
      // console.log('🚀 ~ data', data)
      state.music_play_data = data
    },
    toggle_is_play(state, data) {
      state.is_play = data
    },
    set_cookie(state, data) {
      state.cookie = data
    },
    set_info_data(state, data) {
      state.info_data = null
      state.info_data = data
      console.log('set_info_data-->', state.info_data)
    }
  },
  actions: {
    set_music_data({ commit }, data) {
      commit('toggle_is_play', true)
      commit('set_music_data', data)
    },
    del_all_data({ commit }) {
      commit('UpData_login', false) // 退出登录状态
      commit('set_info_data', null) //清空info_data 的数据
      commit('set_cookie', null)
    }
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ]
})
