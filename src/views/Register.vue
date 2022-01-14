<template>
  <h1 class="title">Crie sua conta</h1>

  <form @submit.prevent="submit(register)">
    <form-group :errors="errors.name">
      <label for="register-name">Nome</label>
      <input
        id="register-name"
        v-model="data.name"
        type="text"
        autofocus
        required
      />
    </form-group>

    <form-group :errors="errors.email">
      <label for="register-email">E-mail</label>
      <input
        id="register-email"
        type="email"
        v-model="data.email"
        autofocus
        required
      />
    </form-group>

    <form-group :errors="errors.password">
      <label for="register-password">Senha</label>
      <input
        id="register-password"
        type="password"
        v-model="data.password"
        required
      />
    </form-group>

    <form-group :errors="errors.confirmPassword">
      <label for="register-confirm-password">Confirme a senha</label>
      <input
        id="register-confirm-password"
        type="password"
        v-model="data.confirmPassword"
        required
      />
    </form-group>

    <div class="action">
      <link-button :to="{ name: 'Login' }" hollow>
        Já tenho uma conta
      </link-button>

      <app-button primary rounded type="submit" :disabled="loading">
        Registrar
      </app-button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useForm from "@/composables/useForm";
import AppButton from "@/components/AppButton.vue";
import LinkButton from "@/components/LinkButton.vue";
import FormGroup from "@/components/FormGroup.vue";
import axios, { authenticate, saveTokens } from "@/utils/axios";

export default {
  name: "Register",
  components: {
    AppButton,
    FormGroup,
    LinkButton,
  },
  setup() {
    const router = useRouter();
    const { errors, submit, loading } = useForm();

    const data = ref({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    async function register() {
      const { accessToken, refreshToken } = await axios.post(
        "/users",
        data.value
      );

      saveTokens(accessToken, refreshToken);
      authenticate();

      router.push({ name: "Home" });
    }

    return { data, errors, register, submit, loading };
  },
};
</script>
