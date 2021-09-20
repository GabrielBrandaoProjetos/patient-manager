
import { BrowserRouter, Switch, Route, useLocation, useParams,  } from "react-router-dom";
import { Location } from 'history' 
import PatientModal from "./components/Modal/PatientModal";
import { Home } from "./pages/Home/Home";

interface ModalParams{
  id: string;
}

export function Router(){
  const { id } = useParams<ModalParams>()
  const location: any = useLocation();
  
  let background =  location.state?.background ?? {...location, pathname: "/"}

  return (
    <>
      <Switch location={background || location}>
        <Route path="/" exact component={Home} />
      </Switch>
        {background && <Route path="/:id" component={PatientModal} />}
    </>
  )
}