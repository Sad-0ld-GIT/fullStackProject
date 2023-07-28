function CreateAccount(){
    function SaveAccount(){
        let request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "accno": Object.accno,
                "name": Object.name
             })
        };
        fetch('http://127.0.0.1:8000/createAccount',request)
    }
    return(
        <>
            <form>
                Name: <input type="text" placeholder="Enter name" id="name"></input><br/>
                Country: <select id="country">
                    <option value="England">England</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Scotland">Scotland</option>
                    <option value="Wales">Wales</option>
                </select><br/>
                Account type: <input type="radio" name="accountType" id="current" value="Current"/>
                    <label for="current">Current</label>
                <input type="radio" name="accountType" id="savings" value="Savings"/>
                    <label for="savings">Savings</label><br/>
                <input type="Button" value="Create Account" onClick={ ()=> SaveAccount()}/>
            </form>
        </>
    )
}

export default CreateAccount;
