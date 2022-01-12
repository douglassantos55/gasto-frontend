<template>
  <h1>Acesse sua conta</h1>
  <form @submit.prevent="login">
    <input type="email" v-model="data.email" />
    <input type="password" v-model="data.password" />

    <button type="submit">Entrar</button>
  </form>
</template>

<script>
import sway from "sweetalert";
import axios, { authenticate, saveTokens } from "@/utils/axios";

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
  async beforeRouteEnter(_to, _from, next) {
    try {
      await axios.head("/auth/user");
      next({ name: "Home" });
    } catch (err) {
      next((vm) => vm.$store.dispatch("stopLoading"));
    }
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
        if (err) {
          sway({
            icon: "error",
            title: "Erro de autenticacao",
            text: "Usuario ou senha invalidos",
          });
        }
      }
    },
  },
};
</script>
