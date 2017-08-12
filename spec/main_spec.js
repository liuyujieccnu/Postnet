"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var main = require("../lib/main.js");


describe("邮编转换测试", function () {
    sinon.spy(console, 'log');

    it("五位邮编编码测试", function () {
        let result = main('95713');
        let expect_string = '||:|:::|:|:|:::|:::||::||::|:|:|';
        expect(expect_string).to.equal(result);
    });

    it("九位邮编编码测试", function(){
        var result = main('181921237');
        var expect_string ='|:::|||::|::::|||:|::::|:|:::||::|:|::||:|:::|:||::|';
        expect(expect_string).to.equal(result);
    });

    it("十位邮编编码", function(){
        var result = main('55555-1237');
        var expect_string ='|:|:|::|:|::|:|::|:|::|:|::::||::|:|::||:|:::|::|:||';
        expect(expect_string).to.equal(result);
    });

    it("五位条码译码", function(){
        var result = main('||:|:::|:|:|:::|:::||::||::|:|:|');
        var expect_string ='95713';
        expect(expect_string).to.equal(result);
    });

    it("九位条码译码", function(){
        var result = main('|:|:|::|:|::|:|::|:|::|:|::::||::|:|::||:|:::|::|:||');
        var expect_string ='55555-1237';
        expect(expect_string).to.equal(result);
    });

    it("译码时校验码错误", function(){
        var result = main('|:|:|::|:|::|:|::|:|::|:|::::||::|:|::||:|:::||::|:|');
        var expect_string ='校验码出错，条码无效';
        expect(expect_string).to.equal(result);
    });

});
