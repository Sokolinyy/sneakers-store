<template lang="">
  <div class="container" v-if="sneakers.length">
    <div v-if="filteredSneakers.length > 0">
      <label>
        <input type="checkbox" v-model="showMan" @change="filterSneakers" />
        Muži
      </label>
      <label>
        <input type="checkbox" v-model="showWoman" @change="filterSneakers" />
        Ženy
      </label>
    </div>
    <div v-if="filteredSneakers.length === 0" class="not-found-msg">
      <p>Nic nebylo nalezeno, zkuste změnit dotaz</p>
    </div>
    <ul class="sneakers" v-if="sneakers">
      <li v-for="sneaker in filteredSneakers" :key="sneaker.id">
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
  <div v-else class="loading">Načítání...</div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { formatPrice } from "@/utils/sneakerUtils";
import { useSneakerStore } from "@/stores/sneakerStore";

const sneakerStore = useSneakerStore();

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
  sex: string;
}

const showMan = ref(false); // Initially, show "man" items
const showWoman = ref(false); // Initially, show "woman" items
const sneakers = ref<Sneaker[]>([]);

// Filter sneakers by gender and search result
const filteredSneakers = computed(() => {
  const filtered = sneakers.value.filter((sneaker) => {
    const matchesSearchTerm = sneaker.name
      .toLowerCase()
      .includes(sneakerStore.searchTerm.toLowerCase());

    if (!matchesSearchTerm) {
      return false;
    }

    if (!showMan.value && !showWoman.value) {
      return true; // Show all sneakers
    } else if (showMan.value && sneaker.sex === "man") {
      return true; // Show only "Man" sneakers
    } else if (showWoman.value && sneaker.sex === "woman") {
      return true; // Show only "Woman" sneakers
    } else {
      return false; // Hide sneakers that don't match the selected categories
    }
  });

  return filtered;
});

const filterSneakers = () => {
  // Trigger computed property update
  const updatedSneakers = filteredSneakers.value;
  // Perform any other necessary actions
};

const fetchData = async () => {
  const response = await fetch(
    "https://6468f45a03bb12ac2082ccee.mockapi.io/sneakers"
  );
  const data = await response.json();
  sneakers.value = data;
  console.log(data);
};
fetchData();
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&family=Roboto:wght@400;500;700;900&display=swap");

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

.container {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include phone {
    width: 95%;
  }

  .not-found-msg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 23px;
  }
  .sneakers {
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    list-style: none;
    text-align: left;

    @include laptop {
      grid-template-columns: repeat(2, 1fr);
    }

    @include phone {
      grid-template-columns: repeat(1, 1fr);
      width: 100%;
      padding: 0;
    }

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
.loading {
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
