import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { useState } from "react";
import { Product, useDB } from "@/hooks/useDB";
import { router } from "expo-router";

export default function NewProduct() {
  const { insertProduct } = useDB();
  const [product, setProduct] = useState<Product>({
    name: "Hat",
    description: "",
    price: "",
    image: "",
    category: "",
    quantity: "",
  });

  const addProduct = async () => {
    try {
      const result = await insertProduct(product);
      console.log(result);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={product.name}
          onChangeText={(text) => setProduct({ ...product, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Desription"
          value={product.description}
          onChangeText={(text) => setProduct({ ...product, description: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Price"
          value={product.price.toString()}
          keyboardType="numeric"
          onChangeText={(text) => {
            // Validate the input: Allow only decimal numbers
            if (/^\d*\.?\d*$/.test(text)) {
              setProduct({ ...product, price: text as unknown as number });
            }
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Image"
          value={product.image}
          onChangeText={(text) => setProduct({ ...product, image: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Category"
          value={product.category}
          onChangeText={(text) => setProduct({ ...product, category: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={product.quantity.toString()}
          keyboardType="numeric"
          onChangeText={(text) => {
            // Prevent NaN by checking for valid input
            const parsedValue = parseInt(text, 10);
            setProduct({
              ...product,
              quantity: isNaN(parsedValue) ? "" : parseInt(text),
            });
          }}
        />
        <Button title="Create Product" onPress={addProduct} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    gap: 20,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
});
