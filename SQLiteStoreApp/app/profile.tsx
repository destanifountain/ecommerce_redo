import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import { globalStyles } from "./styles/globalStyles"; 

const Profile = () => {
  interface User {
    name: string;
    email: string;
    orderHistory: string[];
  }

  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    name: "",
    email: "",
    orderHistory: [],
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      alert("Please fill in both fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newUser.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = newUser;
      setUsers(updatedUsers);
      setEditingIndex(null);
    } else {
      setUsers([...users, newUser]);
    }

    setNewUser({ name: "", email: "", orderHistory: [] });
  };

  const handleEditProfile = (index: number) => {
    setNewUser(users[index]);
    setEditingIndex(index);
  };

  const handleViewOrderHistory = (orderHistory: string[]) => {
    console.log("Order History:", orderHistory);
  };

  const renderUser = ({ item, index }: { item: User; index: number }) => (
    <View style={globalStyles.card}>
      <Text style={globalStyles.name}>Name: {item.name}</Text>
      <Text style={globalStyles.price}>Email: {item.email}</Text>
      <Button title="Edit Profile" onPress={() => handleEditProfile(index)} />
      <Button title="View Order History" onPress={() => handleViewOrderHistory(item.orderHistory)} />
      <Text style={globalStyles.header}>Order History:</Text>
      <FlatList
        data={item.orderHistory}
        keyExtractor={(orderItem, orderIndex) => orderIndex.toString()}
        renderItem={({ item: orderItem }) => (
          <TouchableOpacity>
            <Text style={globalStyles.price}>{orderItem}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>User Profiles</Text>

      <TextInput
        style={globalStyles.searchBar}
        placeholder="Name"
        value={newUser.name}
        onChangeText={(text) => setNewUser({ ...newUser, name: text })}
      />
      <TextInput
        style={globalStyles.searchBar}
        placeholder="Email"
        value={newUser.email}
        onChangeText={(text) => setNewUser({ ...newUser, email: text })}
      />
      <Button title={editingIndex !== null ? "Update User" : "Add User"} onPress={handleAddUser} />

      {users.length > 0 ? (
        <FlatList data={users} keyExtractor={(item, index) => index.toString()} renderItem={renderUser} />
      ) : (
        <Text style={globalStyles.price}>No users added yet.</Text>
      )}
    </View>
  );
};

export default Profile;