<template>
  <header>
    <link-button hollow circle :to="{ name: 'Search' }">
      <span class="icofont-search-2" />
    </link-button>

    <span className="logo"> Ga<i className="color-secondary">$</i>to </span>

    <app-button circle @click="menuVisible = !menuVisible">
      <img
        width="42"
        height="42"
        src="http://placeimg.com/42/42/people"
        class="user__image"
      />
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
import { mapState } from "vuex";
import AppButton from "@/components/AppButton.vue";
import LinkButton from "@/components/LinkButton.vue";

export default {
  name: "AppHeader",
  components: {
    AppButton,
    LinkButton,
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
};
</script>
