<template>
  <header>
    <router-link custom v-slot="{ navigate, href }" :to="{ name: 'Search' }">
      <app-button hollow circle @click="navigate(href)">
        <span class="icofont-search-2" />
      </app-button>
    </router-link>

    <span className="logo"> Ga<i className="color-secondary">$</i>to </span>

    <app-button circle>
      <img
        width="42"
        height="42"
        src="http://placeimg.com/42/42/people"
        class="user__image"
      />
    </app-button>
  </header>
</template>

<script>
import AppButton from "@/components/AppButton.vue";

export default {
  name: "AppHeader",
  components: {
    AppButton,
  },
};
</script>
