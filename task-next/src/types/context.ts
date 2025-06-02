import { Tag } from ".";
import { OutputData } from "@editorjs/editorjs";

export interface firstStep {
  name: string;
  country: string;
  category: string;
  subCategory: string;
  selectedTags: Tag[] | null;
}
export interface socialItem {
    name: string;
    documentId: string;
    baseUrl: string;
}
export interface StateType {
    firstStep: firstStep;
    editorData: OutputData;
    socialData: socialItem[];
}

export interface SetFirstStepAction {
    type: "SET_FIRST_STEP";
    payload: firstStep;
}

export interface SetEditorDataAction {
    type: "SET_EDITOR_DATA";
    payload: OutputData;
}

export interface SetSocialDataAction {
    type: "SET_SOCIAL_DATA";
    payload: socialItem[];
}

export type Action = SetFirstStepAction | SetEditorDataAction | SetSocialDataAction;

export interface PostFormContextType {
    state: StateType;
    dispatch: React.Dispatch<Action>;
}

