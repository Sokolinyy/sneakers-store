export const formatPrice = (price: number) => {
  if (typeof price === "number") {
    // Convert price to a string with two decimal places
    const priceString = price.toFixed(2);

    // Split the string into integer and decimal parts
    const [integerPart, decimalPart] = priceString.split(".");

    // Add a comma every three digits from the right in the integer part
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

    // Combine the integer and decimal parts with a period
    return `${formattedIntegerPart}.${decimalPart} Kč`;
  }

  // Handle the case where price is undefined or not a number
  return "Načítání...";
};
