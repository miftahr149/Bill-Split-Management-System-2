import { createContext } from "react";

export interface PageAttributeParams {
  pageState: number;
  changePageState: (value: number) => void;
}

export type OnExitCallback = (pageAttribute: PageAttributeParams) => void;

interface PageRoutingContextParams {
  pageState: number;
  numPage: number;
  title: string;
  incrementPageState: () => void;
  decrementPageState: () => void;
  changePageState: (value: number) => void;
  onExit?: OnExitCallback;
}

const PageRoutingContext = createContext<PageRoutingContextParams>({
  pageState: 0,
  numPage: 0,
  title: "",
  incrementPageState: () => {},
  decrementPageState: () => {},
  changePageState: (value: number) => {value},
});

export default PageRoutingContext;

