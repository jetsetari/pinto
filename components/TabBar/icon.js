import React from 'react';
import { Feather } from "@expo/vector-icons";


const Icon = ({name, color}) => {

  const icons = {
    Food: "home",
    "Pick Up": "maximize",
    Wallet: "credit-card",
    Account: "user",
    Shop: "shopping-bag",
    Notifications: "bell"
  };

  return (
<Feather name={icons[name]} size={18} color={color} />
  );
};

export default Icon;