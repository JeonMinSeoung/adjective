// 2010036422 전민승

"use strict"
var stack = [];
window.onload = function () {
    var displayVal = "0";
    var exp = "0";
    var start = 0;

    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = $(this).innerHTML;
            
            if( exp[exp.length-1]==="=" && value!=="AC" ){
                if( /\)|\/|\*|\-|\+|\=|\./g.test(value) ) alert("Please enter the equation properly.");
                else{
                    stack = [];
                    exp = value;
                    displayVal = value;
                    if(value==="("){
                        start = 1;   // start ON
                        stack.push(value);
                        displayVal = "0";
                        exp = value;
                    }    
                }
            }
            else if( exp[exp.length-1]==="=" && value==="AC" ){
                stack = [];
                displayVal = "0";
                exp = "0";
                start = 0;
            }
            else if(value==="="){
                if( (stack[stack.length-1]===")") && (/[0-9]/g.test(exp[exp.length-1])) ){
                    stack.push("*");
                    stack.push(parseFloat(displayVal));
                }
                else if( (stack[stack.length-1]===")") && (exp[exp.length-1]===")") ) ;
                else stack.push(parseFloat(displayVal));
                exp += value;
                if(isValidExpression(stack)) displayVal = postfixCalculate(infixToPostfix(stack));
                else{
                    alert("Please enter the equation properly.");
                    stack = [];
                    displayVal = "0";
                    exp = "0";
                    start = 0;
                }
            }
            else if(value === "."){
                if( !(/[.n]\.?./g.test(displayVal)) && !(/[n.]{1,1}/g.test(displayVal)) ){
                    displayVal += value;
                    exp += value;
                }
            }
            else if(value === "AC"){
                stack = [];
                displayVal = "0";
                exp = "0";
                start = 0;
            }
            else if( (value === "+") || (value === "-") || (value === "*") || (value === "/") ){
                if( /\+|\-|\*|\//g.test(exp[exp.length-1]) ) alert("Please enter the equation properly.");
                else if( (stack.length===0) && (displayVal===0) ){
                    stack.push(parseFloat(displayVal));
                    stack.push(value);
                    exp = value;
                }
                else if( (/[0-9]/g.test(displayVal)) && (stack[stack.length-1]!==")") ){
                    stack.push(parseFloat(displayVal));
                    stack.push(value);
                    exp += value;
                    displayVal = "0";
                }
                else if( (/[0-9]/g.test(displayVal)) && (stack[stack.length-1]===")") ){
                    if( exp[exp.length-1]===")" ){               // exp[exp.length-1] == end of bracket
                        stack.push(value);
                        exp += value;
                        displayVal = "0";
                    }  
                    else if( /[0-9]/g.test(exp[exp.length-1]) ){ // exp[exp.length-1] == number
                        if( (/0/g.test(exp[exp.length-1])) && (displayVal=="0") ){      // exp[exp.length-1] == number, but number "0" next to end of bracket
                            alert("Please enter the equation properly.");
                        }
                        else{
                            stack.push("*");
                            stack.push(parseFloat(displayVal));
                            stack.push(value);
                            exp += value;
                            displayVal = "0";
                        }
                    }
                    else{
                        stack.push(value);
                        exp += value;
                        displayVal = "0";
                    }
                }
                else{
                    exp += value;
                    displayVal = "0";
                }
            }
            else if( (value==="(") || (value===")") ){
                if( (value === "(") && (exp[exp.length-1]==="0") && start===0){
                    start=1;   // start ON
                    stack.push(value);
                    exp = value;  
                } 
                else if( (value === "(") && (/[0-9]/g.test(exp[exp.length-1])) && (start===1) ){
                    if( /0/g.test(exp[exp.length-1]) && (displayVal=="0") ) alert("Please enter the equation properly.");
                    else{
                        stack.push(parseFloat(displayVal));
                        stack.push("*");
                        displayVal = "0";
                        stack.push(value);
                        exp += value;
                    }
                }
                else if( (value === "(") && (/\+|\-|\*|\//g.test(exp[exp.length-1])) ){
                    stack.push(value);
                    exp += value;
                }
                else if( (value===")") && (/[0-9]/g.test(displayVal)) && !(/\)/g.test(exp[exp.length-1])) ){
                    if( stack[stack.length-1]===")" ) stack.push("*");
                    stack.push(parseFloat(displayVal));
                    displayVal = "0";
                    stack.push(value);
                    exp += value;
                }
                else if( (value===")") && (/\)/g.test(exp[exp.length-1])) ){
                    stack.push(value);
                    exp += value;
                }
            }
            else{       // value == number
                if(start===0) start=1;
                if( (exp==="0") && (displayVal==="0") ){
                    exp = value;
                    displayVal = value;
                }
                else if( (exp!=="0") && (displayVal==="0") && !(/\)/g.test(exp[exp.length-1])) )
                {
                    exp += value;
                    displayVal = value;
                }
                else if( (/\)/g.test(exp[exp.length-1])) && (value==="0") ) alert("Please enter the equation properly.");
                else if( (/\)/g.test(exp[exp.length-1])) && (/[0-9]/g.test(value)) ){
                    exp += value;
                    displayVal = value;
                }
                else{
                    exp += value;
                    displayVal += value;
                }
            }
            $('expression').innerHTML = exp;
            $('result').innerHTML = displayVal;
        };
    }
}

function isValidExpression(s) {
    var isValExp = [];
    for(var i=0; i<s.length; i++){
        if(s[i]==="(") isValExp.push(s[i]);
        else if(s[i]===")"){
            if(isValExp.length===0) return false;
            else isValExp.pop();
        }
    }
    if(isValExp.length==0) return true;
    else return false;
}

function infixToPostfix(s) {
    var priority = {
        "+":0,
        "-":0,
        "*":1,
        "/":1
    };
    var tmpStack = [];
    var result = [];
    for(var i=0; i<stack.length ; i++) {
        if(/^[0-9]+$/.test(s[i])){
            result.push(s[i]);
        } else {
            if(tmpStack.length === 0){
                tmpStack.push(s[i]);
            } else {
                if(s[i] === ")"){
                    while (true) {
                        if(tmpStack.last() === "("){
                            tmpStack.pop();
                            break;
                        } else {
                            result.push(tmpStack.pop());
                        }
                    }
                    continue;
                }
                if(s[i] ==="(" || tmpStack.last() === "("){
                    tmpStack.push(s[i]);
                } else {
                    while(priority[tmpStack.last()] >= priority[s[i]]){
                        result.push(tmpStack.pop());
                    }
                    tmpStack.push(s[i]);
                }
            }
        }
    }
    for(var i = tmpStack.length; i > 0; i--){
        result.push(tmpStack.pop());
    }
    return result;
}

function postfixCalculate(s) {
    var postfixCal = [];
    var num1;
    var num2;

    for(var i=0; i<s.length; i++){
        if(s[i]==="+" || s[i]==="-" || s[i]==="*" || s[i]==="/"){
            num1 = postfixCal.pop();
            num2 = postfixCal.pop();
            if(s[i]==="+") postfixCal.push(num1+num2);
            else if(s[i]==="-") postfixCal.push(num2-num1);
            else if(s[i]==="*") postfixCal.push(num1*num2);
            else if(s[i]==="/") postfixCal.push(num2/num1);
        }
        else postfixCal.push(s[i]);         // s[i] == number
    }
    return postfixCal;
}
