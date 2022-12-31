import {BrowserRouter , Routes ,Route, Navigate} from "react-router-dom"
import App from "./App";
import Editcomponent from "./components/editcomponent";
import Formcomponent from "./components/formcomponent";
import Logincomponent from "./components/logincomponent";
import Singlecomponent from "./components/singlecomponent";
import { getuser } from "./service/autherize";


const Myrouter = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App/>}/>
                {/* <Adminroute path="/create" element={<Formcomponent/>}/> */}
                <Route path="/blog/:slug" element={<Singlecomponent/>}/>
                {/* <Adminroute path="/blog/edit/:slug" element={<Editcomponent/>}/> */}
                <Route path="/login" element={<Logincomponent/>}/>
                <Route
                    path="/create"
                    element={
                        !getuser()? (
                        <Navigate replace to="/login" />
                        ) : (
                        <Formcomponent/>
                        )
                    }
                    />
                <Route
                        path="/blog/edit/:slug"
                        element={
                            !getuser()? (
                            <Navigate replace to="/login" />
                            ) : (
                            <Editcomponent/>
                            )
                        }
                        />
                </Routes>
        </BrowserRouter>
    )
}

export default Myrouter;