import React from 'react';
import { Feather } from "@expo/vector-icons";


const Icon = ({name, color}) => {

  const icons = {
    Food: "home",
    "Pick Up": "maximize",
    Account: "user",
    Shop:"shopping-bag"
  };

  return (
<Feather name={icons[name]} size={18} color={color} />
  );
};

export default Icon;