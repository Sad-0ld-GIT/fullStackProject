function NewEmployee(){
    function SaveEmployee(){
        let request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "empno":9876,
                "ename":"Aditya",
                "dept":"NBS",
                "salary":76000
             })
        };
        fetch('http://127.0.0.1:8000/saveEmployee',request)
    }
    return(
        <>
            <h1> Enter Empoyee</h1>
            <input type="Button" value="New Employee" onClick={ ()=> SaveEmployee()}></input>
        </>
    )
}

export default NewEmployee;
