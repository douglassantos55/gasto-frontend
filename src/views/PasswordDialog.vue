<template>
  <form @submit.prevent="submit(change)">
    <app-dialog title="Alterar senha">
      <form-group :errors="errors.oldPassword">
        <label for="change-password-password">Senha atual</label>
        <input
          type="password"
          id="change-password-password"
          v-model="oldPassword"
          ref="input"
        />
      </form-group>

      <form-group :errors="errors.password">
        <label for="change-password-new-password">Nova senha</label>
        <input
          type="password"
          id="change-password-new-password"
          v-model="password"
        />
      </form-group>

      <form-group :errors="errors.confirmPassword">
        <label for="change-password-confirm-new-password"
          >Confirmar nova senha</label
        >
        <input
          type="password"
          id="change-password-confirm-new-password"
          v-model="confirmPassword"
        />
      </form-group>

      <template v-slot:actions>
        <app-button type="submit" primary rounded :disabled="loading">
          Alterar
        </app-button>
      </template>
    </app-dialog>
  </form>
</template>

<script>
import axios from "@/utils/axios";
import AppDialog from "@/components/AppDialog.vue";
import AppButton from "@/components/AppButton.vue";
import FormGroup from "@/components/FormGroup.vue";

import useForm from "@/composables/useForm";

export default {
  name: "PasswordDialog",
  components: {
    AppDialog,
    AppButton,
    FormGroup,
  },
  mounted() {
    this.$refs.input.focus();
  },
  setup() {
    return { ...useForm() };
  },
  data() {
    return {
      password: "",
      oldPassword: "",
      confirmPassword: "",
    };
  },
  methods: {
    async change() {
      const formData = new FormData();
      formData.append("password", this.password);
      formData.append("oldPassword", this.oldPassword);
      formData.append("confirmPassword", this.confirmPassword);

      await axios.put("/users", formData);
      this.$router.back();
    },
  },
};
</script>
