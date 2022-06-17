const groupBy = require("array.prototype.groupby");
groupBy.shim();

const products = [
  {
    productId: 1,
    name: "headphones",
    category: 1,
    price: 100,
  },
  {
    productId: 2,
    name: "Shoes Nike",
    category: 2,
    price: 300,
  },
  {
    productId: 3,
    name: "hamburger",
    category: 3,
    price: 10,
  },
  {
    productId: 4,
    name: "Fries",
    category: 3,
    price: 5,
  },
  {
    productId: 5,
    name: "Sandwich",
    category: 3,
    price: 10,
  },
  {
    productId: 6,
    name: "laptop",
    category: 1,
    price: 100,
  },
  {
    productId: 7,
    name: "keyboard",
    category: 1,
    price: 50,
  },
  {
    productId: 8,
    name: "t-shirt",
    category: 2,
    price: 16,
  },
];

const categories = [
  { id: 1, name: "Electronic" },
  { id: 2, name: "Clothes" },
  { id: 3, name: "Food" },
];

const findCategoryNameById = (id) =>
  categories.find((category) => category.id == id)?.name ?? "without category";

const productsByCategory = Object.entries(
  products.groupBy((product) => product.category)
).map(([key, value]) => ({
  [findCategoryNameById(key)]: value
    .map((product) => product.price)
    .reduce((acc, current) => acc + current, 0)/value.length,
}));

console.log(productsByCategory);