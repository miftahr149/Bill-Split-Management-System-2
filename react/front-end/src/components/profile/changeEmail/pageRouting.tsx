import PageRoutingContext from "../../../context/pageRoutingContext"
import React from "react"

interface PageRoutingParams {
  children: JSX.Element | JSX.Element[],
  trigger: number
}

const PageRouting = ({children, trigger}: PageRoutingParams) => {

  const data = {
    pageState: trigger,
    numPage: React.Children.count(children)
  }

  return (
    <PageRoutingContext.Provider value={data}>
      {children}
    </PageRoutingContext.Provider>
  )
}

export default PageRouting;