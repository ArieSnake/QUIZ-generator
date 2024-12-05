import "./App.css"
import { Counter } from "./features/counter/Counter"
import { Quotes } from "./features/quotes/Quotes"
import { Login } from "./features/tests_template/Login/login"
import logo from "./logo.svg"

const App = () => {
  return (
    <div className="App">
      <Login/>
    </div>
  )
}

export default App
