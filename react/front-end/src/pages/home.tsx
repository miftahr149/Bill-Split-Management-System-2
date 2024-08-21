import Navbar from "../components/navbar"
import "../assets/css/home.css"

const Home = () => {
  return (
    <div className="home pages">
      <Navbar title="Home" />
      <main className="home__main box box--white-text">
        <div className="greeting d-flex box">

        </div>
      </main>
    </div>
  )
}

export default Home