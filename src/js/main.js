/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by lian on 2017/11/16.
 */

var common = {
    initInfo: function initInfo(cls, val) {
        var self = this;
        $(cls).each(function () {
            if ($(this).attr('data-value') == val) {
                self.toggleCls($(this), cls, 'lightH');
                return false;
            }
        });
    },
    toggleCls: function toggleCls($obj, cls, active) {
        $obj.addClass(active).siblings(cls).removeClass(active);
    }
};

var Fetch = function () {
    function Fetch(params) {
        _classCallCheck(this, Fetch);

        this._age = params.age;
        this._gender = params.gender;
        this._drugsCurPages = 1;
        this._drugsSize = 3;
        this._diseasesSize = 4;
        this._drugs = [{
            id: '复方阿司匹林',
            name: '1复方阿司匹林1',
            describe: '<span>适用病因：抗细菌治疗</span><span>针对症状：眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞</span>'
        }, {
            id: '复方阿司匹林',
            name: '2复方阿司匹林2',
            describe: '<span>适用病因：抗细菌治疗</span><span>针对症状：眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞</span>'
        }, {
            id: '复方阿司匹林',
            name: '3复方阿司匹林3',
            describe: '<span>适用病因：抗细菌治疗</span><span>针对症状：眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞</span>'
        }, {
            id: '复方阿司匹林',
            name: '4复方阿司匹林4',
            describe: '<span>适用病因：抗细菌治疗</span><span>针对症状：眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞</span>'
        }, {
            id: '复方阿司匹林',
            name: '5复方阿司匹林5',
            describe: '<span>适用病因：抗细菌治疗</span><span>针对症状：眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞</span>'
        }, {
            id: '复方阿司匹林',
            name: '6复方阿司匹林6',
            describe: '<span>适用病因：抗细菌治疗</span><span>针对症状：眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞</span>'
        }, {
            id: '复方阿司匹林',
            name: '7复方阿司匹林7',
            describe: '<span>适用病因：抗细菌治疗</span><span>针对症状：眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞</span>'
        }, {
            id: '复方阿司匹林',
            name: '8复方阿司匹林8',
            describe: '<span>适用病因：抗细菌治疗</span><span>针对症状：眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞</span>'
        }];
        this._diseases = [{
            id: '1急性上呼吸道感染',
            name: '1急性上呼吸道感染',
            department: '呼吸科',
            describe: '<em>头晕、恶心、发力、</em>乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪'
        }, {
            id: '2急性上呼吸道感染',
            name: '2急性上呼吸道感染',
            department: '呼吸科',
            describe: '<em>头晕、恶心、发力、</em>乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪'
        }, {
            id: '3急性上呼吸道感染',
            name: '3急性上呼吸道感染',
            department: '呼吸科',
            describe: '<em>头晕、恶心、发力、</em>乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪'
        }, {
            id: '4急性上呼吸道感染',
            name: '4急性上呼吸道感染',
            department: '呼吸科',
            describe: '<em>头晕、恶心、发力、</em>乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪'
        }, {
            id: '5急性上呼吸道感染',
            name: '5急性上呼吸道感染',
            department: '呼吸科',
            describe: '<em>头晕、恶心、发力、</em>乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪'
        }, {
            id: '6急性上呼吸道感染',
            name: '6急性上呼吸道感染',
            department: '呼吸科',
            describe: '<em>头晕、恶心、发力、</em>乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、全身不适和肌肉酸痛，严重了可能导致流泪'
        }];
        this._inquiry = [];
    }

    _createClass(Fetch, [{
        key: 'ajax',
        value: function ajax(params) {
            $.ajax({
                type: params.type,
                url: params.url,
                data: params.data,
                dataType: 'json',
                success: params.success,
                error: function error() {
                    alert('RxThinking数据请求失败');
                }
            });
        }
    }, {
        key: 'handledStartFetch',
        value: function handledStartFetch(data) {}
    }, {
        key: 'renderDiseaseList',
        value: function renderDiseaseList() {
            var str = '',
                list = this._diseases,
                len = list.length,
                size = Math.min(len, this._diseasesSize);

            for (var i = 0; i < size; i++) {
                var _cls = i == 0 ? 'hover' : '';
                str += '<li class=' + _cls + '>' + '<div class="left" style="width: 370px;">' + '<div class="disease clearfix">' + '<div class="diseaseName fll ell">' + list[i].name + '</div>' + '<div class="weight">' + '<div class="weightBj"></div>' + '<div class="weightVal"></div>' + '</div>' + '<div class="department ell" title="' + list[i].department + '">' + list[i].department + '</div>' + '</div>' + '<div class="drugInfo clearfix">' + '<div class="hint fll">' + '<span>典型</span>' + '<span>症状</span>' + '</div>' + '<div class="detail fll">' + list[i].describe + '</div>' + '</div>' + '</div>' + '<div class="right" style="width:80px;">' + '<div class="goDrugBtn cursor-p" data-id="' + list[i].id + '">' + '<img src="/images/yao.png" alt="">' + '<span>用药方案</span>' + '</div>' + '<div class="beginAskBtn cursor-p">' + '鉴别诊断' + '</div>' + '</div>' + '</li>';
            }

            $('.diseaseListWrap').html(str);
        }
    }, {
        key: 'renderDrugsList',
        value: function renderDrugsList(pagesType) {
            var str = '',
                list = this._drugs,
                len = list.length,
                size = this._drugsSize,
                curPage = this._drugsCurPages,
                nextLen = void 0,
                start = void 0;

            if (len <= size) {
                $('.drugsPages').hide();
            } else {
                $('.drugsPages').show();
            }

            if (pagesType == '-1') {
                //上一页
                curPage = curPage - 1;
                start = (curPage - 1) * size;
                nextLen = Math.min(curPage * size, len);

                this._drugsCurPages = curPage;
            } else {
                //下一页 | 初始渲染
                if (pagesType == '1') {
                    //下一页
                    curPage = curPage + 1;
                }
                nextLen = Math.min(curPage * size, len);
                start = (curPage - 1) * size;

                this._drugsCurPages = curPage;
            }

            if (curPage <= 1) {
                $('.drugsPagesPrev').hide();
            } else {
                $('.drugsPagesPrev').show();
            }

            if (curPage * size >= len) {
                $('.drugsPagesNext').hide();
            } else {
                $('.drugsPagesNext').show();
            }

            for (var i = start; i < nextLen; i++) {
                var _cls = i == start ? "hover" : "";
                str += '<li class="drugList ' + _cls + '">' + '<div class="drugName ell">' + '<img class="" src="/images/yao.png" alt="">' + list[i].name + '</div>' + '<div class="drugInfo clearfix">' + '<div class="hint fll">' + '<span>荐</span>' + '</div>' + '<div class="detail fll ell">' + list[i].describe + '</div>' + '</div>' + '</li>';
            }

            $('.drugListWrap').html(str);
        }
    }, {
        key: 'renderInquiryList',
        value: function renderInquiryList() {}
    }]);

    return Fetch;
}();

$(function () {
    var initData = {
        age: '26',
        gender: 'GenderMale'
    };
    var fetch = new Fetch(initData);

    $('.listWrap').on('mouseenter mouseout', 'li', function () {
        if (!$(this).hasClass('hover')) {
            common.toggleCls($(this), 'li', 'hover');
        }
    });

    //点击 搜索
    $('.searchBtn').click(function () {
        var val = $('.searchInput').val();
        if (val == '') {
            alert('请输入文本描述');
            return;
        }

        startFetch({
            text: val
        });
    });

    // 点击 性别
    $('#RxThinkingCard .genderTag').click(function () {
        common.toggleCls($(this), '.genderTag', 'lightH');
    });

    // 点击 年龄
    $('#RxThinkingCard .ageTag').click(function () {
        common.toggleCls($(this), '.ageTag', 'lightH');
    });

    //疾病列表 --> 点击 用药方案
    $('#RxThinkingCard').on('click', '.goDrugBtn', function () {
        $('#RxThinkingCard .diagnoses').hide();
        $('#RxThinkingCard .drugs').show();
    });

    //疾病列表 --> 点击 鉴别诊断
    $('#RxThinkingCard').on('click', '.beginAskBtn', function () {
        $('#RxThinkingCard .diagnoses').hide();
        $('#RxThinkingCard .inquiry').show();
    });

    //用药方案 --> 点击 关闭
    $('#RxThinkingCard .drugsCloseBtn').click(function () {
        $('#RxThinkingCard .diagnoses').show();
        $('#RxThinkingCard .drugs').hide();
    });

    //用药方案 --> 上一页
    $('#RxThinkingCard').on('click', '.drugsPagesPrev', function () {
        fetch.renderDrugsList('-1');
    });

    //用药方案 --> 下一页
    $('#RxThinkingCard').on('click', '.drugsPagesNext', function () {
        fetch.renderDrugsList('1');
    });

    //问诊 --> 点击 关闭
    $('#RxThinkingCard .inqueryCloseBtn').click(function () {
        $('#RxThinkingCard .diagnoses').show();
        $('#RxThinkingCard .inquiry').hide();
    });

    //问诊 --> 点击 提前结束问诊
    $('#RxThinkingCard .inuqeryEndBtn').click(function () {
        $('#RxThinkingCard .diagnoses').show();
        $('#RxThinkingCard .inquiry').hide();
    });

    common.initInfo('.genderTag', fetch._gender);
    common.initInfo('.ageTag', fetch._age);

    fetch.renderDiseaseList();
    fetch.renderDrugsList();

    /**-------------------- fetch ---------------------**/
    function startFetch(params) {
        var data = {
            gender: fetch._gender,
            isPregnant: false,
            age: {
                year: Number(fetch._age)
            },
            text: params.text,
            options: {
                enableAskSymptom: true,
                askSymptomSize: 5,
                enableAskPastDisease: true,
                enableAskLabItem: false,
                diagnosisSize: 4
            }
        };

        fetch.ajax({
            type: 'POST',
            url: '/_/ai/v1/doctor/inquiry/start',
            data: JSON.stringify(data),
            success: function success(data) {
                fetch.handledStartFetch(data);
            }
        });
    }
});

/***/ })
/******/ ]);