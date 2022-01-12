<template>
  <h1>Acesse sua conta</h1>
  <form @submit.prevent="login">
    <input type="email" v-model="data.email" />
    <input type="password" v-model="data.password" />

    <button type="submit">Entrar</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAlert from "@/composables/useAlert";
import axios, { authenticate, saveTokens } from "@/utils/axios";

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const { error } = useAlert();

    const data = ref({
      email: "",
      password: "",
    });

    async function login() {
      try {
        const { accessToken, refreshToken } = await axios.post(
          "/auth/login",
          data.value
        );

        saveTokens(accessToken, refreshToken);
        authenticate();

        router.push({ name: "Home" });
      } catch (err) {
        if (err) {
          error("Erro de autenticacao", "Usuario ou senha invalidos");
        }
      }
    }

    return { data, login };
  },
  async beforeRouteEnter(_to, _from, next) {
    try {
      await axios.head("/auth/user");
      next({ name: "Home" });
    } catch (err) {
      next((vm) => vm.$store.dispatch("stopLoading"));
    }
  },
};
</script>
