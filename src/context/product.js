import React, { useContext, useReducer, useEffect } from "react";
import ItemReducer from "./reducer/items";
const ItemContext = React.createContext();
const initialState = [];
export const ItemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ItemReducer, initialState);
  const postItem = async (itemName, itemPrice, itemDes, itemType) => {
    const formData = new FormData();

    formData.append("itemName", itemName);
    formData.append("itemPrice", itemPrice);
    formData.append("itemDes", itemDes);
    formData.append("itemType", itemType);
    // for (const image of images) {
    //   formData.append("image", image);
    // }
    try {
      dispatch({ type: "ITEM_POST_REQ" });
      const response = await fetch("http://localhost:8080/item/post-item", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: formData,
      });
      console.log(response);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(response.message);
      }
      console.log(responseData)
      dispatch({ type: "ITEM_POST_SUCESS" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ITEM_POST_FAIL", payload: error.message });
    }
  };
  return (
    <ItemContext.Provider
      value={{
        ...state,
        postItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  return useContext(ItemContext);
};
