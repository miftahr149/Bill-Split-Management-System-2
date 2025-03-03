import PageRoutingContext from "../../../context/pageRoutingContext"
import { OnExitCallback } from "../../../context/pageRoutingContext";
import React from "react"
import { useState } from "react"

interface PageRoutingParams {
  children: JSX.Element | JSX.Element[],
  title: string,
  onExit?: OnExitCallback;
  initial?: number,
}

const PageRouting = ({children, title, initial}: PageRoutingParams) => {

  const [pageState, setPageState] = useState(initial ? initial : 0);
  const incrementPageState = () => setPageState((prev) => prev + 1);
  const decrementPageState = () => setPageState((prev) => prev - 1);
  const changePageState = (value: number) => setPageState(() => value); 
  
  const data = {
    pageState: pageState,
    numPage: React.Children.count(children),
    title: title,
    incrementPageState: incrementPageState,
    decrementPageState: decrementPageState,
    changePageState: changePageState
  }

  return (
    <PageRoutingContext.Provider value={data}>
      {children}
    </PageRoutingContext.Provider>
  )
}

export default PageRouting;