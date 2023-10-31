<template>
  <div class="container">
    <div v-for="item in sneakerStore.cart" :key="item.id" class="items">
      <!-- Display item information -->
      <router-link
        :to="{ name: 'sneaker', params: { id: item.id } }"
        class="image-link"
      >
        <img :src="item.imageUrl" alt="Sneaker Image" class="sneaker-image" />
      </router-link>
      <div class="info">
        <router-link
          :to="{ name: 'sneaker', params: { id: item.id } }"
          class="name-link"
        >
          <p>{{ item.name }}</p>
        </router-link>
        <p class="size">Velikost: {{ item.size }}</p>
        <p class="price">{{ item.price }} x {{ item.quantity }}</p>
      </div>
      <div>
        <button @click="removeCartItem(item)" class="delete-btn">
          Odebrat
        </button>
        <img
          src="../assets/sneakerLogo3.PNG"
          alt="delete button"
          class="delete-btn-img"
          @click="removeCartItem(item)"
        />
      </div>
    </div>
    <div v-if="sneakerStore.cart.length > 0" class="finish">
      <p class="total-price-text">
        Celková cena:
        <span class="total-price">{{
          formatPrice(sneakerStore.totalPrice)
        }}</span>
      </p>
      <button class="to-shopping">Pokračovat k nákupu</button>
    </div>
    <div v-else class="empty-cart-msg">Košík je prázdný, přidejte něco...</div>
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
  @media (max-width: 531px) {
    @content;
  }
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @include phone {
    width: 100%;
  }
}
.items {
  display: flex;
  background-color: rgb(228, 228, 228);
  margin: 10px;
  min-width: 80%;
  height: 140px;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 20px;

  @include tablet {
    .image-link {
      display: block;
      padding: 0;
      margin: 0;
      width: 30%;
    }
  }

  .info {
    text-align: left;
    width: 30%;

    @include tablet() {
      width: 40%;
      text-align: left;
    }

    @include phone {
      width: 30%;
    }
    .name-link {
      font-weight: 700;
      font-size: 20px;
      color: black;
      text-decoration: none;

      @include phone {
        font-size: 17px;
      }

      p {
        width: fit-content;
      }
    }
  }

  .sneaker-image {
    width: 150px;
    border-radius: 20px;

    @include tablet() {
      display: block; // делаем изображение блочным
      width: 100%; // устанавливаем ширину изображения в 100%
      height: auto; // позволяет изображению автоматически корректировать свою высоту
      max-width: none; // убедитесь, что у изображения нет ограничения по максимальной ширине
      max-height: none;
    }
  }
}
.delete-btn {
  padding: 10px 30px;
  color: white;
  background-color: black;
  cursor: pointer;
  border: 1px solid transparent;
  transition: border, background-color, color, 0.45s;

  @include phone {
    display: none;
  }

  &:hover {
    border: 1px solid black;
    background-color: white;
    color: black;
  }
}

.delete-btn-img {
  display: none;

  @include phone {
    display: block;
    width: 60px;
  }
}

.finish {
  display: flex;
  align-items: center;
  flex-direction: column;
  .to-shopping {
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
}

.empty-cart-msg {
  font-size: 23px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
