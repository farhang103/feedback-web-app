import data from "../data.json";

export const loadState = () => {
  try {
    const storageBoards = localStorage.getItem("productRequests");
    if (!storageBoards) {
      return data.productRequests;
    } else {
      return JSON.parse(storageBoards);
    }
  } catch (error) {
    return data.productRequests;
  }
};

export const saveState = (productRequests) => {
  try {
    localStorage.setItem("productRequests", JSON.stringify(productRequests));
  } catch (error) {
    console.log(error);
  }
};
