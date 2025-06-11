import { Action, StateType } from "@/types/context";

export const initialState: StateType = {
    firstStep: {
      name: "",
      country: "",
      category: "",
      subCategory: "",
      selectedTags: [],
    },
    editorData: "",
    socialData: [],
  };
  
export function reducer(state: StateType, action: Action): StateType {
    switch (action.type) {
      case "SET_FIRST_STEP":
        return { ...state, firstStep: action.payload };
      case "SET_EDITOR_DATA":
        return { ...state, editorData: action.payload };
      case "SET_SOCIAL_DATA":        
        return {...state, socialData: action.payload}
      default:
        return state;
    }
  }