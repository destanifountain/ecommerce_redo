import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Product } from "@/hooks/useDB";
import { router } from "expo-router";
import { ProductFilter } from "@/components/ProductFilter";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  const renderProducts = ({ item }: { item: Product }) => {
    const numberFormat = (value: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);

    return (
      <TouchableOpacity onPress={() => router.push(`/details/${item.id}`)}>
        <View style={styles.item}>
          <Image
            source={{
              uri: item.image ? item.image : "https://placehold.co/50@2x.png",
            }}
            style={{ width: 50, height: 50 }}
          />
          <Text style={{ flex: 1 }}>{item.name}</Text>
          <Text>
            {numberFormat(item.price)} x {item.category}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ProductFilter setProducts={setProducts} />
      <FlatList
        data={products}
        renderItem={renderProducts}
        keyExtractor={(item) => item.id!.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    padding: 8,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});

export default Home;
