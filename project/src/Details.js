import React, { useEffect , useState} from "react";
import axios from "axios";
// import { response } from "express";
import DataTable from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { columns } from './Data.js';




const Details = () => {

   
const [jobs,setJobs] = useState([]);
const getJobs = async () => {
    try {
        axios.get('/job', {
            params: {
            }
          })
          .then ((response) => {
            const getallData = response.data;
            setJobs(getallData);
    });
    }
    catch (error){
        console.log(error);
    }
};



// const columns = [
//     {
//         name: 'Name',
//         selector: row => row.name,
//     },
//     {
//         name: 'Survey No.',
//         selector: row => row.surveyno,
//     },
//     {
//         name: 'Village',
//         selector: row => row.village,
//     },
//     {
//         name: 'Taluka',
//         selector: row => row.taluka,
//     },
//     {
//         name: 'District',
//         selector: row => row.district,
//     },
//     {
//         name: 'Date',
//         selector: row => row.date,
//         sortable: true,
//     },
//     {
//         name: 'Area (in Acres)',
//         selector: row => row.area,
//     }
    
// ];

useEffect (()=> {
    getJobs();
    console.log(jobs);
},[]);



  return (
   <>
<div id="table">
        {/* <DataTable
          columns={columns}
          data={jobs}
        />
      </DataTableExtensions> */}

      <DataTableExtensions
       columns={columns}
   data={jobs}
   exportHeaders
   cellExport
    >
    
      <DataTable
        noHeader
        defaultSortField="id"
        defaultSortAsc={false}
        pagination
        highlightOnHover
      />
    </DataTableExtensions>

    </div>
   </>
  );

  
  
}

export default Details;