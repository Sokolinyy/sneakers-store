<template>
  <div class="container">
    <div v-for="item in sneakerStore.cart" :key="item.id" class="items">
      <!-- Display item information -->
      <router-link :to="{ name: 'sneaker', params: { id: item.id } }">
        <img :src="item.imageUrl" alt="Sneaker Image" class="sneaker-image" />
      </router-link>
      <div class="info">
        <router-link
          :to="{ name: 'sneaker', params: { id: item.id } }"
          class="name"
        >
          <p>{{ item.name }}</p>
        </router-link>
        <p class="size">Size: {{ item.size }}</p>
        <p class="price">{{ item.price }} x {{ item.quantity }}</p>
      </div>
      <div>
        <button @click="removeCartItem(item)" class="delete-btn">Delete</button>
      </div>
    </div>
    <p class="total-price-text">
      Total price:
      <span class="total-price">{{
        formatPrice(sneakerStore.totalPrice)
      }}</span>
    </p>
    <button class="delete-btn">Proceed to purchase</button>
  </div>
</template>

<script lang="ts" setup>
import { formatPrice } from "@/utils/sneakerUtils";
import { useSneakerStore } from "../stores/sneakerStore";

const sneakerStore = useSneakerStore();
const removeCartItem = sneakerStore.removeCartItem;

sneakerStore.updateTotalPrice();
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.items {
  display: flex;
  background-color: rgb(228, 228, 228);
  margin: 10px;
  width: 70%;
  height: 140px;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 20px;

  .info {
    text-align: left;
    width: 30%;
    .name {
      font-weight: 700;
      font-size: 20px;
      color: black;
      text-decoration: none;

      p {
        width: fit-content;
      }
    }
  }

  .sneaker-image {
    width: 150px;
    border-radius: 20px;
  }
}
.delete-btn {
  padding: 10px 30px;
  color: white;
  background-color: black;
  cursor: pointer;
  border: 1px solid transparent;
  transition: border, background-color, color, 0.45s;

  &:hover {
    border: 1px solid black;
    background-color: white;
    color: black;
  }
}

.total-price-text {
  font-size: 22px;

  .total-price {
    font-weight: 700;
  }
}
</style>
