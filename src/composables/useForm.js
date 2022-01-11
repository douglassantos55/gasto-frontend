import { ref } from "vue";

export default function () {
  const errors = ref({});
  const loading = ref(false);

  async function submit(callback) {
    try {
      errors.value = {};
      loading.value = true;

      await callback();
    } catch (err) {
      if (err) {
        errors.value = err;
      }
    } finally {
      loading.value = false;
    }
  }

  return { errors, submit, loading };
}
