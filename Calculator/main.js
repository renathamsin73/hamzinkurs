let calculatorState="ok";
let memoryStoredValue=0;
let firstOperand="";
let currentOperator="";//было let currentOperand="";
let operandExpected=false;
let operandInputed=false;
let buttons=Array.from(document.getElementsByTagName('button'));
buttons.forEach(btn=>btn.addEventListener('click',e=>processButton(e.target.id)));

function isNumber(value){
return value.length==1 && '0' <=value && value <='9';
}


function processButton(value){
if (calculatorState=='err'){
    if(isNumber(value)){
        clear();

    }else if(value!='ca'){
        return;
    }
}

let box=document.getElementById('box');
let boxValue=box.innerText;

     if(isNumber(value)){
         if(boxValue=='0' || boxValue=='-0'){
                          boxValue=boxValue.slice(0,-1);
                     }
           if(operandExpected){
             boxValue='';
            operandExpected=false;
            operandInputed=false;
             }
    boxValue+=value;
    } 

    if (['+','-','*','/'].includes(value)){
        if(firstOperand !='' && operandInputed){
            const operand=cleanNumberStr(boxValue);
            [boxValue,calculatorState]=calculate(firstOperand,operand,currentOperator);
            operandInputed=false;
        }
        firstOperand=cleanNumberStr(boxValue);
        operandExpected=true;
        currentOperator=value;
    }

    let operand ='';
    switch (value){
        case '=':
            if (operandExpected || firstOperand=='' || currentOperator=='')//Мне кажется нужно
            //if (operandExpected=='' || firstOperand=='' || currentOperator=='')
            {
                return;
            }
             secondOperand=cleanNumberStr(boxValue);
            //let operand=cleanNumberStr(boxValue);
            [boxValue,calculatorState]=calculate(firstOperand,secondOperand,currentOperator);
            operandInputed=false;
            operandExpected=true;
            firstOperand='';
            currentOperator='';
            break;
        case '.':
            if (boxValue.indexOf('.')>=0){
                return;
            }
            boxValue +='.';
            break;
        case 'sqrt':
            operand=cleanNumberStr(boxValue);
            if (operand.startsWith('-')){
                calculatorState='err'
            }else {
                boxValue=Math.sqrt(parseFloat(operand)).toString()
            }
            break;
        case 'ldivx':
            operand=cleanNumberStr(boxValue);
            if (operand == '0'){
                calculatorState='err';
            } else {
                boxValue=(1.0/parseFloat(operand)).toString()
            }
            break;
        case 'pow':
            operand=cleanNumberStr(boxValue);
            boxValue=Math.pow(parseFloat(operand),2);
            break;
        case '%':
            operand=cleanNumberStr(boxValue);
            boxValue=(parseFloat(operand)/100.0).toString();
            break;  
        case 'mr':
            boxValue=memoryStoredValue.toString();
            if(operandExpected){
                operandInputed=true;
                operandExpected=false;
            }
            break;
        case 'm+':
            operand=parseFloat(cleanNumberStr(boxValue));
            memoryStoredValue+=operand;
            break;
        case 'm-':
                operand=parseFloat(cleanNumberStr(boxValue));
                memoryStoredValue-=operand;
                break;
        case 'mc':
                   
                    memoryStoredValue=0;
                    break;
        case 'remove':
            let removed = boxValue.slice(0,-1);
            boxValue=removed.length>0 ? removed:'0';
            break;
        case 'ce':
            boxValue='0';
            break;
        case 'ca':
            clear();
            return;    
    }
    if (calculatorState == 'err'){
        boxValue='Error';
    }
    box.innerText=boxValue;

}
function cleanNumberStr(numStr){
if(numStr=='0'|| numStr=='-0' || numStr=='0.'){
    return '0';}
    return numStr;

}

function calculate(firstOperand,secondOperand,operator){
    const num1=parseFloat(firstOperand);
    const num2=parseFloat(secondOperand);
    let total=0;

    switch(operator){
        case '+':
            total=num1+num2;
            break;
        case '-':
            total=num1-num2;
            break; 
        case '*':
            total=num1*num2;
            break;        
        case '/':
            if (num2==0){
                return['','err']
            }
            total=num1/num2;
            break;        

    }
return [total.toString(),'ok']

}
function clear(){
    calculateState='ok';
    firstOperand='';
    currentOperator='';
    document.getElementById('box').innerText='0';
    operandInputed=false;
    operandExpected=false;
}