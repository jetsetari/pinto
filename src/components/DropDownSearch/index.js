import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function DropDownSearch({items, value, setValue, setItems, placeholder, loading, searchable = true}) {

  const [open, setOpen] = useState(false);

  //const myTheme = require("./dropdown-styles");

  //DropDownPicker.addTheme("MyThemeName", myTheme);
  //DropDownPicker.setTheme("MyThemeName");

  return <DropDownPicker listMode="SCROLLVIEW" searchable={searchable} loading={loading} placeholder={placeholder} open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems} />;
}
