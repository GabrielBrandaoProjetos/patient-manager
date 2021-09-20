
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import PatientModal from "./components/Modal/PatientModal";
import { Home } from "./pages/Home/Home";



export function Router(){
  const location = useLocation<any>()
  
  let background = location.state && location.state.background;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        
      </Switch>
        {background && <Route path="/:id" component={PatientModal} />}
    </BrowserRouter>
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