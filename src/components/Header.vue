<template lang="">
  <nav class="header">
    <router-link to="/" class="logo">
      <p>Sneakers</p>
    </router-link>
    <div class="sex">
      <h3 class="category">OBUV</h3>
    </div>
    <router-link to="/cart" class="cart">
      <i class="mdi mdi-cart"></i>
      <div v-if="sneakerStore.cart.length" class="quantity">
        {{ sneakerStore.cart.length }}
      </div>
    </router-link>
  </nav>
</template>

<script lang="ts" setup>
import { useSneakerStore } from "@/stores/sneakerStore";

const sneakerStore = useSneakerStore();
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  width: 100%;

  .logo {
    color: black;
    text-decoration: none;
    font-size: 25px;
  }

  .home-link {
    color: black;
    text-decoration: none;
  }

  .sex {
    display: flex;

    .category {
      background-color: black;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .cart {
    position: relative;
    .mdi {
      font-size: 30px;
      cursor: pointer;
      color: black;
    }

    .quantity {
      position: absolute;
      top: -7px;
      left: 20px;
      background-color: black;
      color: white;
      height: 15px;
      width: 15px;
      border-radius: 10px;
      font-size: 12px;
    }
  }
}
</style>
