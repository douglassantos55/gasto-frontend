<template>
  <router-view />

  <div class="loader" v-if="loading">
    <loading />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "@/components/Loading.vue";

export default {
  name: "App",
  components: {
    Loading,
  },
  computed: {
    ...mapState(["loading"]),
  },
};
</script>

<style scoped>
.loader {
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  height: 100vh;
  position: fixed;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>
