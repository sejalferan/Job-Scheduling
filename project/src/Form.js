
import React, { useEffect , useState} from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import L from 'leaflet';
import "leaflet-routing-machine";
import axios from "axios";
// import Date from "./Date";

const Form = () => {

    const [newjob, setnewJob] = useState({
      name:"", mobileno:"", district:"", taluka:"", village:"", pincode:"", surveyno:"", area:"", date:"" 
    })
    
    const [jobs, setJobs] = useState('');

    const [disabled, setDisabled] = useState(false);

  let name, value;
  const handleInputs = (e)=> {
     name = e.target.name;
     value = e.target.value;
     setnewJob({...newjob, [name]:value});
  }
  let V = 0;
  var finalcost = 0;
  var graph =[];
  var totalSprayTime = 0;

  useEffect (()=>{
    axios.get('/job', {
            params: {
              date: newjob.date,
            }
          })
          .then ((response) => {
          
            const getallData = response.data;
            setJobs(getallData);
            // console.log(jobs);
            if (!getallData.length){
              setnewJob({...newjob, [name]:value});
              setJobs(jobs => [newjob] );

            }
            else{
            console.log(jobs);
            setJobs(jobs => [...jobs,newjob] );
            console.log(jobs);
            }
  })
}, [newjob.date]);

    // get data from database 
    // async function  getData () {

    //   // await axios.get('/job', {
    //   //       params: {
    //   //         date: newjob.date,
    //   //       }
    //   //     })
    //   //     .then ((response) => {
    //   //       const getallData = response.data;
    //   //       setJobs(getallData);
    //   //       // console.log(jobs);
    //   //       setJobs(jobs => [...jobs,newjob] );
    //   //       console.log(jobs);
    //   //       V = jobs.length;
    //   //     })
    //   //     .catch(error => console.error(`Error: ${error}`));
    //   // return jobs;
    // }
    
    // Calculate Distance Matrix
    async function getGraph(response) {
       V = response.length;
      graph = [];
    
      for (let i = 0; i < V; i++) {
        const city1 = response[i].village + ", " + response[i].taluka + " " + response[i].pincode;
        graph[i] = [];
    
        for (let j = 0; j < V; j++) {
         
          const city2 = response[j].village + ", " + response[j].taluka + " " + response[j].pincode;
    
          const data = await Promise.all([
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city1}`),
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city2}`)
          ]).then(responses => Promise.all(responses.map(response => response.json())));
    
          const city1Coords = [data[0][0].lat, data[0][0].lon];
          const city2Coords = [data[1][0].lat, data[1][0].lon];
    
          const wayPoint1 = L.latLng(city1Coords);
          const wayPoint2 = L.latLng(city2Coords);
    
          const rWP1 = new L.Routing.Waypoint();
          rWP1.latLng = wayPoint1;
    
          const rWP2 = new L.Routing.Waypoint();
          rWP2.latLng = wayPoint2;
    
          const myRoute = L.Routing.osrmv1();
          const routes = await new Promise((resolve, reject) => {
            myRoute.route([rWP1, rWP2], (err, routes) => {
              if (err) {
                reject(err);
              } else {
                resolve(routes);
              }
            });
          });
          const distance = routes[0].summary.totalDistance;
          let time = routes[0].summary.totalTime + 600; // in seconds
          time = time / 60;
          graph[i][j] = time;
        }
      }
    
      return graph;
    }
    // new end

    // Calculate Total Spraytime 
    function sprayTime (jobs)  {
      for (let i=0; i<jobs.length; i++ ){
        if(jobs[i].area >= 3){
          var time = 60;
          let extra = jobs[i].area - 3;
          time = time + extra*15; // 15 min per acer
          // console.log(time);
          // console.log(cost);
          totalSprayTime += time;
          // console.log(totalSprayTime);
          }
      } 
      return totalSprayTime
    }
  
     //  travelling salesman problem 
 function travllingSalesmanProblem (graph, s) {
      // store all vertex apart
      // from source vertex
      // console.log("tsp");
      console.log(graph);
      let vertex = [];
      for (let i = 0; i < V; i++) {
          if (i !== s) {
              vertex.push(i);
          }
      }
       
      // store minimum weight
      // Hamiltonian Cycle.
      let min_path = Number.MAX_VALUE;
      do {
       
          // store current Path weight(cost)
          let current_pathweight = 0;
           
          // compute current path weight
          let k = s;
           
          for (let i = 0; i < vertex.length; i++) {
              // console.log(k);
              // console.log(graph[k]);
              current_pathweight += graph[k][vertex[i]];
              k = vertex[i];
          }
          current_pathweight += graph[k][s];
           
          // update minimum
          min_path = Math.min(min_path, current_pathweight);
      } while (findNextPermutation(vertex));
      return min_path;
  }
   
  // Function to swap the data
  // present in the left and right indices
  const swap = (data, left, right) => {
   
      // Swap the data
      let temp = data[left];
      data[left] = data[right];
      data[right] = temp;
       
      // Return the updated array
      return data;
  }
   
  // Function to reverse the sub-array
  // starting from left to the right
  // both inclusive
  const reverse = (data, left, right) => {
   
      // Reverse the sub-array
      while (left < right) {
          let temp = data[left];
          data[left++] = data[right];
          data[right--] = temp;
      }
       
      // Return the updated array
      return data;
  }
   
  // Function to find the next permutation
  // of the given integer array
  const findNextPermutation = (data) => {
   
      // If the given dataset is empty
      // or contains only one element
      // next_permutation is not possible
      if (data.length <= 1) {
          return false;
      }
      let last = data.length - 2;
       
      // find the longest non-increasing
      // suffix and find the pivot
      while (last >= 0) {
          if (data[last] < data[last + 1]) {
              break;
          }
          last--;
      }
       
      // If there is no increasing pair
      // there is no higher order permutation
      if (last < 0) {
          return false;
      }
      let nextGreater = data.length - 1;
       
      // Find the rightmost successor
      // to the pivot
      for (let i = data.length - 1; i > last; i--) {
          if (data[i] > data[last]) {
              nextGreater = i;
              break;
          }
      }
       
      // Swap the successor and
      // the pivot
      data = swap(data, nextGreater, last);
       
      // Reverse the suffix
      data = reverse(data, last + 1, data.length - 1);
       
      // Return true as the
      // next_permutation is done
      return true;
  }
   
  // Whether accept or reject the Job depending on cost.
   function jobconfirmation (cost){

    if (cost <= 500) {
     axios.post('/job', newjob)
    .then(function (response) {
      console.log(response);
      alert`job added Successfully.`;
      setDisabled(false); 
      // localStorage.clear();
      window.location.href = 'service'
    })
    .catch(function (error) {
      console.log(error);
    });
   }
   else {
    alert`Not possible on this date,Please select another date.`;
    setDisabled(false);
    // localStorage.clear();
   }
  }
  
  // Calculate final cost from Tsp and Spraytime
    function finalCost (letTime, tsp){
    finalcost = letTime + tsp;
    return finalcost
  }
  
  function driverFunc (){
    // e.preventDefault();
   var s = 0 ;
   var graph = [];

    const myPromise2 = new Promise( (resolve, reject) => {
      var graph = getGraph(jobs);
      // resolve(graph);
     // V = jobs.length;
     resolve(graph);
    //  return myPromise2;
   });  

  myPromise2.then((graph)=> {

    if(graph.length===1){
      var time = sprayTime(jobs);
      jobconfirmation(time);
    }
    else {
    console.log(`graph = ${graph}`);
    const myPromise3 = new Promise((resolve, reject) => {
      var tsp = travllingSalesmanProblem(graph,s);
      var time = sprayTime(jobs);
      // V = jobs.length;
      resolve([tsp,time]);
    });
    return myPromise3;
  }

  }).then(([tsp,time])=> {
   console.log(`tsp = ${tsp} and time= ${time}`);
    const myPromise4 = new Promise((resolve, reject) => {
      var finalcost = finalCost(tsp,time);
      resolve(finalcost);
    });
    return myPromise4;

  }).then((value)=> {
    console.log(`finalcost= ${value} `);
    jobconfirmation(value);
  })
 
  }


  const PostData = (e) => {
    e.preventDefault(); 
    setDisabled(true);    
    driverFunc();     
        
  }

    return (
        <>
        <div className="container justify-content-center">
       <div className="row justify-content-center">
            <div className="col-5 justify-content-center">

        <form method="POST" onSubmit={PostData} className="mt-4">
        <div className="mb-3">
          <label for="exampleInputEmail1" class="form-label">Name</label>
          <input type="text" class="form-control" name="name" id="name"
          value={newjob.name}
          onChange={handleInputs}
          required
            placeholder="First Name | Middle Name | Last Name" aria-describedby="emailHelp"/>
        </div>
       
        <div className="mb-3">
         <label for="mobileno">Mobile number</label>
         <input type="tel" class="form-control" maxlength="10" name="mobileno" id="mobileno"
         value={newjob.mobileno}
         onChange={handleInputs}
          placeholder="Enter 10 digit mobile number" required />
        </div>

        {/* address div  start*/}
        <div className="row">

        <div className="col col-md-6 mb-3">
      <label for="district">District</label>
      <select className="form-control" name="district" id="district"
      value={newjob.district}
      onChange={handleInputs}
      required >
      <option disabled="disabled" selected="selected">--Select District--</option>
      {/* <option value="Ahmednagar">Ahmednagar</option>
                        <option value="Akola">Akola</option>
                        <option value="Amravati">Amravati</option>
                        <option value="Beed">Beed</option>
                        <option value="Bhandara">Bhandara</option>
                        <option value="Buldhana">Buldhana</option>
                        <option value="Chandrapur">Chandrapur</option>
                        <option value="Chha. Sambhajinagar">Chha. Sambhajinagar</option>
                        <option value="Dhule">Dhule</option>
                        <option value="Gadchiroli">Gadchiroli</option>
                        <option value="Gondia">Gondia</option>
                        <option value="Hingoli">Hingoli</option>
                        <option value="Jalgaon">Jalgaon</option>
                        <option value="Jalna">Jalna</option>
                        <option value="Kolhapur">Kolhapur</option>
                        <option value="Latur">Latur</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Nanded">Nanded</option>
                        <option value="Nandurbar">Nandurbar</option>
                        <option value="Nashik">Nashik</option>
                        <option value="Osmanabad">Osmanabad</option>
                        <option value="Palghar">Palghar</option>
                        <option value="Parbhani">Parbhani</option>
                        <option value="Pune">Pune</option>
                        <option value="Raigarh">Raigarh</option>
                        <option value="Ratnagiri">Ratnagiri</option>
                        <option value="Sangli">Sangli</option>
                        <option value="Satara">Satara</option>
                        <option value="Sindhudurg">Sindhudurg</option>
                        <option value="Solapur">Solapur</option>
                        <option value="Thane">Thane</option>
                        <option value="Wardha">Wardha</option>
                        <option value="Washmi">Washmi</option> */}
                        <option value="Yavatmal">Yavatmal</option>
        <option></option>
      </select>
    </div>

    <div className="col col-md-6 mb-3">
      <label for="district">Taluka</label>
      <select className="form-control" name="taluka" id="taluka"
      value={newjob.taluka}
      onChange={handleInputs}
       required >
      <option disabled="disabled" selected="selected">--Select Taluka--</option>
                        <option value="Kalamb">Kalamb</option>
        <option></option>
      </select>
    </div>

    <div className="col col-md-6 mb-3">
      <label for="district">Village</label>
      <select className="form-control" name="village" id="village"
      value={newjob.village}
      onChange={handleInputs}
       required >
      <option disabled="disabled" selected="selected">--Select Village--</option>
                        <option value="Dahegaon">Amala</option>
                        <option value="Borjai">Donoda</option>
                        <option value="Umari">Hirapur</option>
                        <option value="Amala">Kamathwada</option>
                        <option value="Pathrad">Kanholi</option>
                        <option value="Katri">Kotha</option>
                        <option value="Andhbori">Mangrul</option>
                        <option value="Tirzada">Pathrad</option>
                        <option value="Dhotra">Pimpalgaon</option>
                        <option value="Rajur">Pimpalkhuti</option>
                        <option value="Khairi">Rajur</option>
                        <option value="Pophalani">Sawangi</option>
                        <option value="Gandha">Shankarpur</option>
                        <option value="Hiradi">Shingnapur</option>
                        <option value="Shiwani Kh.">Talegaon</option>
                        <option value="Pimpalkhuti">Tirzada</option>
                        <option value="Khadki">Wadgaon</option>
                        <option value="Potgavhan">Wandli</option>
                        
       
        <option></option>
      </select>
    </div>

    <div class="col col-md-6 mb-3">
      <label for="fpincode">Pincode</label>
      <input type="number" class="form-control" name="pincode" id="pincode"
      value={newjob.pincode}
      onChange={handleInputs}
       required />
    </div>

    
    {/* <div class="form-group col-md-2">
      <label for="pincode">Pincode</label>
      <input type="number" class="form-control" name="pincode" id="pincode" required />
    </div> */}
  </div>

  {/* address div end */}
      
  <div className="form-group col-md-12 mb-3">
      <label for="surveyno">Farm Survey number</label>
      <input type="text" class="form-control" name="surveyno" id="surveyno"
      value={newjob.surveyno}
      onChange={handleInputs}
       required />
    </div>
     
    <div className="form-group col-md-12 mb-3">
      <label for="area">Total Area to Spreay</label>
      <input type="number" class="form-control" name="area" min="3" id="area"
      value={newjob.area}
      onChange={handleInputs}
       placeholder="In acers" required />
    </div>
  
    <div class="form-group col-md-12 mb-3">
                   
        <div className="date" controlId="dob">
          <label for="date">Select Date</label>
          <input type="date" name="date" id="date"
          value={newjob.date}
          onChange={handleInputs}
          placeholder="Date of Birth" />
    </div>
  </div>
        <button type="submit" name="submit" id="submit" disabled={disabled} value="submit" class="btn btn-primary">Submit</button>
      </form>
      

      <MapContainer center={[20.455662, 78.470203]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
</MapContainer>


      </div>
       </div>
       </div>
       </>
    )
  }

  export default Form;