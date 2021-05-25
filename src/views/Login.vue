<template>
  <div class="w-screen h-screen relative">
    <van-tabs
      v-model="active"
      @click="login"
      class="absolute bg-white top-1/4 w-10/12 rounded-md py-3 overflow-hidden left-1/2 transform -translate-x-1/2"
    >
      <van-tab title="手机登录">
        <van-form validate-first @failed="onFailed" @submit.self="submit">
          <van-field
            v-model="info.phone"
            type="tel"
            size="large"
            name="手机号"
            clearable
            label="手机号"
            placeholder="请输入手机号"
            :rules="[{ pattern: reg.phone, message: '请输入正确手机号' }]"
          />
          <van-field
            v-model="info.pass"
            center
            size="large"
            type="password"
            clearable
            label="密码"
            placeholder="请输入密码"
            :rules="[{ pattern: reg.pass, message: '密码格式错误' }]"
          ></van-field>
          <div style="margin: 16px">
            <van-button round block color="#f1f2f4" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="邮箱登陆">
        <van-form validate-first @failed="onFailed" @submit.self="mail_submit">
          <van-field
            v-model="info.mail"
            type="tel"
            size="large"
            name="邮箱"
            clearable
            label="邮箱"
            placeholder="请输入邮箱"
            :rules="[{ pattern: reg.email, message: '请输入正确邮箱' }]"
          />
          <van-field
            v-model="info.m_pass"
            center
            size="large"
            type="password"
            clearable
            label="密码"
            placeholder="请输入密码"
            :rules="[{ pattern: reg.pass, message: '密码格式错误' }]"
          ></van-field>
          <div style="margin: 16px">
            <van-button round block color="#f1f2f4" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="二维码登陆">
        <van-loading
          type="spinner"
          class="text-center py-3"
          v-if="!is_show_qr"
        />
        <img class="m-auto block" v-else :src="qr_img" />
      </van-tab>
    </van-tabs>
    <div
      class="absolute text-tiny_2l underline bottom-2 left-1/2 transform -translate-x-1/2"
      @click="$router.push({ name: 'home' })"
    >
      暂不登录
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      is_show_qr: false,
      qr_img: '',
      active: 0,
      timer: null,
      qr_key: '',
      countdown: 10,
      info: {
        phone: '',
        pass: '',
        mail: '',
        m_pass: ''
      },
      reg: {
        phone: /^(?:(?:\+|00)86)?1\d{10}$/,
        pass: '',
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      }
    }
  },
  // mounted() {
  //   this.inquire_qr_login()
  //   if (this.timer) {
  //     clearInterval(this.timer)
  //   } else {
  //     this.timer = setInterval(() => {
  //       setTimeout(this.inquire_qr_login(), 0)
  //       console.log('刷新' + new Date())
  //     }, 1000 * 1000)
  //   }
  // },

  beforeDestroy() {
    //vue销毁之前
    clearInterval(this.timer)
  },
  methods: {
    onFailed(errorInfo) {
      console.log(errorInfo, '验证不通过')
      this.$toast(errorInfo.errors[0].message)
    },

    async check_status(key) {
      // 检查是否登录
      const res = await this.axios({
        url: `/login/qr/check?key=${key}&timerstamp=${Date.now()}`
        // withCredentials: true
      })
      return res
    },
    async get_login_status() {
      //检查登录状态
      const res = await this.axios({
        url: `/login/status?timerstamp=${Date.now()}`
      })
      console.log('检查登录状态->', res)
      return res
    },
    // !-------------------------------------
    async login(n, t) {
      if (n == 2 && t == '二维码登陆') {
        clearInterval(this.timer)
        // let timer
        // let timestamp = Date.now() //获取时间戳
        // this.get_login_status()
        const res = await this.axios({
          url: `/login/qr/key?timerstamp=${Date.now()}` //获取一个key
          // withCredentials: true
        })
        const key = res.data.unikey
        console.log('🚀 ~151 key', key)
        const res_2 = await this.axios({
          url: `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}` //获取二维码
          // withCredentials: true
        })
        this.qr_img = ''
        this.qr_img = res_2.data.qrimg
        this.is_show_qr = true
        // console.log('🚀 ~ res_2.data.qrimg', res_2.data.qrimg)

        this.timer = setInterval(async () => {
          const status_res = await this.check_status(key) //检查登录状态
          console.log('🚀 ~ status_res', status_res.message, status_res.code)
          //根据返回值确认是否登录成功
          if (status_res.code === 800) {
            console.log('800为二维码过期')
            // this.$toast(status_res.message)
            clearInterval(this.timer)
            // this.login()
          }
          if (status_res.code === 803) {
            // 803为登录成功  放回cookie
            console.log('803为授权登录成功')
            clearInterval(this.timer)
            this.$toast(status_res.message)
            // this.$store.commit('set_info_data', null)
            this.to_login_success(status_res.cookie)
            // await this.get_login_status()
          }
        }, 2000)
      } else {
        clearInterval(this.timer)
      }
    },
    // !-------------------------------------

    mail_submit() {
      this.axios({
        url: '/login',
        method: 'post',
        data: {
          email: this.info.mail,
          password: this.info.m_pass
        }
      }).then((res) => {
        console.log('🚀 ~ res', res)
        this.to_login_success(res.cookie)
      })
    },
    submit() {
      /**
       *必选参数 :
       *phone: 手机号码
       *password: 密码
       *可选参数 :
       *countrycode: 国家码，用于国外手机号登录，例如美国传入：1
       *md5_password: md5加密后的密码,传入后 password 将失效
       *接口地址 : /login/cellphone
       *调用例子 : /login/cellphone?phone=xxx&password=yyy /login/cellphone?phone=xxx&md5_password=yyy
       */
      this.axios({
        method: 'post',
        url: '/login/cellphone',
        data: {
          phone: this.info.phone,
          password: this.info.pass
        }
      }).then((res) => {
        this.$toast(res.msg)
        console.log(res)
        this.to_login_success(res.cookie)
      })
    },
    to_login_success(cookie) {
      // this.$store.commit('set_info_data', null)
      this.$store.commit('UpData_login', true)
      this.$store.commit('set_cookie', cookie)
      this.$router.push({ name: 'user' })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-button {
  color: black !important;
}
</style>
