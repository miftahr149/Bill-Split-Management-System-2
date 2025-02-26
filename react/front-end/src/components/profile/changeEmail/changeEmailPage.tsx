import ChangeEmailContext from "../../../context/changeEmailContext"
import { useContext } from "react"


const ChangeEmailPage = () => {

  const {incrementPageState} = useContext(ChangeEmailContext);

  return (
    <div className="">
      <p>hello</p>
    </div>
  )
}

export default ChangeEmailPage;