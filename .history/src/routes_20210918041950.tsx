
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";



export function Router(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
        <Route path="/admin/rooms/:id" component={AdminRoom} />
        <Route path="/home" exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}