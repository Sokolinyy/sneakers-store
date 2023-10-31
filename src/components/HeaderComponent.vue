<template lang="">
  <nav class="header">
    <router-link to="/" class="logo">
      <p>Tenisky</p>
      <img src="../assets/sneakerLogo3.PNG" alt="" />
    </router-link>
    <Search />
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

import Search from "./SearchBox.vue";

const sneakerStore = useSneakerStore();
</script>

<style lang="scss">
@mixin laptop {
  @media (max-width: 1024px) {
    @content;
  }
}

@mixin tablet {
  @media (max-width: 768px) {
    @content;
  }
}

@mixin phone {
  @media (max-width: 530px) {
    @content;
  }
}

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

  @include phone {
    justify-content: space-around;
    padding: 10px;
  }

  .logo {
    color: black;
    text-decoration: none;
    font-size: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 90px;

      @include phone {
        width: 40px;
      }
    }

    @include phone {
      font-size: 13px;
    }
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
    display: flex;
    align-items: center;
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
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
