const codeList = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
const frame = '|';

function checkCode(codeNum) { //计算校验码
    let sum = 0;
    for (let item of codeNum) {
        sum += Number(item);
    }
    return Math.ceil(sum / 10) * 10 - sum;
}

function isTenCode(inputs) { //判断是否是十位编码
    return inputs.indexOf('-') !== -1;
}

function tenToNine(inputs) {
    return inputs.substring(0, 5) + inputs.substring(6, 10);
}

function encodePostCode(inputs) {
    if (isTenCode(inputs)) {
        inputs = tenToNine(inputs);
    }
    let codeNum = inputs.split('');
    let code = [];
    for (let item of codeNum) {
        code.push(codeList[Number(item)]);
    }
    code.push(codeList[checkCode(codeNum)]);
    let res = code.join('');
    console.log(`输出是：${frame + res + frame}`);
    return frame + res + frame;
}

function codeSplit(codeStr) {
    let result = [];
    for (let i = 0; i * 5 < codeStr.length; i++) {
        result.push(codeStr.substr(i * 5, 5));
    }
    return result;
}

function codeToNum(codeArr) {
    let result = [];
    while (codeArr.length !== 0) {
        result.push(codeList.indexOf(codeArr.shift()));
    }
    return result;
}

function decodePostCode(inputs) {
    let codeStr = inputs.substring(1, inputs.length - 1);
    let codeArr = codeSplit(codeStr);
    let codeNum = codeToNum(codeArr);
    let checkcode = codeNum.pop();
    if (checkCode(codeNum) === checkcode) {
        if (codeNum.length === 9) {
            codeNum.splice(5, 0, '-');
        }
        console.log(`输出是：${codeNum.join('')}`);
        return codeNum.join('');
    } else {
        console.log('校验码出错，条码无效');
        return '校验码出错，条码无效';
    }
}

function isPostCode(inputs) {
    return inputs[0] === '|';
}

function verifyInputs(inputs) {
    const reg1 = /^\d{5}$/;
    const reg2 = /^\d{5}\-\d{4}$/;
    const reg3 = /^\d{9}/;
    const reg4 = /^\|.{50}\|$/;
    const reg5 = /^\|.{30}\|$/;
    if (reg1.test(inputs) || reg2.test(inputs) || reg3.test(inputs) || reg4.test(inputs) || reg5.test(inputs)) {
        return true;
    }
    return false;
}


function main(inputs) {
    console.log(`输入是：${inputs}`);
    if (verifyInputs(inputs)) {
        if (isPostCode(inputs)) {
            return decodePostCode(inputs);
        } else {
            return encodePostCode(inputs);
        }
    } else {
        console.log('输入无效');
        return '输入无效';
    }
}

module.exports = main;
