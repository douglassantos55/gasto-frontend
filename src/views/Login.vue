<template>
  <h1 class="title">Acesse sua conta</h1>

  <form @submit.prevent="submit(login)">
    <form-group>
      <label for="login-email">E-mail</label>
      <input
        id="login-email"
        type="email"
        v-model="data.email"
        autofocus
        required
      />
    </form-group>

    <form-group>
      <label for="login-password">Senha</label>
      <input
        id="login-password"
        type="password"
        v-model="data.password"
        required
      />
    </form-group>

    <div class="action">
      <link-button :to="{ name: 'Register' }" hollow>
        Criar uma conta
      </link-button>

      <app-button primary rounded type="submit" :disabled="loading">
        Entrar
      </app-button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useForm from "@/composables/useForm";
import useAlert from "@/composables/useAlert";
import AppButton from "@/components/AppButton.vue";
import LinkButton from "@/components/LinkButton.vue";
import FormGroup from "@/components/FormGroup.vue";
import axios, { authenticate, saveTokens } from "@/utils/axios";

export default {
  name: "Login",
  components: {
    AppButton,
    FormGroup,
    LinkButton,
  },
  setup() {
    const router = useRouter();
    const { error } = useAlert();
    const { submit, loading } = useForm();

    const data = ref({ email: "", password: "" });

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
          error("Erro de autenticação", "Usuário ou senha inválidos");
        }
      }
    }

    return { data, login, submit, loading };
  },
};
</script>
