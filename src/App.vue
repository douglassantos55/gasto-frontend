<template>
  <router-view />

  <div class="loader" v-if="loading">
    <loading white />
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import useLoader from "@/composables/useLoader";

export default {
  name: "App",
  components: {
    Loading,
  },
  setup() {
    const { loading } = useLoader();
    return { loading };
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
  background: rgba(0, 0, 0, 0.55);
}
</style>
