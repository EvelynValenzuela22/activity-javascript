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

const discountsHolyDays = [
  { category: 1, discountApply: true, value: 10 },
  { category: 2, discountApply: false, value: 0 },
  { category: 3, discountApply: true, value: 30 },
];

/// 1 - ¿Cuál es el promedio de valor de cada tipo de producto?

const groupBy = (array, key) =>
  array.reduce((acc, current) => {
    (acc[current[key]] = acc[current[key]] || []).push(current);
    return acc;
  }, {});

const findCategoryNameById = (id) =>
  categories.find((category) => category.id == id)?.name ?? "without category";

const productsByCategory = Object.entries(groupBy(products, "category"));

const averageProductsByCategory = () =>
  productsByCategory.map(([key, value]) => ({
    [findCategoryNameById(key)]:
      value
        .map((product) => product.price)
        .reduce((acc, current) => acc + current, 0) / value.length,
  }));

console.log(averageProductsByCategory());

/// 2 - ¿Cuál es el producto más costoso de cada categoria?

const moreExpensiveByCategory = () =>
  productsByCategory.map(([key, value]) => ({
    [findCategoryNameById(key)]: value.reduce((acc, value) =>
      value.price > acc ? value.price : acc
    ),
  }));

console.log(moreExpensiveByCategory());

/// 3 - ¿Exite algún producto de tipo Electronico que cueste $100?

const productElectronicPrice100 = () =>
  products.some((product) => product.category === 1 && product.price === 100);

console.log(productElectronicPrice100());

/// 4 - Obtener todos los productos que en nombre tengan las letra S.

const productsWithS = () =>
  products.filter((product) => product.name.toLowerCase().match("s"));

console.log(productsWithS());

/// 5 - Crear un arreglo de objetos con la siguiente información: { productId: 7 ,nameProduct: 'keyboard', category: 'Electronic', discount: '10', applyDiscount: true}

const addDiscount = () =>
  products.map((product) => {
    const discount = discountsHolyDays.find(
      (discount) => discount.category === product.category
    ) || {
      discountApply: false,
      value: 0,
    };
    product["discount"] = discount.value;
    product["discountApply"] = discount.discountApply;
    return product;
  });

console.log(addDiscount());

/// 6. Crear un arreglo de objetos con la siguiente información: { productId: 7, priceWithDiscount: 45}
const pricesProductsWithDiscount = [];
const calculatedDiscount = () => {
  addDiscount().forEach((product) =>
    pricesProductsWithDiscount.push({
      productId: product.productId,
      priceWithDiscount:
        product.price - product.price * (product.discount * 0.01),
    })
  );
  return pricesProductsWithDiscount;
};

console.log(calculatedDiscount());

// 7. Agregar los siguientes productos, y crear un arreglo con el resultado, ejemplo: [{id: 9, status: 'succes', id:10: status: 'error': message: 'error message'}];
// errors: duplicated key

const newProducts = [
  {
    id: 9,
    name: "Tucson",
    typeOfProduct: "Car",
    discount: 10,
  },
  {
    id: 10,
    name: "Jeep",
    typeOfProduct: "Car",
    discount: 10,
  },
  {
    id: 10,
    name: "Screen",
    typeOfProduct: "Electronic",
  },
  {
    id: 1,
    name: "Mouse",
    typeOfProduct: "Electronic",
  },
];

const response = [];
const currentProducts = [...products];
const currentCategory = [...categories];
const currentDiscount = [...discountsHolyDays];

const findCategoryByName = (name) =>
  currentCategory.find((category) => category.name === name);

const addProducts = () =>
  newProducts.map((newProduct) => {
    newProduct["productId"] = newProduct["id"];
    newProduct["category"] =
      findCategoryByName(newProduct.typeOfProduct)?.id ??
      currentCategory.length + 1;
    if (
      !currentProducts.some(
        (product) => product.productId === newProduct.productId
      )
    ) {
      response.push({ id: newProduct.id, status: "succes" });

      const { productId, name, category } = newProduct;

      currentProducts.push({
        productId,
        name,
        category,
      });
    } else {
      response.push({
        id: newProduct.id,
        status: "error",
        message: "duplicated key",
      });
    }
    return response;
  });

console.log(addProducts());
