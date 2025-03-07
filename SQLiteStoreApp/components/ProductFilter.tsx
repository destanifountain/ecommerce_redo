import { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Product, useDB } from "@/hooks/useDB";
import { useFocusEffect } from "expo-router";

interface ProductFilterProps {
  setProducts: (products: Product[]) => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  setProducts,
}) => {
  const { getProducts, getAllCategories, getProductsByCategory } = useDB();

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
      loadAllCategories();
    }, [])
  );

  const loadProducts = async () => {
    const result = (await getProducts()) as Product[];
    console.log(result);
    setProducts(result);
  };

  const loadAllCategories = async () => {
    const result = (await getAllCategories()) as string[];
    console.log(result);
    setCategories([
      { label: "All", value: null } as never,
      ...result.map(
        (item: any) => ({ label: item.category, value: item.category } as never)
      ),
    ]);
  };

  const filterProducts = async (category: { label: string; value: string }) => {
    if (!category.value) {
      loadProducts();
      return;
    } else {
      const result = (await getProductsByCategory(category.value)) as Product[];
      setProducts(result);
    }
  };

  return (
    <DropDownPicker
      searchable={true}
      onSelectItem={filterProducts as any}
      open={open}
      value={selectedCategory}
      items={categories}
      setOpen={setOpen}
      setValue={setSelectedCategory}
      setItems={setCategories as any}
    />
  );
};
