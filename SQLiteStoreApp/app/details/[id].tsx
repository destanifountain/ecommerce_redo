import { router, useLocalSearchParams, useNavigation } from "expo-router";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useEffect, useLayoutEffect, useState } from "react";
import { Product, useDB } from "@/hooks/useDB";
import { useInputFloat } from "@/hooks/useInputValidation";
import { Ionicons } from "@expo/vector-icons";

export default function NewProduct() {
  const navigation = useNavigation();

  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | undefined>();
  const { getProduct, updateProduct, deleteProduct } = useDB();
  const { value: floatValue, onChange: handleInputStringToFloat } =
    useInputFloat(product?.price.toString() || "0");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Details",
      headerRight: () => (
        <TouchableOpacity onPressIn={() => onDelete(id.toString())}>
          <Ionicons name="trash" color={"black"} size={24} />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const result = await getProduct(+id);
      setProduct(result as Product);
      console.log(result);
    };
    loadProducts();
  }, [id]);

  const onUpdate = async () => {
    await updateProduct(product as Product);
    router.back();
  };
  const onDelete = async (id: string) => {
    await deleteProduct(+id);
    router.back();
  };

  return (
    <View style={styles.container}>
      {product && (
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
            onChangeText={(text) =>
              setProduct({ ...product, description: text })
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Price"
            value={floatValue.toString()}
            onChangeText={handleInputStringToFloat}
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
            onChangeText={(text) => {
              const numericValue = parseInt(text);
              if (isNaN(numericValue)) {
                setProduct({ ...product, quantity: 0 }); // Set to 0 if not a number
              } else {
                setProduct({ ...product, quantity: numericValue });
              }
            }}
          />
          <Button title="Update Product" onPress={onUpdate} />
        </View>
      )}
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
