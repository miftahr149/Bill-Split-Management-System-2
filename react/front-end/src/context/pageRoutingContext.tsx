import { createContext } from "react";

interface PageRoutingContextParams {
  pageState: number;
  numPage: number;
}

const PageRoutingContext = createContext<PageRoutingContextParams>({
  pageState: 0,
  numPage: 0,
});

export default PageRoutingContext;

