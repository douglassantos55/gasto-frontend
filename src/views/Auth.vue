<template>
  <header>
    <span className="logo logo--center">
      Ga<i className="color-secondary">$</i>to
    </span>
  </header>

  <main>
    <router-view />
  </main>
</template>

<script>
import axios from "@/utils/axios";

export default {
  name: "Auth",
  async beforeRouteEnter(_to, _from, next) {
    try {
      await axios.head("/auth/user");
      next({ name: "Home" });
    } catch (err) {
      next();
    }
  },
};
</script>
