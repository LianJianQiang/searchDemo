/**
 * Created by lian on 2017/11/21.
 */

export default class Fetch {
    constructor(params) {
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

    setAttr(attr, value) {
        this[attr] = value
    }

    ajax(params) {
        $.ajax({
            type: params.type,
            url: params.url,
            data: params.data,
            dataType: 'json',
            success: params.success,
            error: function () {
                alert('RxThinking数据请求失败')
            }
        })
    }

    handlePreviewFetchDiagnosis(diagnosis) {
        let {_symptoms}=this,
            _diseases = [];

        diagnosis && diagnosis.items && diagnosis.items.length > 0 && diagnosis.items.map((val, idx)=> {
            let json = {
                    id: val.disease ? val.disease.id ? val.disease.id : '' : '',
                    name: val.disease ? val.disease.name ? val.disease.name : '' : '',
                    department: val.department ? val.department.name ? val.department.name : '' : '',
                    weight: val.weight ? parseInt(val.weight * 100) + '%' : '5%',
                    describe: ''
                },
                em = '', str = '', emArr = [], strArr = [];

            if (val.referral) {
                let referral = val.referral;
                referral.typicalSymptoms && referral.typicalSymptoms.map(item=> {
                    if (_symptoms.indexOf(item.name) >= 0) {
                        emArr.push(item.name)
                    } else {
                        strArr.push(item.name)
                    }
                });
                em = emArr.join("、");
                str = strArr.join('、');

                json.describe = `<em>${em}、</em>${str}、`;

            }

            json.describe += val.wikiAbstract ? val.wikiAbstract : '';
            _diseases.push(json);

        })

        this._diseases = _diseases;

        this.renderDiseaseList();
        this.renderTitleLightHeight();
    }

    handlePreviewFetchSymptoms(symptoms){
        let  _symptoms = [];

        symptoms && symptoms.length > 0 && symptoms.map(val=> {
            val.name ? _symptoms.push(val.name) : ''
        })

        this._symptoms = _symptoms;
        this._curInputSymptoms = [].concat(_symptoms);
        this.renderCurInputSymptoms();
    }


    handleGetDrugFetch(data) {
        let arr = [], json = {};
        if (data.items && data.items[0] && data.items[0].items) {
            let items = data.items[0].items;
            for (let i = 0; i < items.length; i++) {
                items[i].items && items[i].items &&
                items[i].items && items[i].items.map(val=> {
                    if (!json[val.id]) {
                        json[val.id] = val;
                        let _indicArr = [];
                        val.indications && val.indications.map(item=> {
                            _indicArr.push(item.name);
                        })

                        arr.push({
                            id: val.id,
                            name: val.name,
                            describe: `针对症状:${_indicArr.join(' | ')}`
                        })
                    }
                })
            }
        }

        this._drugs = arr;
        this.renderDrugsList();

    }

    handleInquiryStartFetch(data) {
        let {sid, state, questions}=data,
            _inquiry = [];
        _inquiry.push({
            sid, state, questions
        });

        this._inquiry = _inquiry;
        this.renderInquiryList();
    }

    renderTitleLightHeight() {
        let {_symptoms}=this;
        $('.titleLightHeight').html(_symptoms.join(' | '));
    }

    addCurInputSymptoms(sym){
        let {_curInputSymptoms}=this;
        _curInputSymptoms.push(sym);

        this.renderCurInputSymptoms()
    }
    renderCurInputSymptoms() {
        let {_curInputSymptoms}=this,
            str = _curInputSymptoms.join(' | ');
        $(".curInputSymptoms").html(str).attr({title: str});
    }

    renderDiseaseList() {
        let str = '',
            list = this._diseases,
            len = list.length,
            size = Math.min(len, this._diseasesSize);

        for (let i = 0; i < size; i++) {
            let _cls = i == 0 ? 'hover' : '';
            str += '<li class=' + _cls + '>' +
                '<div class="left" style="width: 370px;">' +
                '<div class="disease clearfix">' +
                '<div class="diseaseName fll ell">' +
                list[i].name +
                '</div>' +
                '<div class="weight">' +
                '<div class="weightBj"></div>' +
                '<div class="weightVal" style="width:' + list[i].weight + '"></div>' +
                '</div>';

            if (list[i].department && list[i].department != '') {
                str += '<div class="department ell" title="' + list[i].department + '">' +
                    list[i].department +
                    '</div>'
            }

            str += '</div>' +
                '<div class="drugInfo clearfix">' +
                '<div class="hint fll">' +
                '<span>典型</span>' +
                '<span>症状</span>' +
                '</div>' +
                '<div class="detail fll" title="' + list[i].describe + '">' +
                list[i].describe +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="right" style="width:80px;">' +
                '<div class="goDrugBtn cursor-p" data-id="' + list[i].id + '" data-name="' + list[i].name + '">' +
                '<img src="/images/yao.png" alt="">' +
                '<span>用药方案</span>' +
                '</div>' +
                '<div class="beginAskBtn cursor-p">' +
                '鉴别诊断' +
                '</div>' +
                '</div>' +
                '</li>'
        }

        $('.diseaseListWrap').html(str);
    }

    renderDrugsList(pagesType) {
        let str = '',
            list = this._drugs,
            len = list.length,
            size = this._drugsSize,
            curPage = this._drugsCurPages,
            nextLen, start;

        if (len <= size) {
            $('.drugsPages').hide();
        } else {
            $('.drugsPages').show();
        }

        if (pagesType == '-1') {  //上一页
            curPage = curPage - 1;
            start = (curPage - 1) * size;
            nextLen = Math.min((curPage) * size, len);

            this._drugsCurPages = curPage;

        } else {      //下一页 | 初始渲染
            if (pagesType == '1') {     //下一页
                curPage = curPage + 1;
            }
            nextLen = Math.min(curPage * size, len);
            start = (curPage - 1) * size;

            this._drugsCurPages = curPage;
        }

        if (curPage <= 1) {
            $('.drugsPagesPrev').hide()
        } else {
            $('.drugsPagesPrev').show()
        }

        if (curPage * size >= len) {
            $('.drugsPagesNext').hide();
        } else {
            $('.drugsPagesNext').show();
        }

        for (let i = start; i < nextLen; i++) {
            let _cls = i == start ? "hover" : "";
            str += '<li class="drugList ' + _cls + '">' +
                '<div class="drugName ell">' +
                '<img class="" src="/images/yao.png" alt="">' +
                list[i].name +
                '</div>' +
                '<div class="drugInfo clearfix">' +
                '<div class="hint fll">' +
                '<span>荐</span>' +
                '</div>' +
                '<div class="detail fll ell">' +
                list[i].describe +
                '</div>' +
                '</div>' +
                '</li>'
        }

        $('.drugListWrap').html(str);
    }

    getLastQInfo(){
        let {_inquiry}=this,
            len = _inquiry.length,
            lastQ = _inquiry[len - 1],
            {sid,state,questions}=lastQ,
            {id}=questions[0];

        return {sid,state,id,lastQ}

    }
    renderInquiryList() {
        let {_inquiry}=this,
            len = _inquiry.length,
            lastQ = _inquiry[len - 1],
            optionS = '',
            {text,options}=lastQ.questions[0];

        options.map(val=> {
            optionS += `<li class="optionsList cursor-p"  data-key="${val.key}" data-answer="${val.answer || ''}">
                            ${val.text}
                        </li>`
        });

        $('.inquiryListWrap .question').html(text);
        $('.inquiryListWrap .optionsListWrap').html(optionS);

    }

}
