<template>
  <div class="container" v-if="sneaker && Object.keys(sneaker).length > 0">
    <div>
      <div v-if="sneaker.imageUrl" class="images">
        <img
          :src="currentMainImage"
          alt="image of sneaker"
          class="sneaker-img"
        />
        <div class="mini-images" v-if="sneaker.imageUrl">
          <img
            :src="sneaker.imageUrl.mainImage"
            alt="image of sneaker"
            class="mini-images"
            @click="updateMainImage(sneaker.imageUrl.mainImage)"
          />
          <img
            :src="sneaker.imageUrl.image"
            alt="image of sneaker"
            class="mini-images"
            @click="updateMainImage(sneaker.imageUrl.mainImage)"
          />
          <img
            :src="sneaker.imageUrl.image1"
            alt="image of sneaker"
            class="mini-images"
            @click="updateMainImage(sneaker.imageUrl.mainImage)"
          />
        </div>
      </div>
    </div>
    <div class="info" v-if="sneaker">
      <p class="description">{{ sneaker.desc }}</p>
      <p class="name">{{ sneaker.name }}</p>
      <p class="price">{{ formatPrice(sneaker.price) }}</p>
      <p class="size-text">Velikosti EU</p>
      <div v-for="size in sneaker.sizes" :key="size" class="size">
        <label class="button-label" :class="{ active: activeSize === size }">
          <input type="radio" :value="size" v-model="activeSize" />
          {{ size }}
        </label>
      </div>
      <br />
      <br />
      <div v-if="showError" class="error-message">
        Please select a size before adding to the cart.
      </div>
      <p>Množství:</p>
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        max="100"
        v-model="quantity"
      />
      <button class="add-to-cart-btn" @click="addToCart">
        Přidat do košíku
      </button>
    </div>
  </div>
  <div v-else class="loading">Načítání...</div>
</template>

<script lang="ts" setup>
import type { Sneaker } from "../components/SneakerBox.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { formatPrice } from "../utils/sneakerUtils";
import { useSneakerStore, type CartItem } from "../stores/sneakerStore";

const sneaker = ref<Sneaker | null>(null);
const route = useRoute();
const currentMainImage = ref("");
const sneakerStore = useSneakerStore();

const quantity = ref(1);
const activeSize = ref(0);
const showError = ref(false);

watch(activeSize, (newSize) => {
  sneakerStore.setChosenSize(newSize);
});
watch(quantity, (quantity) => {
  sneakerStore.setQuantity(quantity);
});

const addToCart = () => {
  const quantityValue = quantity.value ?? 0;
  const selectedSneaker = sneaker.value;

  if (!activeSize.value) {
    showError.value = true;
  } else {
    const cartItem: CartItem = {
      id: sneaker.value?.id,
      imageUrl: sneaker.value?.imageUrl.mainImage,
      name: sneaker.value?.name || "",
      price: sneaker.value?.price || 0,
      size: activeSize.value,
      quantity: quantityValue,
    };

    sneakerStore.addToCart(cartItem); // Add the item to the cart
    showError.value = false;
  }
};

console.log(sneakerStore.chosenSize);

const updateMainImage = (newImage: string) => {
  currentMainImage.value = newImage;
};

const fetchData = async () => {
  const response = await fetch(
    `https://6468f45a03bb12ac2082ccee.mockapi.io/sneakers/${route.params.id}`
  );
  const data = await response.json();
  sneaker.value = data;

  if (data.imageUrl && data.imageUrl.mainImage) {
    currentMainImage.value = data.imageUrl.mainImage;
  }
};
fetchData();
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .images {
    display: flex;
    flex-direction: column;
    align-items: center;

    .sneaker-img {
      width: 100%;
      max-width: 500px;
      cursor: pointer;
    }

    .mini-images {
      display: flex;
      justify-content: center;
      width: 100px; /* Adjust the width of the mini-images as needed */
      margin: 5px 10px;

      img {
        cursor: pointer;
      }
    }
  }

  .info {
    text-align: left;
    padding: 30px;

    .name {
      font-size: 25px;
      margin: 0;
      font-weight: 700;
    }

    .price {
      font-size: 21px;
      font-weight: 700;
    }

    .size-text {
      font-size: 14px;
    }

    .size {
      display: inline-block;
      margin-right: 10px;

      .button-label {
        background-color: white;
        color: black;
        border: 1px solid transparent;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin: 4px;

        &:hover {
          border: 1px solid black;
          /* Style when hovered */
        }

        &.active {
          background-color: #000;
          color: white;
        }

        input[type="radio"] {
          display: none; /* Hide the checkbox */
        }
      }
    }

    #quantity {
      width: 33px;
      height: 38px;
      margin-right: 10px;
    }

    .add-to-cart-btn {
      padding: 10px 40px;
      color: white;
      background-color: black;
      font-size: 17px;
      cursor: pointer;
    }

    .error-message {
      color: red;
      font-size: 17px;
    }
  }
}
.loading {
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
