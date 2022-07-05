// ==UserScript==
// @name         菁优打印处理程序
// @version      0.5
// @namespace    https://codezhangborui.github.io
// @description  自动处理菁优个人组卷界面，使其能够直接打印
// @author       CodeZhangBorui
// @match        http://www.jyeoo.com/*/paper/detail/*
// @match        https://www.jyeoo.com/*/paper/detail/*
// @icon         https://www.jyeoo.com/favicon.ico
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @homepage     https://github.io/CodeZhangBorui/Jyeoo-Print-Processer
// @license      MIT
// ==/UserScript==
 
(function() {
    'use strict';
    console.log("菁优打印处理程序 By CodeZhangBorui");
    GM_registerMenuCommand("处理后自动刷新", () => {
        if (localStorage.getItem("EnableAutoRefresh") == 'N'){
            localStorage.setItem("EnableAutoRefresh", 'Y');
            GM_notification("处理后自动刷新：已开启");
        } else {
            localStorage.setItem("EnableAutoRefresh", 'N');
            GM_notification("处理后自动刷新：已关闭");
        }
    })
    if(localStorage.getItem("EnableAutoRefresh") == null) {
        localStorage.setItem("EnableAutoRefresh", 'Y');
        function FirstUseSettingsStep1() {
            var promptback = prompt('是否要在完成处理后自动刷新 (是=Y，否=N)？\n使用默认值请留空\n注意：Safari 请填写 N', localStorage.getItem("EnableAutoRefresh"));
            if(promptback == null) {
                FirstUseSettingsStep1();
            } else {
                if(promptback == 'Y') {
                    localStorage.setItem("EnableAutoRefresh", 'Y');
                    return;
                } else if(promptback == 'N') {
                    localStorage.setItem("EnableAutoRefresh", 'N');
                    return;
                } else if(promptback == '') {
                    localStorage.setItem("EnableAutoRefresh", 'Y');
                    return;
                } else {
                    alert('输入的内容无效！');
                    FirstUseSettingsStep1();
                }
            }
        }
        alert('欢迎使用 菁优打印处理程序 By CodeZhangBorui\n这貌似是您第一次使用此程序，请先完成一些设置。');
        FirstUseSettingsStep1();
        alert('设置完成！\n脚本设置位于脚本列表处。');
    }
    console.log("> 创建按钮对象...");
    var processButton = document.createElement('button');
    processButton.innerHTML = '立即处理并打印';
    processButton.setAttribute('style', 'margin: 5px; font');
    processButton.setAttribute('id', 'ProcessButton');
    processButton.onclick = function() {
        /*
         * 打印完成后自动刷新：true/false
         */
        var EnableAutoRefresh = localStorage.getItem("EnableAutoRefresh")=='Y'?true:false;
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
        GM_notification("试卷处理成功！");
        window.print();
        //自动刷新
        if(EnableAutoRefresh) {
            window.location.reload();
        }
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