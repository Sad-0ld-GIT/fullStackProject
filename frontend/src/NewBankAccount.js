import  {useState} from 'react';

function NewBankAccount(){
  //  let [stateData,setStateData]=useState({result:""})
    let [account,setaccountNumber]=useState({accountNumber:""})

    function processData(data){
        //alert(data.accountNumber)
        setaccountNumber(data)
        // alert(`Account created: ${data.accountNumber}`)
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
                // "accountType":document.getElementsByName("acctype").value,
                "accountType": document.querySelector('input[name="acctype"]:checked').value
             })
        };
        let p = fetch('http://localhost:8000/createAccount', requestOptions)
        p.then(processResponse)
        }
    
    return(
        <>
        <h3>Bank Account:</h3>
        Name <input type="text" id="na"></input> <br/>
        Country <select  id="country">
            <option value="England">England</option>
            <option value="Ireland">Ireland</option>
            <option value="Scotland">Scotland</option>
            <option value="Wales">Wales</option>
        </select><br/>
        {/* AccountType <input type="text" id="acctype"></input> <br/> */}
        <input type="radio" id="Current" name="acctype" value="Current"/>
            <label for="acctype">Current</label><br></br>
        <input type="radio" id="Savings" name="acctype" value="Savings"/>
            <label for="acctype">Savings</label><br></br>
        Account Number:<b>{account.accountNumber}</b>
        <br></br>
        <input type="button" value="New Account" onClick={ ()=>createAccount() }></input>
        </>
    )
}

export default NewBankAccount;
