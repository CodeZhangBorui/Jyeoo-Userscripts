// ==UserScript==
// @name         菁优组卷与试卷打印处理程序
// @version      0.10
// @namespace    https://codezhangborui.github.io
// @description  【2022/9/29 更新版】自动处理菁优个人组卷与试卷界面，使其能够直接打印
// @author       CodeZhangBorui
// @match        http://www.jyeoo.com/*/paper/detail/*
// @match        https://www.jyeoo.com/*/paper/detail/*
// @match        http://www.jyeoo.com/*/report/detail/*
// @match        https://www.jyeoo.com/*/report/detail/*
// @icon         https://www.jyeoo.com/favicon.ico
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @homepage     https://github.io/CodeZhangBorui/Jyeoo-Print-Processer
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    var username = document.getElementsByClassName('user')[0].innerText;
    console.log("%c菁优组卷打印处理程序 %cBy CodeZhangBorui Version 0.10\n%c菁优网用户 %s，欢迎您使用本脚本", 'font-size: large; font-family: "微软雅黑"', 'font-size: large; font-family: "Consolas"', 'font-size: large; font-family: "微软雅黑"', username);
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
            showConfirm('请完成脚本设置：是否要在完成处理后自动刷新？<br/>默认值：是。注意：Safari 请填写 N', ['是', function(){
                localStorage.setItem("EnableAutoRefresh", 'Y');
                showMessage('设置成功！');
                showProcess('脚本设置就绪，请点击右侧“立即处理并打印”按钮执行。');
                closeBox(this);
            }], ['否', function(){
                localStorage.setItem("EnableAutoRefresh", 'N');
                showMessage('设置成功！');
                showProcess('脚本设置就绪，请点击右侧“立即处理并打印”按钮执行。');
                closeBox(this);
            }], 0);
        }
        FirstUseSettingsStep1();
    }
    console.log("🔹 创建按钮对象...");
    var tipP = document.createElement('p');
    tipP.innerText = "----- 菁优组卷与试卷打印处理程序 -----";
    var processButton = document.createElement('span');
    processButton.innerHTML = `<a href="javascript:void(0)" style="width:130px;" class="mr15"><i class="icon i-paper-07"></i><em class="m5 vm">立即处理并打印</em></a>`;
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
        function removeBorderByClassName(ClassName) {
            var obj = document.getElementsByClassName(ClassName);
            for(var i = 0; i < obj.length; i++) {
                obj[i].setAttribute('style', 'border: none;');
            }
        }
        //获取提示用信息
        var papertitle = document.getElementsByClassName('paper-title')[0].innerText;
        var subject = document.getElementsByClassName('nav-subject')[0].innerText;
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
        //去除每道题外面的边框
        removeBorderByClassName('QUES_LI');
        //通知并打印
        console.log("✅ 处理成功！");
        GM_notification(subject + '| ' + papertitle, "✅ 试卷处理成功！");
        window.print();
        //自动刷新
        if(EnableAutoRefresh) {
            window.location.reload();
        }
    }
    var settingsButton = document.createElement('span');
    settingsButton.innerHTML = `<a href="javascript:void(0)" style="width:90px;" class="mr15"><i class="icon i-paper-12"></i><em class="m5 vm">脚本设置</em></a>`;
    settingsButton.onclick = function() {
        showConfirm('设置项1：是否要在完成处理后自动刷新？<br/>默认值：是。注意：Safari 请填写 N', ['是', function(){
            localStorage.setItem("EnableAutoRefresh", 'Y');
            showMessage('设置成功！');
            closeBox(this);
        }], ['否', function(){
            localStorage.setItem("EnableAutoRefresh", 'N');
            showMessage('设置成功！');
            closeBox(this);
        }], 0);
    }
    console.log("🔹 查找将要添加的位置...");
    var willAppendPlace = document.getElementsByClassName('btn-igroup-box')[0];
    if(willAppendPlace == undefined) {
        console.error("❌ 无法找到将要添加的位置 ClassName:'btn-igroup-box'，程序现在将停止");
        showMessage('❌ 出错了<br/>脚本无法找到将要添加的位置 ClassName: btn-igroup-box，程序现在将停止。请联系脚本作者更新！', false);
    } else {
        willAppendPlace.appendChild(tipP);
        willAppendPlace.appendChild(processButton);
        willAppendPlace.appendChild(settingsButton);
        console.log("✅ 程序已就绪！");
    }
})();
