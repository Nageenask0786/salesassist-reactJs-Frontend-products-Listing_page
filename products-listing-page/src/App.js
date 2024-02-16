import { Route, Switch, BrowserRouter } from "react-router-dom";


import AllProducts from "./components/Products"
const App = () => (
    <BrowserRouter>
    <Switch>
    <Route exact path = "/" component = {AllProducts} />
    </Switch>

</BrowserRouter>
 
)

export default App