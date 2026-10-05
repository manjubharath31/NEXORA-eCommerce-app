import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandMMKVStorage } from "../lib/storage";

  export const useWishlistStore = create (persist((set,get)=>({
    items:[],

    toggleWishlist :(product)=>{
        const exists =get().items.find((i)=> i.id === product.id);

        if(exists){
            set({items:get().items.filter((i)=>i.id !== product.id)});
        }  else{
            set({items:[...get().items,product]});
        }
    },
    isWishlisted :(id)=> !!get().items.find((i) => i.id === id),

    clearWishlist : ()=>set({items:[]}),


}),
{
    name: "nexora-wishlist",
    storage: createJSONStorage(()=> zustandMMKVStorage),
}));//createJSONStorage adapts the storage for Zustand's persisted state and handles JSON serialization/deserialization.