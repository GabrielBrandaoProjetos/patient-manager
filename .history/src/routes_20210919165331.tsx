
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PatientModal from "./components/Modal/PatientModal";
import { Home } from "./pages/Home/Home";



export function Router(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:id" component={PatientModal} />
        {/* <Route path="/home/patient" component={Home}/> */}
      </Switch>
    </BrowserRouter>
  )
}