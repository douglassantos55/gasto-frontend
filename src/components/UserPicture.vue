<template>
  <img :width="size" :height="size" :src="imageSrc" class="user__image" />
</template>

<script>
export default {
  name: "UserPicture",
  props: {
    picture: {
      type: String,
      default: "placeholder.jpg",
    },
    size: {
      type: Number,
      default: 40,
    },
  },
  computed: {
    imageSrc() {
      if (!this.picture) {
        return "./img/user.jpg";
      }
      return process.env.VUE_APP_STATIC_URL + this.picture;
    },
  },
};
</script>
