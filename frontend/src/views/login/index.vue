<script setup lang="ts">
  import type { FormInstance, FormRules } from 'element-plus'
  import type { UserFormType } from '@/views/login/types'
  import { login as loginApi } from '@/service/modules/user'
  import Motion from '@/components/motion'

  const userStore = useUserStore()
  const router = useRouter()
  const route = useRoute()

  const loading = ref(false)

  /* -------------登录----------------- */
  const rules: FormRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  }
  const loginForm = ref<UserFormType>({
    username: '',
    password: '',
  })
  const loginFormRef = ref<FormInstance>()

  async function login() {
    if (loginFormRef.value) {
      const valid = await loginFormRef.value.validate()
      if (valid) {
        // handle success
        const { username, password } = loginForm.value
        loading.value = true
        await loginApi({
          username,
          password,
        })
        loading.value = false
        userStore.setUserInfo({
          username: username,
          password,
          token: 'aaa',
        })
        await router.push('/')
      }
    }
  }

  /* -------------填充密码----------------- */
  function fillPassword() {
    if (userStore.isRemember) {
      loginForm.value = {
        username: userStore.userInfo.username || '',
        password: userStore.userInfo.password || '',
      }
    }
  }

  onMounted(() => {
    fillPassword()
  })
</script>

<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/imgs/login/logo.png" alt="" />
    </div>
    <div class="login-content">
      <div class="form">
        <Motion><div class="title"> 用户登录 </div></Motion>
        <el-form ref="loginFormRef" :model="loginForm" :rules="rules" style="margin: 0 20px">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名">
              <template #prefix>
                <i class="iconfont icon-blue">&#xe603;</i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password>
              <template #prefix>
                <i class="iconfont icon-blue">&#xe68a;</i>
              </template>
            </el-input>
          </el-form-item>
          <Motion>
            <el-form-item>
              <el-button :loading="loading" type="primary" class="login-btn" @click="login">
                登录
              </el-button>
            </el-form-item>
          </Motion>

          <el-form-item>
            <div class="remember">
              <el-checkbox v-model="userStore.isRemember" label="记住密码" style="color: #515a6e" />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .login {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/imgs/login/login_backgroud.png') no-repeat;
    position: relative;

    .logo {
      position: absolute;
      top: 20px;
      left: 20px;

      img {
        height: 62px;
        width: auto;
      }
    }

    .login-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: center;

      .form {
        width: 440px;
        background: #fff;
        border-radius: 4px;
        box-shadow: -6px 0 49px 6px rgb(0 0 0 / 25%);
        margin-right: 10%;

        :deep(.el-form-item) {
          margin-bottom: 24px;
        }

        .title {
          text-align: center;
          color: #5386ed;
          margin: 50px 0;
          letter-spacing: 0.75px;
          font-size: 30px;
          font-weight: 700;
        }

        .remember {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          span {
            color: #606266;
            cursor: pointer;

            &:hover {
              color: #677cfd;
            }
          }
        }

        .login-btn {
          width: 100%;
        }
      }
    }
  }
</style>
