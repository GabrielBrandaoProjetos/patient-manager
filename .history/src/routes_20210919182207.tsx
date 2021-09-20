
import { BrowserRouter, Switch, Route, useLocation, useParams,  } from "react-router-dom";
import { Location } from 'history' 
import PatientModal from "./components/Modal/PatientModal";
import { Home } from "./pages/Home/Home";

interface ModalParams{
  id: string;
}

export function Router(){
  const { id } = useParams<ModalParams>()
  const location = useLocation<Location>();
  
  let background = location.state && location.state

  return (
    <div>
      <Switch location={background || location}>
        <Route path="/" exact component={Home} />
        <Route path="/:id" component={PatientModal} />
      </Switch>
        {background || id && <Route path="/:id" component={PatientModal} />}
    </div>
  //   <div>
  //   <Switch location={background || location}>
  //     <Route exact path="/" children={<Home />} />
  //     <Route path="/gallery" children={<Gallery />} />
  //     <Route path="/img/:id" children={<ImageView />} />
  //   </Switch>

  //   {/* Show the modal when a background page is set */}
  //   {background && <Route path="/img/:id" children={<Modal />} />}
  // </div>
  )
}