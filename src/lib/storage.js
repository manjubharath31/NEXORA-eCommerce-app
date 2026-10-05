import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();
//This creates our MMKV storage instance.

export const zustandMMKVStorage = {
  setItem: (name, value) => storage.set(name, value), //Save something.

  getItem: (name) => storage.getString(name) ?? null, //return saved data

  removeItem: (name) => storage.remove(name), //Delete saved data.
};
