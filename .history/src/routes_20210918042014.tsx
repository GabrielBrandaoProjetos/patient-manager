
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";



export function Router(){
  return (
    <BrowserRouter>
      <Switch>
        
        <Route path="/home" exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}