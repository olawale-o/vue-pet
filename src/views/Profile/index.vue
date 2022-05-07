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
import { storeToRefs } from "pinia";
import useAuthUserStore from "@/store/auth";
import usePetStore from "@/store/pet";
import { ProfileSideBar } from "@/components";
export default {
  name: "ProfileView",
  components: {
    ProfileSideBar,
  },
  setup() {
    const { user } = storeToRefs(useAuthUserStore());
    const { loading } = storeToRefs(usePetStore());
    return {
      user,
      loading,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
