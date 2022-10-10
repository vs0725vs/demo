$(document).ready(function () {
    // alert('abc');
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json');

    ajaxobj.getall();

    // 新增按鈕
    $(".addBtn").click(function () {
        // document.querySelector('.modal-backdrop').style.display="block";
    })

    $("#addData").click(function (e) {
        var url = "ajax/ajaxCard";
        var cnname = $("#cnname").val();
        var enname = $("#enname").val();
        var phone = $("#phone").val();
        var mail = $("#mail").val();
        var sex = $('input:radio:checked[name="addsex"]').val();

        let verifyCheck = verify(cnname, enname, phone, mail, '#addForm');

        if (verifyCheck == 0) {
            var ajaxobj = new AjaxObject(url, 'json');
            ajaxobj.cnname = cnname;
            ajaxobj.enname = enname;
            ajaxobj.phone = phone;
            ajaxobj.mail = mail;
            ajaxobj.sex = sex;
            var newData = [];
            newData[0] = {};
            newData[0].cnname = cnname;
            newData[0].enname = enname;
            newData[0].phone = phone;
            newData[0].mail = enname;
            newData[0].sex = sex;
            ajaxobj.add(newData);
            reset(this.dataset.name);
            // 關閉視窗
            $('#addDialog').modal('hide')
        }
        e.preventDefault(); // avoid to execute the actual submit of the form.
    })

    // 搜尋按鈕
    $("#searchData").click(function (e) {
        var url = "ajax/ajaxCard";
        var enname = $("#searchEn").val();
        var cnname = $("#searchCn").val();
        var phone = $("#searchPhone").val();
        var mail = $("#searchMail").val();
        var sex = $('input:radio:checked[name="searchSex"]').val();
        let verifyCheck = verify(cnname, enname, phone, mail, '#searchForm');

        if (verifyCheck == 0) {
            var ajaxobj = new AjaxObject(url, 'json');
            ajaxobj.cnname = cnname;
            ajaxobj.enname = enname;
            ajaxobj.phone = phone;
            ajaxobj.mail = mail;
            ajaxobj.sex = sex;
            var newData = [];
            newData[0] = {};
            newData[0].cnname = cnname;
            newData[0].enname = enname;
            newData[0].phone = phone;
            newData[0].mail = mail;
            newData[0].sex = sex;
            ajaxobj.search(newData);
            reset(this.dataset.name);
            // 關閉視窗
            $('#addDialog').modal('hide')
        }
        e.preventDefault(); // avoid to execute the actual submit of the form.
    })
    // 修改鈕
    $("#modifyBtn").click(function (e) {
        var url = "ajax/ajaxCard";
        var cnname = $(".modifyCn").val();
        var enname = $(".modifyEn").val();
        var sex = $('input:radio:checked[name="modifySex"]').val();
        var phone = $(".modifyPhone").val();
        var mail = $(".modifyMail").val();
        let verifyCheck = verify(cnname, enname, phone, mail, '#modifyForm');

        if (verifyCheck == 0) {
            var ajaxobj = new AjaxObject(url, 'json');
            ajaxobj.cnname = cnname;
            ajaxobj.enname = enname;
            ajaxobj.phone = phone;
            ajaxobj.mail = mail;
            ajaxobj.sex = sex;
            var newData = [];
            newData[0] = {};
            newData[0].cnname = cnname;
            newData[0].enname = enname;
            newData[0].phone = phone;
            newData[0].mail = mail;
            newData[0].sex = sex;
            ajaxobj.modify_get(newData);
            reset(this.dataset.name);
            // 關閉視窗
            $('#addDialog').modal('hide')

        }
        e.preventDefault(); // avoid to execute the actual submit of the form.
    })
});
function refreshTable(data) {
    // var HTML = '';
    $("#cardtable tbody > tr").remove();
    $.each(data, function (key, item) {
        var strsex = '';
        if (item.sex == 0)
            strsex = '男';
        else
            strsex = '女';
        var row = $("<tr></tr>");
        row.append($("<td></td>").html(item.cnname));
        row.append($("<td></td>").html(item.enname));
        row.append($("<td></td>").html(strsex));
        row.append($("<td></td>").html(item.phone));
        row.append($("<td></td>").html(item.mail));
        row.append($("<td></td>").html('<button type="button" class="modifyBtn btn btn-light text-muted" data-bs-toggle="modal" data-bs-target="#modifyDialog" data-bs-whatever="@mdo">修改</button>'));
        row.append($("<td></td>").html('<button type="button" class="btn btn-light text-muted" data-bs-toggle="modal" data-bs-target="#exampleModal">刪除</button>'));
        row.append($("<td></td>").html(`<span class="tooltiptext">{${item.cnname}}&ensp;{${item.enname}}&ensp;-${strsex}</span>`));
        $("#cardtable").append(row);
    });
}

function initEdit(response) {
    var modifyid = $("#cardtable").attr('id').substring(12);
    $("#mocnname").val(response[0].cnname);
    $("#moenname").val(response[0].enname);
    if (response[0].sex == 0) {
        $("#modifyman").prop("checked", true);
        $("#modifywoman").prop("checked", false);
    }
    else {
        $("#modifyman").prop("checked", false);
        $("#modifywoman").prop("checked", true);
    }
    $("#modifysid").val(modifyid);
    $("#dialog-modifyconfirm").dialog({
        resizable: true,
        height: $(window).height() * 0.4,// dialog視窗度
        width: $(window).width() * 0.4,
        modal: true,
        buttons: {
            // 自訂button名稱
            "修改": function (e) {
                // $("#modifyform").submit();
                var url = "ajax/ajaxCard";
                var cnname = $("#mocnname").val();
                var enname = $("#moenname").val();
                var sex = $('input:radio:checked[name="mosex"]').val();
                var ajaxobj = new AjaxObject(url, 'json');
                ajaxobj.cnname = cnname;
                ajaxobj.enname = enname;
                ajaxobj.sex = sex;
                ajaxobj.id = modifyid;
                // ajaxobj.modify();

                e.preventDefault(); // avoid to execute the actual submit of the form.
            },
            "重新填寫": function () {
                // $("#modifyform")[0].reset();
            },
            "取消": function () {
                // $(this).dialog("close");
            }
        },
        error: function (exception) { alert('Exeption:' + exception); }
    });
}

//重新填寫
document.querySelectorAll(".reset").forEach((element) => {
    element.addEventListener('click',  (e)=>{
        reset(e.target.dataset.name);
    })
})
function reset(form) {
    document.querySelector(`${form} .cnname`).value = '';
    document.querySelector(`${form} .enname`).value = '';
    document.querySelector(`${form} .mail`).value = '';
    document.querySelector(`${form} .phone`).value = '';
    document.querySelector(`${form} .man`).checked = true;
    document.querySelector(`${form} .woman`).checked = false;
}

// 欄位驗證
function verify(cnname, enname, phone, mail, form) {
    var flag = 0;
    const regexMail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const regexPhone = /09\d{8}/;
    const regexCnname = /^[\u4E00-\u9FFF]{2,}/;
    const regexEnname = /^[A-Za-z]{2,}/;
    const ans = regexMail.test(mail);
    if (!regexCnname.test(cnname)) {
        flag++
        document.querySelector(`${form} .wrongCnname`).style.display = 'inline';

    }
    else {
        document.querySelector(`${form} .wrongCnname`).style.display = 'none';
    }
    if (!regexEnname.test(enname)) {
        flag++
        document.querySelector(`${form} .wrongEnname`).style.display = 'inline';

    }
    else {
        document.querySelector(`${form} .wrongEnname`).style.display = 'none';
    }
    if (!regexPhone.test(phone)) {
        flag++
        document.querySelector(`${form} .wrongPhone`).style.display = 'inline';

    }
    else {
        document.querySelector(`${form} .wrongPhone`).style.display = 'none';
    }
    if (!regexMail.test(mail)) {
        flag++
        document.querySelector(`${form} .wrongMail`).style.display = 'inline';

    }
    else {
        document.querySelector(`${form} .wrongMail`).style.display = 'none';
    }
    return flag;
}

/**
 * 
 * @param string
 *          url 呼叫controller的url
 * @param string
 *          datatype 資料傳回格式
 * @uses refreshTable 利用ajax傳回資料更新Table
 */
function AjaxObject(url, datatype) {
    this.url = url;
    this.datatype = datatype;
}
AjaxObject.prototype.cnname = '';
AjaxObject.prototype.enname = '';
AjaxObject.prototype.phone = '';
AjaxObject.prototype.mail = '';
AjaxObject.prototype.sex = '';
AjaxObject.prototype.id = 0;

AjaxObject.prototype.alertt = function () {
    alert("Alert:");
}
AjaxObject.prototype.getall = function () {
    data = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0981023677","mail":"s@gmail.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0981023677","mail":"s@gmail.com"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0","phone":"0981023677","mail":"s@gmail.com"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1","phone":"0981023677","mail":"s@gmail.com"}]';
    $.ajax({
        url: '/ajax',
        data: data,
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (req, res) {
            res = req.body;
            refreshTable(res);
        },
    });
}
AjaxObject.prototype.add = function (newData) {
    $.ajax({
        url: '/ajax',
        data: JSON.stringify(newData),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (req, res) {
            res = req.body;
            refreshTable(res);
        },
    });
}

AjaxObject.prototype.modify = function (newData) {
    $.ajax({
        url: '/ajax',
        data: JSON.stringify(newData),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (req, res) {
            res = req.body;
            refreshTable(res);
        },
    });
}
AjaxObject.prototype.modify_get = function (newData) {
    $.ajax({
        url: '/ajax',
        data: JSON.stringify(newData),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (req, res) {
            res = req.body;
            refreshTable(res);
        },
    });
}
AjaxObject.prototype.search = function (newData) {
    $.ajax({
        url: '/ajax',
        data: JSON.stringify(newData),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (req, res) {
            res = req.body;
            refreshTable(res);
        },
    });
}
AjaxObject.prototype.delete = function () {
    response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"}]';
    refreshTable(JSON.parse(response));
}
