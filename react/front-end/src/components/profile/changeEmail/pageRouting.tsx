import PageRoutingContext from "../../../context/pageRoutingContext"

interface PageRoutingParams {
  children: JSX.Element | JSX.Element,
  trigger: number
}

const PageRouting = ({children, trigger}: PageRoutingParams) => {
  
  return (
    <PageRoutingContext.Provider value={trigger}>
      {children}
    </PageRoutingContext.Provider>
  )
}

export default PageRouting;