
import { BrowserRouter, Switch, Route, useLocation,  } from "react-router-dom";
import { Location } from 'history' 
import PatientModal from "./components/Modal/PatientModal";
import { Home } from "./pages/Home/Home";


export function Router(){
  
  const location = useLocation<Location>();
  let background: any
  if(location){
    console.log(location);
    background = location.state
  }
  

  return (
    <BrowserRouter>
      <Switch location={background || location}>
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