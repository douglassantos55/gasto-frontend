<template>
  <div class="user">
    <img
      :width="size"
      :height="size"
      class="user__image"
      src="http://placeimg.com/40/40/people"
    />
    <span class="user__name">{{ user.name }}</span>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {
    user: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 40,
    },
  },
};
</script>
