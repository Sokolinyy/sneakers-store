<template lang="">
  <input
    class="input-field"
    type="text"
    placeholder="Hledat..."
    v-model="internalSearchTerm"
    @input="updateSearchTerm"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useSneakerStore } from "@/stores/sneakerStore";
const sneakerStore = useSneakerStore();
const internalSearchTerm = ref(sneakerStore.searchTerm);

const updateSearchTerm = () => {
  sneakerStore.setSearchTerm(internalSearchTerm.value);
};
</script>
<style lang="scss" scoped>
.input-field {
  border: 1px solid rgb(190, 190, 190);
  padding: 13px 30px;
  width: 20%;
  font-size: 16px;
}
</style>
