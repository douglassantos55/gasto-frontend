import { ref } from "vue";

const loading = ref(false);

async function wait(callback) {
  try {
    loading.value = true;
    await callback();
  } finally {
    loading.value = false;
  }
}

export default function () {
  return { wait, loading };
}
