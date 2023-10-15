<template>
  <SneakerBox />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SneakerBox from "../components/SneakerBox.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    SneakerBox,
  },
});
</script>
