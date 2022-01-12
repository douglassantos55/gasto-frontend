<template>
  <header>
    <link-button hollow circle :to="{ name: 'Search' }" v-if="!searching">
      <span class="icofont-search-2" />
    </link-button>

    <link-button hollow circle :to="{ name: 'Home' }" v-else>
      <span class="icofont-arrow-left" />
    </link-button>

    <span className="logo"> Ga<i className="color-secondary">$</i>to </span>

    <app-button circle @click="menuVisible = !menuVisible" v-if="user">
      <user-picture :picture="user.picture" :size="42" />
    </app-button>

    <div
      class="menu user-menu menu--caret-top menu--caret-right"
      v-if="menuVisible"
    >
      <link-button
        type="button"
        class="menu__item"
        role="menuitem"
        :to="{ name: 'PasswordDialog' }"
      >
        <span class="icofont-lock" /> Alterar senha
      </link-button>

      <app-button
        type="button"
        class="menu__item"
        role="menuitem"
        @click="$refs.picture.click()"
      >
        <input
          type="file"
          accept="image/*"
          style="display: none"
          @change="upload"
          ref="picture"
        />
        <span class="icofont-ui-camera" /> Alterar foto
      </app-button>

      <link-button
        type="button"
        class="menu__item"
        role="menuitem"
        :to="{ name: 'FriendsDialog' }"
      >
        <span class="icofont-users" /> Amigos
      </link-button>
    </div>
  </header>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore, mapState } from "vuex";

import axios from "@/utils/axios";
import useAlert from "@/composables/useAlert";
import AppButton from "@/components/AppButton.vue";
import LinkButton from "@/components/LinkButton.vue";
import UserPicture from "@/components/UserPicture.vue";

export default {
  name: "AppHeader",
  components: {
    AppButton,
    LinkButton,
    UserPicture,
  },
  computed: {
    searching() {
      return !!this.$route.query.term;
    },
    ...mapState(["user"]),
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const menuVisible = ref(false);
    const { wait, success } = useAlert();

    watch(route, () => (menuVisible.value = false));

    async function upload(evt) {
      menuVisible.value = false;
      const formData = new FormData();
      formData.append("picture", evt.target.files[0]);

      wait(
        "Alterando, por favor aguarde",
        "Upload de arquivos demoram um pouco mesmo, fazer o que..."
      );

      const user = await axios.put("/users", formData);

      store.dispatch("setUser", user);
      success("Foto alterada com sucesso", "Sua foto foi alterada com sucesso");
    }

    return { upload, menuVisible };
  },
};
</script>
