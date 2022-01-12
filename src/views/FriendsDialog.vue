<template>
  <app-dialog title="Amigos" cancel="Fechar">
    <loading v-if="!friends" />

    <div
      class="friend"
      v-for="friend in friends"
      :key="friend.id"
      v-else-if="friends.length > 0"
    >
      <user :user="friend" />

      <div class="actions">
        <app-button circle danger @click="remove(friend.id)">
          <span class="icofont-bin" />
        </app-button>
      </div>
    </div>

    <p v-else>Voce nao possui nenhum amigo</p>

    <template v-slot:actions>
      <link-button :to="{ name: 'FriendDialog' }" rounded primary>
        Adicionar
      </link-button>
    </template>
  </app-dialog>
</template>

<script>
import axios from "@/utils/axios";
import User from "@/components/User.vue";
import Loading from "@/components/Loading.vue";
import AppButton from "@/components/AppButton.vue";
import LinkButton from "@/components/LinkButton.vue";
import AppDialog from "@/components/AppDialog.vue";

export default {
  name: "FriendsDialog",
  components: {
    User,
    Loading,
    AppButton,
    AppDialog,
    LinkButton,
  },
  data() {
    return {
      friends: null,
    };
  },
  async created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.friends = await axios.get("/friends");
    },
    async remove(id) {
      await axios.delete(`/friends/${id}`);
      this.friends = null;
      this.fetch();
    },
  },
};
</script>
