/**
 * Created by lian on 2017/11/16.
 */

import {common} from "./common";
import Fetch from "./fetch";

$(function () {
    const initData = {
        age: '26',
        gender: 'GenderMale'
    };
    const fetch = new Fetch(initData);

    $('.listWrap').on('mouseenter mouseout', 'li', function () {
        if (!$(this).hasClass('hover')) {
            common.toggleCls($(this), 'li', 'hover');
        }
    });

    //点击 搜索
    $('.searchBtn').click(function () {
        let val = $('.searchInput').val();
        if (val == '') {
            alert('请输入文本描述');
            return;
        }

        previewFetch({
            text: val,
            cb(){
                $('#RxThinkingCard').show();
            }
        })
    });

    // 点击 性别
    $('#RxThinkingCard .genderTag').click(function () {
        if($(this).hasClass('cursor-no'))return;
        common.toggleCls($(this), '.genderTag', 'lightH');
        fetch.setAttr('_gender', $(this).attr('data-value'));
        $('.searchBtn').click();
    });

    // 点击 年龄
    $('#RxThinkingCard .ageTag').click(function () {
        if($(this).hasClass('cursor-no'))return;
        common.toggleCls($(this), '.ageTag', 'lightH');
        fetch.setAttr('_age', $(this).attr('data-value'));
        $('.searchBtn').click();
    });

    //疾病列表 --> 点击 用药方案
    $('#RxThinkingCard').on('click', '.goDrugBtn', function () {
        let id = $(this).attr('data-id'),
            name = $(this).attr('data-name');

        if (!id) {
            alert('数据请求失败');
            return;
        }

        if($('.header .tag').hasClass('cursor-no')){
            $('.drugsCloseBtn').addClass('noCur');
        }else{
            $('.drugsCloseBtn').removeClass('noCur');
        }
        getDrugFetch({
            id,
            cb(){

                $('#RxThinkingCard .diagnoses').hide();
                $('#RxThinkingCard .drugs').show();
                $('.drugsDiseaseName').html(name);
                $('.header .tag').addClass('cursor-no');
            }
        })
    });

    //疾病列表 --> 点击 鉴别诊断
    $('#RxThinkingCard').on('click', '.beginAskBtn', function () {
        let val = $('.searchInput').val();
        if (val == '') {
            alert('请输入文本描述');
            return;
        }

        startFetch({
            text: val,
            cb: function () {
                $('#RxThinkingCard .diagnoses').hide();
                $('#RxThinkingCard .inquiry').show();
                $('.header .tag').addClass('cursor-no');
            }
        })
    });

    //用药方案 --> 点击 关闭
    $('#RxThinkingCard .drugsCloseBtn').click(function () {

        if(!$(this).hasClass('noCur')){
            $('.header .tag').removeClass('cursor-no');
        }

        $('#RxThinkingCard .diagnoses').show();
        $('#RxThinkingCard .drugs').hide();
    });

    //用药方案 --> 上一页
    $('#RxThinkingCard').on('click', '.drugsPagesPrev', function () {
        fetch.renderDrugsList('-1')
    });

    //用药方案 --> 下一页
    $('#RxThinkingCard').on('click', '.drugsPagesNext', function () {
        fetch.renderDrugsList('1')
    });

    //问诊 --> 点击 关闭
    $('.inqueryCloseBtn').click(function () {
        $('.header .tag').removeClass('cursor-no');
        fetch.initCurInputSymptoms();

        endInquiry()

    });

    function endInquiry(){

        $('#RxThinkingCard .diagnoses').show();
        $('#RxThinkingCard .inquiry').hide();
    }

    //问诊 --> 点击 提前结束问诊
    $('#RxThinkingCard .inuqeryEndBtn').click(function () {

        nextFetch({
            "options": {
                "diagnosisSize": 4
            },
            cb(){
                $('#RxThinkingCard .diagnoses').show();
                $('#RxThinkingCard .inquiry').hide();
            }
        });

    });

    $('#RxThinkingCard .optionsListWrap').on('click', '.optionsList', function () {
        let key = $(this).attr('data-key'),
            answer = $(this).attr('data-answer');

        nextFetch({
            values: [key],
            cb(){
                answer && fetch.addCurInputSymptoms(answer);
            }
        })
    });

    common.initInfo('.genderTag', fetch._gender);
    common.initInfo('.ageTag', fetch._age);


    /**-------------------- fetch ---------------------**/
    function previewFetch(params) {
        let data = {
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
            success: function (data) {
                //注意两个handle的顺序
                fetch.handlePreviewFetchSymptoms(data.symptoms || []);
                fetch.handlePreviewFetchDiagnosis(data.diagnosis || {});

                typeof params.cb == 'function' && params.cb()
            }
        })
    }

    function getDrugFetch(params) {
        let data = {
            ids: [
                {
                    id: params.id,
                    type: 'EntityTypeDisease'
                }
            ]
        };
        fetch.ajax({
            type: 'POST',
            url: '/_/ai/v1/doctor/entity/drug-usage-plans',
            data: JSON.stringify(data),
            success: function (data) {
                fetch.handleGetDrugFetch(data);
                typeof params.cb == 'function' && params.cb()
            }
        })
    }

    function startFetch(params) {
        let data = {
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
            success: function (data) {
                fetch.handleInquiryStartFetch(data);
                typeof params.cb == 'function' && params.cb()
            }
        })
    }

    function nextFetch(params) {
        let {values, options}=params,
            {sid, state, id}=fetch.getLastQInfo();

        let data = {
                sid, state
            };

        if (values) {
            data.selections = [
                {
                    id, values
                }
            ];
        }

        if (options) {
            data.options=options;
        }

        fetch.ajax({
            type: 'POST',
            url: '/_/ai/v1/doctor/inquiry/next',
            data: JSON.stringify(data),
            success: function (data) {
                if (data.diagnosis) {
                    $('.globalLoading').css("display","flex");
                    setTimeout(()=>{
                        $('.globalLoading').css("display","none");
                        setTimeout(()=>{
                            fetch.handlePreviewFetchDiagnosis(data.diagnosis || {});
                            endInquiry();
                            $('.diseaseListWrap li').addClass('fromInquiry');
                        },100);
                    },2000)

                } else if (data.questions) {
                    fetch.handleInquiryStartFetch(data);
                }

                typeof params.cb == 'function' && params.cb()
            }
        })
    }

});



