import React from "react";
import web from "../src/images/imagedron.jpg";
import { NavLink } from "react-router-dom";


const Home = () => {
  return (
   <>
   <section id="header" className="d-flex align-items-center">
     <div className="container-fluid nav bg">
       <div className="row">
            
            <div className="col-10 mx-auto">
              <div className="row">
               <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                <h1> Spreay your Land with <strong>Fawara</strong></h1>
                <h2 className="my-3"> We are the specialist</h2>
                 
                 {/* link */}
                 <div className="mt-3">
                    <NavLink to="/Service" className="btn btn-outline-primary">Get Started</NavLink>
                 </div>
               </div>

                 {/* new div  */}
                 <div className="col-lg-6 order-1 order-lg-2 header-img" >
                  <img src={web} className="img-fluid animated" alt="image"/>
                 </div> 

                 
          
            </div>
        </div>
       </div>
      </div>
   </section>
   </>
  );
}

export default Home;