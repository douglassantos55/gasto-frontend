<template>
  <div class="user">
    <user-picture :picture="user.picture" :size="size" />
    <span class="user__name">{{ user.name }}</span>
  </div>
</template>

<script>
import UserPicture from "@/components/UserPicture.vue";

export default {
  name: "User",
  components: {
    UserPicture,
  },
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
