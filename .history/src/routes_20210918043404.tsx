
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PatientModal from "./components/Modal/PatientModal";
import { Home } from "./pages/Home/Home";



export function Router(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home/patient/:id" component={PatientModal}/>
        <Route path="/home" exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}