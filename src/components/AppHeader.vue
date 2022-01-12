<template>
  <header>
    <link-button hollow circle :to="{ name: 'Search' }">
      <span class="icofont-search-2" />
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
import sway from "sweetalert";
import { mapState } from "vuex";
import axios from "@/utils/axios";
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
  data() {
    return {
      menuVisible: false,
    };
  },
  watch: {
    $route: function () {
      this.menuVisible = false;
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async upload(evt) {
      this.menuVisible = false;
      const formData = new FormData();
      formData.append("picture", evt.target.files[0]);

      sway({
        icon: "info",
        title: "Alterando, por favor aguarde",
        text: "Upload de arquivos demoram um pouco mesmo, fazer o que...",
        buttons: false,
        closeOnEsc: false,
        closeOnClickOutside: false,
      });

      const user = await axios.put("/users", formData);

      this.$store.dispatch("setUser", user);

      sway({
        icon: "success",
        title: "Foto alterada com sucesso",
        text: "Sua foto foi alterada com sucesso",
      });
    },
  },
};
</script>
