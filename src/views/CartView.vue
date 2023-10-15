<template>
  <div v-for="item in sneakerStore.cart" :key="item.id">
    <!-- Display item information -->
    <img :src="item.imageUrl" alt="Sneaker Image" class="sneaker-image" />
    <p>{{ item.name }}</p>
    <p>Price: {{ item.price }}</p>
    <p>Size: {{ item.size }}</p>
    <p>Quantity: {{ item.quantity }}</p>
    <button @click="removeCartItem(item)">Delete</button>
  </div>
</template>

<script lang="ts" setup>
import { useSneakerStore } from "../stores/sneakerStore";

const sneakerStore = useSneakerStore();
const removeCartItem = sneakerStore.removeCartItem;
</script>
