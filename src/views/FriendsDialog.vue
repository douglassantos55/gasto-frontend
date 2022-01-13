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

    <p v-else>Você não possui nenhum amigo</p>

    <template v-slot:actions>
      <link-button :to="{ name: 'FriendDialog' }" rounded primary>
        Adicionar
      </link-button>
    </template>
  </app-dialog>
</template>

<script>
import { ref } from "vue";
import axios from "@/utils/axios";
import User from "@/components/User.vue";
import Loading from "@/components/Loading.vue";
import AppButton from "@/components/AppButton.vue";
import LinkButton from "@/components/LinkButton.vue";
import AppDialog from "@/components/AppDialog.vue";
import useAlert from "@/composables/useAlert";

export default {
  name: "FriendsDialog",
  components: {
    User,
    Loading,
    AppButton,
    AppDialog,
    LinkButton,
  },
  setup() {
    const friends = ref(null);
    const { confirm } = useAlert();

    async function fetch() {
      friends.value = await axios.get("/friends");
    }

    async function remove(id) {
      confirm(
        "Excluir amigo?",
        "Esta ação não poderá ser desfeita",
        async () => {
          await axios.delete(`/friends/${id}`);
          friends.value = null;
          fetch();
        }
      );
    }

    fetch();
    return { friends, fetch, remove };
  },
};
</script>
