<template lang="">
  <div class="grid-container">
    <ul class="sneakers" v-if="sneakers">
      <li v-for="sneaker in sneakers" :key="sneaker.id">
        <div class="sneaker-item">
          <router-link
            :to="{ name: 'sneaker', params: { id: sneaker.id } }"
            class="sneaker-link"
          >
            <img :src="sneaker.imageUrl.mainImage" alt="" class="sneaker-img" />
            <p class="sneaker-name">{{ sneaker.name }}</p>
          </router-link>
          <p class="sneaker-desc">{{ sneaker.desc }}</p>
          <p class="sneaker-price">{{ formatPrice(sneaker.price) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { formatPrice } from "@/utils/sneakerUtils";

export interface Sneaker {
  id: number;
  name: string;
  price: number;
  desc: string;
  imageUrl: {
    mainImage: string;
    image: string;
    image1: string;
  };
  sizes: number[];
}

const sneakers = ref<Sneaker[]>([]);

const fetchData = async () => {
  const response = await fetch(
    "https://6468f45a03bb12ac2082ccee.mockapi.io/sneakers"
  );
  const data = await response.json();
  sneakers.value = data;
};
fetchData();
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&family=Roboto:wght@400;500;700;900&display=swap");

.grid-container {
  width: 80%;
  margin: auto;
  .sneakers {
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    list-style: none;
    text-align: left;

    .sneaker-item {
      border: 1px solid transparent;
      grid-column: span 1;
      border-radius: 10px;

      &:hover {
        background-color: white;
        border: 1px solid rgb(203, 203, 203);
      }

      .sneaker-link {
        color: black;
        text-decoration: none;
      }

      .sneaker-img {
        width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 10px;
        cursor: pointer;
      }

      .sneaker-name {
        font-size: 17px;
        font-weight: 600;
        cursor: pointer;
      }

      .sneaker-price {
        margin-top: 40px;
        font-weight: 800;
        font-size: 18px;
      }
    }

    p {
      margin: 10px;
    }
  }
}
</style>
