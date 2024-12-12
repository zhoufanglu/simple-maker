<script setup lang="ts">
  const router = useRouter()

  const userStore = useUserStore()
</script>

<template>
  <div class="nav-bar">
    <div class="left-nav">
      <div class="logo">
        <img src="@/assets/imgs/head_logo.png" alt="" />
      </div>
    </div>
    <div class="right-nav">
      <div class="user">
        <i class="iconfont user-icon">&#xe603;</i>
        <div>{{ userStore.userInfo.username }}</div>
      </div>
      <div class="user-operate">
        <el-tooltip class="box-item" effect="dark" content="帮助" placement="bottom-start">
          <i class="iconfont font">&#xe693;</i>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="退出" placement="bottom-start">
          <i class="iconfont font point" @click="userStore.logout()">&#xe67d;</i>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .nav-bar {
    display: flex;
    width: 100%;
    height: var(--nav-bar-height);

    .left-nav {
      height: 100%;
      display: flex;
      align-items: center;
      background: #212834;
      flex: 1 1 100%;

      .logo {
        width: 68px;
        height: 100%;
        background: #212834;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span {
        margin-left: 20px;
        color: #fff;
        font-size: 16px;
      }
    }

    .right-nav {
      height: 100%;
      flex: 0 0 326px;
      padding-right: 24px;
      box-sizing: border-box;
      background: url('@/assets/imgs/top_bar.png') no-repeat;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .user {
        height: 48px;
        display: flex;
        align-items: center;
        color: #fefefe;
        font-size: 14px;
        font-weight: 400;
        margin-right: 24px;

        .user-icon {
          margin-right: 5px;
          font-size: 16px;
        }
      }

      .user-operate {
        display: flex;
        align-items: center;
        gap: 24px;
      }
    }
  }

  .point {
    cursor: pointer;
  }

  .font {
    color: #fefefe;
    font-size: 16px;
  }

  .infinite-list {
    height: 150px;
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: auto;

    li {
      font-size: 16px;
      padding: 2px 0;
      cursor: pointer;

      &:hover {
        background: #f5f5f5;
        color: var(--theme-color);
      }
    }
  }
</style>
