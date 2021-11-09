import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function DropDownSearch({items, value, setValue, setItems, placeholder, loading}) {

  const [open, setOpen] = useState(false);

  const myTheme = require("./dropdown-styles");

  DropDownPicker.addTheme("MyThemeName", myTheme);
  DropDownPicker.setTheme("MyThemeName");

  return <DropDownPicker listMode="SCROLLVIEW" searchable={true} loading={loading} placeholder={placeholder} open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems} />;
}
