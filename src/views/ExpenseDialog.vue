<template>
  <form @submit.prevent="save">
    <app-dialog :title="title">
      <template v-if="type === 'emprestimo' && !expense.friend_id">
        <p>Emprestimo para</p>

        <loading v-if="!friends" />

        <div class="friend" v-for="friend in friends" :key="friend.id" v-else>
          <user :user="friend" @click="selectedFriend = friend" />
        </div>
      </template>

      <template v-if="type === 'normal' || expense.friend_id">
        <div class="selected-friend" v-if="selectedFriend">
          <user :user="selectedFriend" />

          <app-button small rounded @click="selectedFriend = null">
            Alterar
          </app-button>
        </div>

        <div class="form-group">
          <label for="expense-date">Data</label>
          <input type="date" id="expense-date" v-model="expense.date" />
          <p class="error" v-for="(error, idx) in errors.date" :key="idx">
            {{ error }}
          </p>
        </div>

        <div class="form-group">
          <label for="expense-description">Descricao</label>
          <input
            type="text"
            id="expense-description"
            v-model="expense.description"
            ref="descInput"
          />
          <p
            class="error"
            v-for="(error, idx) in errors.description"
            :key="idx"
          >
            {{ error }}
          </p>
        </div>

        <div class="form-group">
          <label for="expense-total">Valor</label>
          <money-input id="expense-total" v-model="expense.total" />
          <p class="error" v-for="(error, idx) in errors.total" :key="idx">
            {{ error }}
          </p>
        </div>
      </template>

      <template v-slot:actions v-if="type === 'normal' || expense.friend_id">
        <app-button primary rounded type="submit" :disable="loading">
          Salvar
        </app-button>
      </template>
    </app-dialog>
  </form>
</template>

<script>
import axios from "@/utils/axios";
import User from "@/components/User.vue";
import Loading from "@/components/Loading.vue";
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
  components: {
    User,
    Loading,
    AppDialog,
    AppButton,
    MoneyInput,
  },
  data() {
    return {
      errors: {},
      friends: null,
      loading: false,
      selectedFriend: this.initial.friend,
      expense: { ...this.initial },
    };
  },
  async beforeRouteEnter(to) {
    if (to.params.id) {
      const data = await axios.get(`/expenses/${to.params.id}`);

      to.params.initial = {};
      Object.keys(data).forEach((key) => {
        const value = data[key];

        if (value) {
          to.params.initial[key] = value;
        }
      });
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
      try {
        this.loading = true;

        if (this.expense.id) {
          await axios.put(`/expenses/${this.expense.id}`, this.expense);
        } else {
          await axios.post("/expenses", this.expense);
        }

        this.refresh();
        this.loading = false;
        this.$router.back();
      } catch (err) {
        this.errors = err;
      }
    },
  },
  computed: {
    title() {
      return this.type === "normal" ? "Despesa" : "Emprestimo";
    },
  },
};
</script>
