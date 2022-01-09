<template>
  <h1>Acesse sua conta</h1>
  <form @submit.prevent="login">
    <input type="email" v-model="data.email" />
    <input type="password" v-model="data.password" />

    <button type="submit">Entrar</button>
  </form>
</template>

<script>
import axios, { authenticate, saveTokens } from "@/axios";

export default {
  name: "Login",
  data() {
    return {
      data: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const { accessToken, refreshToken } = await axios.post(
          "/auth/login",
          this.data
        );
        saveTokens(accessToken, refreshToken);
        authenticate();
        this.$router.push({ name: "Home" });
      } catch (err) {
        alert(err);
      }
    },
  },
};
</script>
