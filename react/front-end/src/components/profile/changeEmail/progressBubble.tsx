import "../../../assets/css/progressBubble.css"
import { useContext } from "react"
import PageRoutingContext from "../../../context/pageRoutingContext"

const ProgressBubble = () => {
  const {pageState, numPage} = useContext(PageRoutingContext);
  
  const setBubble = () => {
    let bubbleComponentArray: JSX.Element[] = [];
    for (let i = 0; i < numPage; i++) {
      let style = "bubble-progress";
      console.log(pageState);
      if (i <= pageState) {
        style = style + " bubble-progress--complete";
      }
      bubbleComponentArray.push(<i className={style} key={i} />)
    }
    return bubbleComponentArray;
  }

  return (
    <div className="d-flex flex-grow-1 justify-content-center gap-4 align-items-end">
      {setBubble()}
    </div>
  )
}

export default ProgressBubble;