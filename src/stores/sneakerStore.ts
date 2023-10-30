import { defineStore } from "pinia";

interface SneakerStoreState {
  chosenSize: number | null;
  quantity: number;
  cart: CartItem[];
  totalPrice: number;
  searchTerm: string;
}

export interface CartItem {
  id: number | undefined;
  imageUrl: string | undefined;
  name: string;
  price: number;
  size: number;
  quantity: number;
}

export const useSneakerStore = defineStore("sneaker", {
  state: (): SneakerStoreState => ({
    chosenSize: 0,
    quantity: 1,
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    totalPrice: 0,
    searchTerm: "",
  }),
  actions: {
    setChosenSize(size: number) {
      this.chosenSize = size;
    },
    setQuantity(quantity: number) {
      this.quantity = quantity;
    },
    addToCart(item: CartItem) {
      const existingItem = this.cart.find(
        (cartItem) =>
          cartItem.name === item.name && cartItem.price === item.price
      );

      if (existingItem) {
        // If the item already exists, update its quantity
        existingItem.quantity += item.quantity;
      } else {
        // If the item doesn't exist, add it to the cart
        this.cart.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(this.cart));

      console.log(this.chosenSize);
    },
    removeCartItem(item) {
      const index = this.cart.indexOf(item);
      if (index !== -1) {
        this.cart.splice(index, 1);
        // Update localStorage as well
        localStorage.setItem("cart", JSON.stringify(this.cart));

        this.updateTotalPrice();
      }
    },
    updateTotalPrice() {
      this.totalPrice = this.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    setSearchTerm(term: string) {
      this.searchTerm = term;
    },
  },
});
