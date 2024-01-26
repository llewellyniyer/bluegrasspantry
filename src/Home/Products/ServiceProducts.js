import { Alert } from "react-native";

export default function getProducts(offset, limit) {
  return fetch(`https://dummyjson.com/products/?limit=${limit}&skip=${offset * limit}`)
    .then(res => res.json())
    .catch((e) => console.log(e))
}