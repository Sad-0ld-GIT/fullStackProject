import  {useState} from 'react';

function NewBankAccount(){
  //  let [stateData,setStateData]=useState({result:""})
    let [account,setaccountNumber]=useState({accountNumber:""})

    function processData(data){
        //alert(data.accountNumber)
        setaccountNumber(data)
    }

    function processResponse(response){
        let promiseJson= response.json()
        promiseJson.then(processData)
    }

    function createAccount(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name":document.getElementById("na").value,
                "country":document.getElementById("country").value,
                "accountType":document.getElementById("acctype").value
             })
        };
        let p = fetch('http://localhost:8000/createAccount', requestOptions)
        p.then(processResponse)
        }
    
    return(
        <>
        <h3>Bank Account:</h3>
        Name <input type="text" id="na"></input> <br/>
        Country <input type="text" id="country"></input> <br/>
        AccountType <input type="text" id="acctype"></input> <br/>
        Account Number:<b>{account.accountNumber}</b>
        <br></br>
        <input type="button" value="New Account" onClick={ ()=>createAccount() }></input>
        </>
    )
}

export default NewBankAccount;
