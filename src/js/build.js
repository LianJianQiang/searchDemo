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


var _common = __webpack_require__(1);

var _fetch = __webpack_require__(2);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by lian on 2017/11/16.
 */

$(function () {
    var initData = {
        age: '26',
        gender: 'GenderMale'
    };
    var fetch = new _fetch2.default(initData);

    $('.listWrap').on('mouseenter mouseout', 'li', function () {
        if (!$(this).hasClass('hover')) {
            _common.common.toggleCls($(this), 'li', 'hover');
        }
    });

    //点击 搜索
    $('.searchBtn').click(function () {
        var val = $('.searchInput').val();
        if (val == '') {
            alert('请输入文本描述');
            return;
        }

        previewFetch({
            text: val,
            cb: function cb() {
                $('#RxThinkingCard').show();
            }
        });
    });

    // 点击 性别
    $('#RxThinkingCard .genderTag').click(function () {
        if ($(this).hasClass('cursor-no')) return;
        _common.common.toggleCls($(this), '.genderTag', 'lightH');
        fetch.setAttr('_gender', $(this).attr('data-value'));
        $('.searchBtn').click();
    });

    // 点击 年龄
    $('#RxThinkingCard .ageTag').click(function () {
        if ($(this).hasClass('cursor-no')) return;
        _common.common.toggleCls($(this), '.ageTag', 'lightH');
        fetch.setAttr('_age', $(this).attr('data-value'));
        $('.searchBtn').click();
    });

    //疾病列表 --> 点击 用药方案
    $('#RxThinkingCard').on('click', '.goDrugBtn', function () {
        var id = $(this).attr('data-id'),
            name = $(this).attr('data-name');

        if (!id) {
            alert('数据请求失败');
            return;
        }

        if ($('.header .tag').hasClass('cursor-no')) {
            $('.drugsCloseBtn').addClass('noCur');
        } else {
            $('.drugsCloseBtn').removeClass('noCur');
        }
        getDrugFetch({
            id: id,
            cb: function cb() {

                $('#RxThinkingCard .diagnoses').hide();
                $('#RxThinkingCard .drugs').show();
                $('.drugsDiseaseName').html(name);
                $('.header .tag').addClass('cursor-no');
            }
        });
    });

    //疾病列表 --> 点击 鉴别诊断
    $('#RxThinkingCard').on('click', '.beginAskBtn', function () {
        var val = $('.searchInput').val();
        if (val == '') {
            alert('请输入文本描述');
            return;
        }

        startFetch({
            text: val,
            cb: function cb() {
                $('#RxThinkingCard .diagnoses').hide();
                $('#RxThinkingCard .inquiry').show();
                $('.header .tag').addClass('cursor-no');
            }
        });
    });

    //用药方案 --> 点击 关闭
    $('#RxThinkingCard .drugsCloseBtn').click(function () {

        if (!$(this).hasClass('noCur')) {
            $('.header .tag').removeClass('cursor-no');
        }

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
    $('.inqueryCloseBtn').click(function () {
        $('.header .tag').removeClass('cursor-no');
        fetch.initCurInputSymptoms();

        endInquiry();
    });

    function endInquiry() {

        $('#RxThinkingCard .diagnoses').show();
        $('#RxThinkingCard .inquiry').hide();
    }

    //问诊 --> 点击 提前结束问诊
    $('#RxThinkingCard .inuqeryEndBtn').click(function () {

        nextFetch({
            "options": {
                "diagnosisSize": 4
            },
            cb: function cb() {
                $('#RxThinkingCard .diagnoses').show();
                $('#RxThinkingCard .inquiry').hide();
            }
        });
    });

    $('#RxThinkingCard .optionsListWrap').on('click', '.optionsList', function () {
        var key = $(this).attr('data-key'),
            answer = $(this).attr('data-answer');

        nextFetch({
            value: [key],
            cb: function cb() {
                answer && fetch.addCurInputSymptoms(answer);
            }
        });
    });

    _common.common.initInfo('.genderTag', fetch._gender);
    _common.common.initInfo('.ageTag', fetch._age);

    /**-------------------- fetch ---------------------**/
    function previewFetch(params) {
        var data = {
            gender: fetch._gender,
            isPregnant: false,
            age: {
                year: Number(fetch._age)
            },
            text: params.text,
            options: {
                diagnosisSize: 4
            }
        };
        fetch.ajax({
            type: 'POST',
            url: '/_/ai/v1/doctor/inquiry/preview',
            data: JSON.stringify(data),
            success: function success(data) {
                //注意两个handle的顺序
                fetch.handlePreviewFetchSymptoms(data.symptoms || []);
                fetch.handlePreviewFetchDiagnosis(data.diagnosis || {});

                typeof params.cb == 'function' && params.cb();
            }
        });
    }

    function getDrugFetch(params) {
        var data = {
            ids: [{
                id: params.id,
                type: 'EntityTypeDisease'
            }]
        };
        fetch.ajax({
            type: 'POST',
            url: '/_/ai/v1/doctor/entity/drug-usage-plans',
            data: JSON.stringify(data),
            success: function success(data) {
                fetch.handleGetDrugFetch(data);
                typeof params.cb == 'function' && params.cb();
            }
        });
    }

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
                fetch.handleInquiryStartFetch(data);
                typeof params.cb == 'function' && params.cb();
            }
        });
    }

    function nextFetch(params) {
        var value = params.value,
            options = params.options,
            _fetch$getLastQInfo = fetch.getLastQInfo(),
            sid = _fetch$getLastQInfo.sid,
            state = _fetch$getLastQInfo.state,
            id = _fetch$getLastQInfo.id;

        var data = {
            sid: sid, state: state
        };

        if (value) {
            data.selections = [{
                id: id, value: value
            }];
        }

        if (options) {
            data.options = options;
        }

        fetch.ajax({
            type: 'POST',
            url: '/_/ai/v1/doctor/inquiry/next',
            data: JSON.stringify(data),
            success: function success(data) {
                if (data.diagnosis) {
                    fetch.handlePreviewFetchDiagnosis(data.diagnosis || {});
                    endInquiry();
                    $('.diseaseListWrap li').addClass('fromInquiry');
                } else if (data.questions) {
                    fetch.handleInquiryStartFetch(data);
                }

                typeof params.cb == 'function' && params.cb();
            }
        });
    }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by lian on 2017/11/21.
 */

var common = exports.common = {
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by lian on 2017/11/21.
 */

var Fetch = function () {
    function Fetch(params) {
        _classCallCheck(this, Fetch);

        this._age = params.age;
        this._gender = params.gender;
        this._drugsCurPages = 1;
        this._drugsSize = 3;
        this._diseasesSize = 4;
        this._symptoms = [];
        this._drugs = [
            /*
             {
             id: '复方阿司匹林',
             name: '1复方阿司匹林1',
             describe: '<span>适用病因：抗细菌治疗</span><span>针对症状：眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞眼痒｜喷嚏｜流涕｜鼻塞</span>'
             }
             */
        ];
        this._diseases = [
            /*
             {
             id:'1急性上呼吸道感染',
             name:'1急性上呼吸道感染',
             department:'呼吸科',
             describe:'<em>头晕、恶心、发力、</em>乏力、全身不适和肌肉酸痛，严重了可能导致流泪乏力、...'
             }
             */
        ];
        this._inquiry = [];
        this._curInputSymptoms = [];
    }

    _createClass(Fetch, [{
        key: 'setAttr',
        value: function setAttr(attr, value) {
            this[attr] = value;
        }
    }, {
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
        key: 'handlePreviewFetchDiagnosis',
        value: function handlePreviewFetchDiagnosis(diagnosis) {
            var _symptoms = this._symptoms,
                _diseases = [];


            diagnosis && diagnosis.items && diagnosis.items.length > 0 && diagnosis.items.map(function (val, idx) {
                var json = {
                    id: val.disease ? val.disease.id ? val.disease.id : '' : '',
                    name: val.disease ? val.disease.name ? val.disease.name : '' : '',
                    department: val.department ? val.department.name ? val.department.name : '测试科' : '测试科',
                    weight: val.weight ? parseInt(val.weight * 100) + '%' : '5%',
                    describe: ''
                },
                    em = '',
                    str = '',
                    emArr = [],
                    strArr = [];

                if (val.referral) {
                    var referral = val.referral;
                    referral.typicalSymptoms && referral.typicalSymptoms.map(function (item) {
                        if (_symptoms.indexOf(item.name) >= 0) {
                            emArr.push(item.name);
                        } else {
                            strArr.push(item.name);
                        }
                    });
                    em = emArr.join("、");
                    str = strArr.join('、');

                    json.describe = '<em>' + em + '\u3001</em>' + str + '\u3001';
                }

                json.describe += val.wikiAbstract ? val.wikiAbstract : '';
                _diseases.push(json);
            });

            this._diseases = _diseases;

            this.renderDiseaseList();
            this.renderTitleLightHeight();
        }
    }, {
        key: 'handlePreviewFetchSymptoms',
        value: function handlePreviewFetchSymptoms(symptoms) {
            var _symptoms = [];

            symptoms && symptoms.length > 0 && symptoms.map(function (val) {
                val.name ? _symptoms.push(val.name) : '';
            });

            this._symptoms = _symptoms;

            this.initCurInputSymptoms();
        }
    }, {
        key: 'initCurInputSymptoms',
        value: function initCurInputSymptoms() {
            this._curInputSymptoms = [].concat(this._symptoms);
            this.renderCurInputSymptoms();
        }
    }, {
        key: 'handleGetDrugFetch',
        value: function handleGetDrugFetch(data) {
            var arr = [],
                json = {};
            if (data.items && data.items[0] && data.items[0].items) {
                var items = data.items[0].items;
                for (var i = 0; i < items.length; i++) {
                    items[i].items && items[i].items && items[i].items && items[i].items.map(function (val) {
                        if (!json[val.id]) {
                            json[val.id] = val;
                            var _indicArr = [];
                            val.indications && val.indications.map(function (item) {
                                _indicArr.push(item.name);
                            });

                            arr.push({
                                id: val.id,
                                name: val.name,
                                describe: '\u9488\u5BF9\u75C7\u72B6:' + _indicArr.join(' | ')
                            });
                        }
                    });
                }
            }

            this._drugs = arr;
            this.renderDrugsList();
        }
    }, {
        key: 'handleInquiryStartFetch',
        value: function handleInquiryStartFetch(data) {
            var sid = data.sid,
                state = data.state,
                questions = data.questions,
                _inquiry = [];

            _inquiry.push({
                sid: sid, state: state, questions: questions
            });

            this._inquiry = _inquiry;
            this.renderInquiryList();
        }
    }, {
        key: 'renderTitleLightHeight',
        value: function renderTitleLightHeight() {
            var _symptoms = this._symptoms;

            $('.titleLightHeight').html(_symptoms.join(' | '));
        }
    }, {
        key: 'addCurInputSymptoms',
        value: function addCurInputSymptoms(sym) {
            var _curInputSymptoms = this._curInputSymptoms;

            _curInputSymptoms.push(sym);

            this.renderCurInputSymptoms();
        }
    }, {
        key: 'renderCurInputSymptoms',
        value: function renderCurInputSymptoms() {
            var _curInputSymptoms = this._curInputSymptoms,
                str = _curInputSymptoms.join(' | ');

            $(".curInputSymptoms").html(str).attr({ title: str });
        }
    }, {
        key: 'renderDiseaseList',
        value: function renderDiseaseList() {
            var str = '',
                list = this._diseases,
                len = list.length,
                size = Math.min(len, this._diseasesSize);

            for (var i = 0; i < size; i++) {
                var _cls = i == 0 ? 'hover' : '';
                str += '<li class=' + _cls + '>' + '<div class="left" style="width: 370px;">' + '<div class="disease clearfix">' + '<div class="diseaseName fll ell">' + list[i].name + '</div>' + '<div class="weight">' + '<div class="weightBj"></div>' + '<div class="weightVal" style="width:' + list[i].weight + '"></div>' + '</div>';

                if (list[i].department && list[i].department != '') {
                    str += '<div class="department ell" title="' + list[i].department + '">' + list[i].department + '</div>';
                }

                str += '</div>' + '<div class="drugInfo clearfix">' + '<div class="hint fll">' + '<span>典型</span>' + '<span>症状</span>' + '</div>' + '<div class="detail fll" title="' + list[i].describe + '">' + list[i].describe + '</div>' + '</div>' + '</div>' + '<div class="right" style="width:80px;">' + '<div class="goDrugBtn cursor-p" data-id="' + list[i].id + '" data-name="' + list[i].name + '">' + '<img src="/images/yao.png" alt="">' + '<span>用药方案</span>' + '</div>' + '<div class="beginAskBtn cursor-p">' + '鉴别诊断' + '</div>' + '</div>' + '</li>';
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
        key: 'getLastQInfo',
        value: function getLastQInfo() {
            var _inquiry = this._inquiry,
                len = _inquiry.length,
                lastQ = _inquiry[len - 1],
                sid = lastQ.sid,
                state = lastQ.state,
                questions = lastQ.questions,
                id = questions[0].id;


            return { sid: sid, state: state, id: id, lastQ: lastQ };
        }
    }, {
        key: 'renderInquiryList',
        value: function renderInquiryList() {
            var _inquiry = this._inquiry,
                len = _inquiry.length,
                lastQ = _inquiry[len - 1],
                optionS = '',
                _lastQ$questions$ = lastQ.questions[0],
                text = _lastQ$questions$.text,
                options = _lastQ$questions$.options;


            options.map(function (val) {
                optionS += '<li class="optionsList cursor-p"  data-key="' + val.key + '" data-answer="' + (val.answer || '') + '">\n                            ' + val.text + '\n                        </li>';
            });

            $('.inquiryListWrap .question').html(text);
            $('.inquiryListWrap .optionsListWrap').html(optionS);
        }
    }]);

    return Fetch;
}();

exports.default = Fetch;

/***/ })
/******/ ]);