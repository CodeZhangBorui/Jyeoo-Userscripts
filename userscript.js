// ==UserScript==
// @name         菁优打印处理程序
// @version      0.2
// @namespace    https://codezhangborui.github.io
// @description  自动处理菁优个人组卷界面，使其能够直接打印
// @author       CodeZhangBorui
// @match        http://www.jyeoo.com/*/paper/detail/*
// @icon         http://www.jyeoo.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("菁优打印处理程序 V0.2 By CodeZhangBorui");
    var processButton = document.createElement('button');
    console.log("> 创建按钮对象...");
    processButton.innerHTML = '立即处理并打印';
    processButton.setAttribute('style', `margin: 5px; font`);
    processButton.setAttribute('id', `ProcessButton`);
    console.log("> 创建按钮按下函数...");
    processButton.onclick = function() {
        function deleteElementByClassName(ClassName) {
            while(1) {
                var obj = document.getElementsByClassName(ClassName)[0];
                if(obj == undefined) {
                    return;
                }
                obj.remove();
            }
        }
        function deleteElementById(Id) {
            var obj = document.getElementById(Id);
            if(obj == undefined) {
                return;
            }
            obj.remove();
        }
        //先备份
        var backup = document.body.innerHTML;
        //外部框架
        deleteElementByClassName('top');
        deleteElementById('borwserWarning');
        deleteElementByClassName('brower-tip');
        deleteElementByClassName('header');
        deleteElementById('divNav')
        deleteElementByClassName('clear');
        deleteElementByClassName('foot');
        deleteElementByClassName('fixed-bottom');
        deleteElementById('divMsg');
        deleteElementByClassName('return-top');
        //Content里内容
        deleteElementById('divBread');
        deleteElementByClassName('fright');
        deleteElementByClassName('h2-txt');
        //删除所有fieldtip
        deleteElementByClassName('fieldtip');
        //通知并打印
        console.log("V 处理成功！");
        window.print();
        //恢复备份
        document.body.innerHTML = backup;
        document.getElementById('ProcessButton').innerHTML = "打印已完成，重打请刷新";
    }
    console.log("> 查找将要添加的位置...");
    var willAppendPlace = document.getElementsByClassName('btn-igroup-box')[0];
    if(willAppendPlace == undefined) {
        console.error("! 无法找到将要添加的位置 ClassName:'btn-igroup-box'，程序现在将停止");
    } else {
        willAppendPlace.appendChild(processButton);
        console.log("V 程序已就绪！");
    }
})();
