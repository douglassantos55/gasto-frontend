<template>
  <form @submit.prevent="submit(save)">
    <app-dialog :title="title">
      <template v-if="type === 'emprestimo' && !expense.friend_id">
        <p>Emprestimo para</p>

        <loading v-if="!friends" />

        <div
          class="friend"
          v-for="friend in friends"
          :key="friend.id"
          v-else-if="friends.length > 0"
        >
          <user :user="friend" @click="selectedFriend = friend" />
        </div>

        <p v-else>Voce nao possui nenhum amigo</p>
      </template>

      <template v-if="type === 'normal' || expense.friend_id">
        <div class="selected-friend" v-if="selectedFriend">
          <user :user="selectedFriend" />

          <app-button small rounded @click="selectedFriend = null">
            Alterar
          </app-button>
        </div>

        <form-group :errors="errors.date">
          <label for="expense-date">Data</label>
          <input type="date" id="expense-date" v-model="expense.date" />
        </form-group>

        <form-group :errors="errors.description">
          <label for="expense-description">Descricao</label>
          <input
            type="text"
            id="expense-description"
            v-model="expense.description"
            ref="descInput"
          />
        </form-group>

        <form-group :errors="errors.total">
          <label for="expense-total">Valor</label>
          <money-input id="expense-total" v-model="expense.total" />
        </form-group>
      </template>

      <template v-slot:actions v-if="type === 'normal' || expense.friend_id">
        <app-button primary rounded type="submit" :disabled="loading">
          Salvar
        </app-button>
      </template>
    </app-dialog>
  </form>
</template>

<script>
import store from "@/store";
import axios from "@/utils/axios";
import useForm from "@/composables/useForm";

import User from "@/components/User.vue";
import Loading from "@/components/Loading.vue";
import FormGroup from "@/components/FormGroup.vue";
import AppButton from "@/components/AppButton.vue";
import AppDialog from "@/components/AppDialog.vue";
import MoneyInput from "@/components/MoneyInput.vue";

export default {
  name: "ExpenseDialog",
  inject: ["refresh"],
  props: {
    type: {
      type: String,
      default: "normal",
    },
    initial: {
      type: Object,
      default: (props) => ({
        description: "",
        total: null,
        type: props.type,
        date: new Date().toISOString().slice(0, 10),
      }),
    },
  },
  setup() {
    return { ...useForm() };
  },
  components: {
    User,
    Loading,
    FormGroup,
    AppDialog,
    AppButton,
    MoneyInput,
  },
  data() {
    return {
      friends: null,
      expense: { ...this.initial },
      selectedFriend: this.initial.friend,
    };
  },
  async beforeRouteEnter(to) {
    try {
      if (to.params.id) {
        store.dispatch("loading");
        const data = await axios.get(`/expenses/${to.params.id}`);

        to.params.initial = {};
        Object.keys(data).forEach((key) => {
          const value = data[key];

          if (value) {
            to.params.initial[key] = value;
          }
        });
      }
    } finally {
      store.dispatch("stopLoading");
    }
  },
  async created() {
    if (this.type === "emprestimo") {
      this.friends = await axios.get("/friends");
    }
  },
  mounted() {
    if (this.$refs.descInput) {
      this.$refs.descInput.focus();
    }
  },
  watch: {
    selectedFriend(friend) {
      if (friend) {
        this.expense.friend_id = friend.id;
      } else {
        this.expense.friend_id = null;
      }
    },
  },
  methods: {
    async save() {
      if (this.expense.id) {
        await axios.put(`/expenses/${this.expense.id}`, this.expense);
      } else {
        await axios.post("/expenses", this.expense);
      }

      this.refresh();
      this.$router.back();
    },
  },
  computed: {
    title() {
      return this.type === "normal" ? "Despesa" : "Emprestimo";
    },
  },
};
</script>
