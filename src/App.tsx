import React, { useState }  from "react";

function App() {
  const [disp, setDisp] = useState("");
  
  function clickKey(val: String){
    const last = disp.slice(-1);
    return() => {
      if(typeNumber(last) || typeNumber(val)){
        const result = disp+val;
        setDisp(result)
      }
      else{
        let result = disp.substring(0,disp.length - 1);
        result = result + val;
        setDisp(result);
      }
    }
  }

  const typeNumber = (last: String)=> {
    if(last==="+" || last==="-" || last==="/" || last==="*"){
      return false;
    }
    else{
      return true;
    }
  }
  
  function result(){
    let operations = [];
    let number = "";
    let fullNumber = 0;
    
    for(var i=0; i<disp.length; i++){
      if(typeNumber(disp.charAt(i))){
        number = number + disp.charAt(i);
      }
      else{
        fullNumber = parseInt(number);
        number = "";
        operations.push(fullNumber);
        if(i!==disp.length-1){
          operations.push(disp.charAt(i));
        }
      }
    }

    if(!typeNumber(number) || !(number === "")){
      fullNumber = parseInt(number);
      number = "";
      operations.push(fullNumber);
    }
    
    operations = operation(operations,"*");
    operations = operation(operations,"/");
    operations = operation(operations,"+");
    operations = operation(operations,"-");
    console.log(operations);
    const log = operations[0];
    setDisp(log.toString());
  }

  const operation =(list:any[], operation: String) => {
    let result = 0;
    let final:any = [];
    list.forEach((item,i) => {
      if(item === operation){
        if(operation === "*"){
          result = parseFloat(list[i-1]) * parseFloat(list[i+1])
        }
        if(operation === "/"){
          result = parseFloat(list[i-1]) / parseFloat(list[i+1])
        }
        if(operation === "+"){
          result = parseFloat(list[i-1]) + parseFloat(list[i+1])
        }
        if(operation === "-"){
          result = parseFloat(list[i-1]) - parseFloat(list[i+1])
        }
        list.splice (i-1, 3, result);
        i++;
      }
    }
    )
    return list;
  }
  
  return (
    <div className="calculator">
      <input data-testid="display" className="display" type="text" disabled value={disp}></input>

      <div className="btn-container">
        <button data-testid="btn-clear" className="btn wide" onClick={() => setDisp("")}>C</button>
        <button data-testid="btn-div" className="btn" onClick={clickKey("/")}>/</button>

        <button data-testid="btn-7" className="btn" onClick={clickKey("7")}>7</button>
        <button data-testid="btn-8" className="btn" onClick={clickKey("8")}>8</button>
        <button data-testid="btn-9" className="btn" onClick={clickKey("9")}>9</button>
        <button data-testid="btn-mul" className="btn" onClick={clickKey("*")}>*</button>

        <button data-testid="btn-4" className="btn" onClick={clickKey("4")}>4</button>
        <button data-testid="btn-5" className="btn" onClick={clickKey("5")}>5</button>
        <button data-testid="btn-6" className="btn" onClick={clickKey("6")}>6</button>
        <button data-testid="btn-sub" className="btn" onClick={clickKey("-")}>-</button>

        <button data-testid="btn-1" className="btn" onClick={clickKey("1")}>1</button>
        <button data-testid="btn-2" className="btn" onClick={clickKey("2")}>2</button>
        <button data-testid="btn-3" className="btn" onClick={clickKey("3")}>3</button>
        <button data-testid="btn-add" className="btn" onClick={clickKey("+")}>+</button>

        <button data-testid="btn-0" className="btn wide" onClick={clickKey("0")}>0</button>
        <button data-testid="btn-eval" className="btn" onClick={result}>=</button>
      </div>
    </div>
  );
}

export default App;
