import  {useState} from 'react';

function ShowAllEmployees(){
  let[records,setRecords] = useState([])
  function getDataFromResponse(data){
    console.log(data)
    setRecords(data)
  }
  function processResponse(response){
    let jsonPromise= response.json()
    jsonPromise.then(getDataFromResponse)
  }
  function getEmployees(){
    let responsePromise = fetch('http://localhost:8000/allEmployees')
    responsePromise.then(processResponse)
  }
  return(
    <>
      <h1>List of employees({records.length})</h1>
      <input type="button" value="Show Employees" onClick={ ()=>getEmployees() }/>
      <table>
        {
          records.map( (rec) =>
          <tr>
          <td>{rec.empno} </td><td>{rec.name} </td>
          <td>{rec.salary} </td>                
        </table>
    ) 
}
