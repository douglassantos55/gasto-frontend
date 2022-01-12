<template>
  <header>
    <router-link custom v-slot="{ navigate, href }" :to="{ name: 'Search' }">
      <app-button hollow circle @click="navigate(href)">
        <span class="icofont-search-2" />
      </app-button>
    </router-link>

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
      <router-link
        custom
        v-slot="{ navigate, href }"
        :to="{ name: 'PasswordDialog' }"
      >
        <button
          type="button"
          class="menu__item"
          role="menuitem"
          @click="navigate(href)"
        >
          <span class="icofont-lock" /> Alterar senha
        </button>
      </router-link>

      <router-link
        custom
        v-slot="{ navigate, href }"
        :to="{ name: 'FriendsDialog' }"
      >
        <button
          type="button"
          class="menu__item"
          role="menuitem"
          @click="navigate(href)"
        >
          <span class="icofont-users" /> Amigos
        </button>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import AppButton from "@/components/AppButton.vue";

export default {
  name: "AppHeader",
  components: {
    AppButton,
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
