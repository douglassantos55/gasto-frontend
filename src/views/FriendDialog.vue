<template>
  <form @submit.prevent="submit(add)">
    <app-dialog title="Adicionar amigo">
      <form-group :errors="errors.email">
        <label for="friend-email">E-mail de seu amigo</label>
        <input type="email" id="friend-email" v-model="email" />
      </form-group>

      <template v-slot:actions>
        <app-button rounded primary type="submit" :disabled="loading"
          >Adicionar</app-button
        >
      </template>
    </app-dialog>
  </form>
</template>

<script>
import axios from "@/utils/axios";
import useForm from "@/composables/useForm";
import FormGroup from "@/components/FormGroup.vue";
import AppButton from "@/components/AppButton.vue";
import AppDialog from "@/components/AppDialog.vue";

export default {
  name: "FriendDialog",
  components: {
    FormGroup,
    AppButton,
    AppDialog,
  },
  data() {
    return {
      email: "",
    };
  },
  setup() {
    return { ...useForm() };
  },
  methods: {
    async add() {
      await axios.post("/friends", { email: this.email });
      this.$router.back();
    },
  },
};
</script>
