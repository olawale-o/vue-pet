<template>
  <div class="profile">
    <div class="content">
      <div class="main">
        <ProfileSideBar :userId="user.id" />
        <div class="outlet">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import useAuthUserStore from '@/store/authUserStore';
export default {
  name: "ProfileView",
  components: {
    ProfileSideBar,
  },
  setup() {
    const { user } = storeToRefs(useAuthUserStore());
    return {
      user,
    }
  },
}
</script>

<style scoped>
  @import './style.css';
</style>