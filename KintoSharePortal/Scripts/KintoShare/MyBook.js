﻿var url = "";

if (ENVIRONMENT == "LOCAL")
    url = BASE_URL_LOCAL;
else if (ENVIRONMENT == "DEV")
    url = BASE_URL_DEV;
else
    url = BASE_URL_PRD;

var check = "";
var Dateparam;
var passCarid;
var functionIsRunning = false;
window.addEventListener('DOMContentLoaded', function () {
    if (window.localStorage.getItem('click')) {
        var url = new URL(window.location)
        var paramdate = url.searchParams.get("date");
        var date = moment(paramdate, 'YYYY-MM-DD')

        var paramcarid = url.searchParams.get("resid"); //urlParams.get('resid');
        passCarid = paramcarid;

        $("#datebookstart").val(date.format('MM/DD/YYYY'));

        window.localStorage.removeItem('click');
        document.getElementById("btbook").click();
        checkDate();
    }
});

jQuery(document).ready(function () {

    $("#divttlcbody").hide();
    $("#divttlcClean").hide();
    $("#divttlcSmoke").hide();

    $('#datePick').multiDatesPicker();
    $("#divmybooklist").show();
    $("#divdetail").hide();
    $("#pnlCheckList").hide();

    $("#divfreq").hide();
    $("#divbooktype").hide();
    Form.LoadHeader();
    Control.BindingDept();
    Control.CarList();
    Control.Button();
    

    $('#txtbodyrepair').keypress(function () {
        if (this.value.length >= 2) // allowing you to enter only 10 chars.
            return false;
    });

    function isNumber(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    var feeweekday = document.getElementById("kintosharefee");
    feeweekday.addEventListener("keyup", function (e) {
        // tambahkan 'Rp.' pada saat form di ketik
        // gunakan fungsi formatRupiah() untuk mengubah angka yang di ketik menjadi format angka
        //rupiah.value = formatRupiah(this.value, "Rp. ");
        feeweekday.value = formatRupiah(this.value);
    });

    /* Fungsi formatRupiah */
    function formatRupiah(angka, prefix) {
        //function formatRupiah(angka) {
        var number_string = angka.replace(/[^,\d]/g, "").toString(),
            split = number_string.split(","),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            separator = sisa ? "." : "";
            rupiah += separator + ribuan.join(".");
        }

        rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
        return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
    }
    //$(document).ready(function () {
    //    $("#datebook").multiDatesPicker();
    //});
     $("div[class=pickup]").each(function () {
         $("#datebookstart").multiDatesPicker({
             dateFormat: 'mm/dd/yy',
             minDate: 0
         });
         $("#datebookend").multiDatesPicker({
             dateFormat: 'mm/dd/yy',
             minDate: 0
         });
     });
    //$('#datebook').multiDatesPicker({
    //    beforeShowDay: $.datepicker.noWeekends
    //});

    function Calculate() {

    };
});

function myDate(StartDate, EndDate) {
    bookRpt = $("#bookrepeat option:selected").val();
    let ttl = parseInt(0);
    let dollarUSLocale = Intl.NumberFormat('en-US');
    let daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = new Date(StartDate).getDay();
    let dayName = daysArray[day];
    
    var ddStart = String(new Date(StartDate).getDate());
    var ddEnd = String(new Date(EndDate).getDate());

    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(StartDate);
    const secondDate = new Date(EndDate);

    if (parseInt(ddStart) > parseInt(ddEnd)) {
        var t2 = String(new Date(EndDate).getTime());
        var t1 = String(new Date(StartDate).getTime());
        var RangeDate = Math.floor(((t2 - t1) / (24 * 3600 * 1000)) + 1);
        var ChangeddEnd = ddEnd;
        ddStart = ChangeddEnd;
        ddEnd = RangeDate;
        if (RangeDate == 1) {
            ttl = ttl + parseInt(1)
        }
        //console.log(RangeDate);
    }
    //if (parseInt(ddStart) == parseInt(ddEnd)) {
    //    ttl = ttl + parseInt(1)
    //}

    if (bookRpt == 'Y') {
        var StrDay = daysArray[day];
        var feeweekday = $('#lblweekday').text();
        var feeweekend = $('#lblweekend').text();
        feeday = feeweekday.replace(/\,/g, '');
        feeend = feeweekend.replace(/\,/g, '');

        if (StrDay !== 'Saturday' && StrDay !== 'Sunday') {
            ttl = parseInt(Math.round(feeday)) * 2;
        }
        else {
            ttl = parseInt(Math.round(feeend)) * 2;
        }
    }
    else {
        for (var i = parseInt(ddStart); i <= parseInt(ddEnd); i++) {
            //console.log(daysArray[day]);
            var StrDay = daysArray[day];
            var feeweekday = $('#lblweekday').text();
            var feeweekend = $('#lblweekend').text();
            feeday = feeweekday.replace(/\,/g, '');
            feeend = feeweekend.replace(/\,/g, '');

            if (StrDay !== 'Saturday' && StrDay !== 'Sunday') {
                ttl = parseInt(ttl) + parseInt(feeday);
                ttl = parseInt(ttl) - 1
                ttl++;
                //console.log(parseFloat(feeday));
            }
            else {
                ttl = parseInt(ttl) + parseInt(feeend);
                ttl = parseInt(ttl) - 1
                ttl++;
                //console.log(parseFloat(feeend));
            }

            if (day == 6)
                day = 0;
            else
                day++;
        }
        //ttl = parseInt(ttl) - 2;
    }
    if (ttl == -2) {
        ttl = 0;
    }
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    //document.getElementById("myId").innerHTML = diffDays;
    $("#kintosharefee").val(dollarUSLocale.format(ttl));
}

function checkDate() {
    var StartDate = document.getElementById('datebookstart').value;
    var EndDate = document.getElementById('datebookend').value;

    myDate(StartDate, EndDate);
}

function checkChargeBody() {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    $("#divttlcbody").show();
    var ttl = 0;
    var valpanel = $("#txtbodyrepair").val();

    cbody = $('#lblcbody').text();
    cbodyfee = cbody.replace(/\,/g, '');

    ttl = parseInt(valpanel) * parseInt(cbodyfee)
    document.getElementById('lblttlChargeBody').innerHTML = dollarUSLocale.format(ttl);

    chargeSmoke = $('#lblttlChargeSmoke').text();
    chargeSmokefee = chargeSmoke.replace(/\,/g, '');
    chargeClean = $('#lblttlChargeClean').text();
    chargeCleanfee = chargeClean.replace(/\,/g, '');
    chargeBody = $('#lblttlChargeBody').text();
    chargeBodyfee = chargeBody.replace(/\,/g, '');
    chargeFuel = $('#lblttlChargeFuel').text();
    chargeFuelfee = chargeBody.replace(/\,/g, '');
    TtlChargeAll = parseInt(chargeSmokefee) + parseInt(chargeCleanfee) + parseInt(chargeBodyfee) + parseInt(chargeFuelfee)
    document.getElementById('lblttlChargeAll').innerHTML = dollarUSLocale.format(TtlChargeAll);
}

function checkChargeClean() {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    $("#divttlcClean").show();
    var ttlClean = 0;
    var valclean = document.querySelector('input[name="rbclean"]:checked').value;/*$("#txtCleanliness").val();*/
    cclean = $('#lblcclean').text();
    ccleanfee = cclean.replace(/\,/g, '');
    if (valclean == "N") {
        ttlClean = 1* parseInt(ccleanfee)
        document.getElementById('lblttlChargeClean').innerHTML = dollarUSLocale.format(ttlClean);

        chargeSmoke = $('#lblttlChargeSmoke').text();
        chargeSmokefee = chargeSmoke.replace(/\,/g, '');
        chargeClean = $('#lblttlChargeClean').text();
        chargeCleanfee = chargeClean.replace(/\,/g, '');
        chargeBody = $('#lblttlChargeBody').text();
        chargeBodyfee = chargeBody.replace(/\,/g, '');
        chargeFuel = $('#lblttlChargeFuel').text();
        chargeFuelfee = chargeBody.replace(/\,/g, '');
        TtlChargeAll = parseInt(chargeSmokefee) + parseInt(chargeCleanfee) + parseInt(chargeBodyfee) + parseInt(chargeFuelfee)
        document.getElementById('lblttlChargeAll').innerHTML = dollarUSLocale.format(TtlChargeAll);
    }
    else {
        ttlClean = 0 * parseInt(ccleanfee)
        document.getElementById('lblttlChargeClean').innerHTML = dollarUSLocale.format(ttlClean);

        chargeSmoke = $('#lblttlChargeSmoke').text();
        chargeSmokefee = chargeSmoke.replace(/\,/g, '');
        chargeClean = $('#lblttlChargeClean').text();
        chargeCleanfee = chargeClean.replace(/\,/g, '');
        chargeBody = $('#lblttlChargeBody').text();
        chargeBodyfee = chargeBody.replace(/\,/g, '');
        chargeFuel = $('#lblttlChargeFuel').text();
        chargeFuelfee = chargeBody.replace(/\,/g, '');
        TtlChargeAll = parseInt(chargeSmokefee) + parseInt(chargeCleanfee) + parseInt(chargeBodyfee) + parseInt(chargeFuelfee)
        document.getElementById('lblttlChargeAll').innerHTML = dollarUSLocale.format(TtlChargeAll);
    }
}

function checkChargeFuel() {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    $("#divFuel").show();

    cfuel = $('#lblcFuel').text();
    cfuelfee = cfuel.replace(/\,/g, '');

    valfuel = document.querySelector('input[name="rbfuel"]:checked').value;
    valfuelCI = $('#hideFuelVal').text();
    valfuelCharge = 0;
    //if (valfuel == '25') {
    //    valfuelCharge = 1 * parseInt(cfuelfee);
    //    document.getElementById('lblttlChargeFuel').innerHTML = dollarUSLocale.format(valfuelCharge);
    //}
    //else if (valfuel == '50') {
    //    valfuelCharge = 2 * parseInt(cfuelfee);
    //    document.getElementById('lblttlChargeFuel').innerHTML = dollarUSLocale.format(valfuelCharge);
    //}
    //else if (valfuel == '75') {
    //    valfuelCharge = 3 * parseInt(cfuelfee);
    //    document.getElementById('lblttlChargeFuel').innerHTML = dollarUSLocale.format(valfuelCharge);
    //}
    //else {
    //    valfuelCharge = 4 * parseInt(cfuelfee);
    //    document.getElementById('lblttlChargeFuel').innerHTML = dollarUSLocale.format(valfuelCharge);
    //}
    if (valfuel < valfuelCI) {
        if (valfuelCI == "100" && valfuel == "75" || valfuelCI == "75" && valfuel == "50" || valfuelCI == "50" && valfuel == "25") {
            valfuelCharge = 1 * parseInt(cfuelfee);
            document.getElementById('lblttlChargeFuel').innerHTML = dollarUSLocale.format(valfuelCharge);
        }
        else if (valfuelCI == "100" && valfuel == "50" || valfuelCI == "75" && valfuel == "25") {
            valfuelCharge = 2 * parseInt(cfuelfee);
            document.getElementById('lblttlChargeFuel').innerHTML = dollarUSLocale.format(valfuelCharge);
        }
        else if (valfuelCI == "100" && valfuel == "25") {
            valfuelCharge = 3 * parseInt(cfuelfee);
            document.getElementById('lblttlChargeFuel').innerHTML = dollarUSLocale.format(valfuelCharge);
        }
    }
    else {
        valfuelCharge = 0;
        document.getElementById('lblttlChargeFuel').innerHTML = dollarUSLocale.format(valfuelCharge);
    }

    chargeSmoke = $('#lblttlChargeSmoke').text();
    chargeSmokefee = chargeSmoke.replace(/\,/g, '');
    chargeClean = $('#lblttlChargeClean').text();
    chargeCleanfee = chargeClean.replace(/\,/g, '');
    chargeBody = $('#lblttlChargeBody').text();
    chargeBodyfee = chargeBody.replace(/\,/g, '');
    TtlChargeAll = parseInt(chargeSmokefee) + parseInt(chargeCleanfee) + parseInt(chargeBodyfee) + parseInt(valfuelCharge)
    document.getElementById('lblttlChargeAll').innerHTML = dollarUSLocale.format(TtlChargeAll);
}

function checkSmoke() {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    $("#divttlcSmoke").show();

    valsmoke = document.querySelector('input[name="rbsmoke"]:checked').value;

    if (valsmoke == "Y") {
        csmoke = $('#lblsmoke').text();
        csmokefee = csmoke.replace(/\,/g, '');
        ttlsmoke = 1 * parseInt(csmokefee)
        document.getElementById('lblttlChargeSmoke').innerHTML = dollarUSLocale.format(ttlsmoke);

        chargeSmoke = $('#lblttlChargeSmoke').text();
        chargeSmokefee = chargeSmoke.replace(/\,/g, '');
        chargeClean = $('#lblttlChargeClean').text();
        chargeCleanfee = chargeClean.replace(/\,/g, '');
        chargeBody = $('#lblttlChargeBody').text();
        chargeBodyfee = chargeBody.replace(/\,/g, '');
        chargeFuel = $('#lblttlChargeFuel').text();
        chargeFuelfee = chargeBody.replace(/\,/g, '');
        TtlChargeAll = parseInt(chargeSmokefee) + parseInt(chargeCleanfee) + parseInt(chargeBodyfee) + parseInt(chargeFuelfee)
        document.getElementById('lblttlChargeAll').innerHTML = dollarUSLocale.format(TtlChargeAll);
    }
    else {
        csmoke = $('#lblsmoke').text();
        csmokefee = csmoke.replace(/\,/g, '');
        ttlsmoke = 0 * parseInt(csmokefee)
        document.getElementById('lblttlChargeSmoke').innerHTML = dollarUSLocale.format(ttlsmoke);

        chargeSmoke = $('#lblttlChargeSmoke').text();
        chargeSmokefee = chargeSmoke.replace(/\,/g, '');
        chargeClean = $('#lblttlChargeClean').text();
        chargeCleanfee = chargeClean.replace(/\,/g, '');
        chargeBody = $('#lblttlChargeBody').text();
        chargeBodyfee = chargeBody.replace(/\,/g, '');
        chargeFuel = $('#lblttlChargeFuel').text();
        chargeFuelfee = chargeBody.replace(/\,/g, '');
        TtlChargeAll = parseInt(chargeSmokefee) + parseInt(chargeCleanfee) + parseInt(chargeBodyfee) + parseInt(chargeFuelfee)
        document.getElementById('lblttlChargeAll').innerHTML = dollarUSLocale.format(TtlChargeAll);

    }
}

function showCancelMessage(id,bookNo) {
    swal({
        title: "Are you sure?",
        /*text: "You will not be able to recover this imaginary file!",*/
        text: "You will delete this Book with booking no. '" + bookNo + "' !!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel pls!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "POST",
                //async: false,
                url: url + "/Home/DeleteBook",
                data: { Bookid: id, BookingNo: bookNo },
                dataType: "json",
                success: function (msg) {
                    alert("Data has been delete");
                    location.reload();
                }, error: function (xhr, msg) {
                    alert("Proses Error " + msg);
                }
            });
            swal("Deleted!", "Your book has been deleted.", "success");
            //$.ajax({
            //    url: "/Home/DeleteBook",
            //    type: "POST",
            //    data: { Bookid: id, BookingNo: bookNo }
            //}).done(function (data, textStatus, jqXHR) {
            //    swal("Deleted!", "Your imaginary file has been deleted.", "success");
            //    location.reload();
            //}).fail(function (xhr, msg) {
            //    alert("Proses Error " + msg);
            //});
        } else {
            swal("Cancelled", "Your book is safe :)", "error");
        }
    });
}

var Control = {
    Button: function () {
        $("#btsubmitReq").unbind().click(function () {
            if (Form.Validation()) {
                $("#btcancelReq").prop('disabled', true);
                $("#btsubmitReq").prop("disabled", true);
                $("#btsubmitReq").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...');
                //$('#btsubmitReq').prop('disabled', true);
                Form.Submit();
            }
        });

        $("#btcancelReq").unbind().click(function () {
            $("#divmybooklist").show();
            $("#divdetail").hide();
            $("#pnlCheckList").hide();
        });

        $("#btsave").unbind().click(function () {
            check = "in";
            if (Form.CheckListValidation(check)) {
                $("#btsave").prop("disabled", true);
                $("#btsave").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...');
                Form.SubmitCheckList();
            }
        });

        $("#btcheckout").unbind().click(function () {
            check = "out";
            if (Form.CheckListValidation(check)) {
                $("#btcheckout").prop("disabled", true);
                $("#btcheckout").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...');
                Form.SubmitCheckOut();

            }
        });

        $("#btcancel").unbind().click(function () {
            $("#divmybooklist").show();
            $("#divdetail").hide();
            $("#pnlCheckList").hide();
        });

        $("#btbook").unbind().click(function () {
            $("#divmybooklist").hide();
            $("#divdetail").show();
            $("#pnlCheckList").hide();
            $('#btsubmitReq').prop('disabled', false);
        });

        $("#btapprove").unbind().click(function () {
            var Status = "Approve";
            Form.ChecklistApproval(Status);
        });

        $("#btreturn").unbind().click(function () {
            var Status = "Return";
            Form.ChecklistApproval(Status);
        });

        $("#btapproveCheckOut").unbind().click(function () {
            var Status = "Approve";
            Form.ApprovalCheckOut(Status);
        });

        $("#btreturnCheckOut").unbind().click(function () {
            var Status = "Return";
            Form.ApprovalCheckOut(Status);
        });

        $("#btreject").unbind().click(function () {
            var Status = "Reject";
            Form.ApprovalCheckOut(Status);
        });

    },

    BindingDept: function () {
        $.ajax({
            url: url + "/Home/ListDept",
            type: "GET"
        })
            .done(function (data, textStatus, jqXHR) {
                //console.log(data);
                /* if (Common.CheckError.List(data)) {*/
                $("#department").append("<option value='0'>--Select Department--</option>");
                $.each(data, function (i, item) {
                    //console.log(item);
                    $("#department").append("<option value='" + item.DeptId + "'>" + item.DeptName + "</option>");
                })
                    //$("#department").select2({ placeholder: "Select Department", width: null });
                //}
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                //Common.Alert.Error(errorThrown);
            });
    },

    CarList: function () {
        $.ajax({
            url: url + "/Home/ListCar",
            type: "GET"
        })
            .done(function (data, textStatus, jqXHR) {
            //console.log(data);
            /* if (Common.CheckError.List(data)) {*/
                $("#cartype").append("<option value='0'>--Select Car--</option>");
            $.each(data, function (i, item) {
                //console.log(item);
                $("#cartype").append("<option value='" + item.CarId + "'>" + item.CarName + "</option>");
            })
                //$("#cartype").select2({ placeholder: "Select Car", width: null });
            //}

                var url = new URL(window.location)
                var paramcarid = url.searchParams.get("resid");
                if (paramcarid != null) {
                    $('#cartype').val(paramcarid);
                    Control.GetPlatNo(paramcarid);
                }
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                //Common.Alert.Error(errorThrown);
            });
        
    },

    GetPlatNo: function (CarId) {
        let dollarUSLocale = Intl.NumberFormat('en-US');
        /*var carIdGet = CarId.value.trim();*/
        if (CarId.length > 3) {
            CarId = CarId.value.trim();
        }

        $.ajax({
            url: url + "/Home/PlatNo",
            type: "GET",
            data: { CarId: CarId }
        })
            .done(function (data, textStatus, jqXHR) {
                $("#licenseplat").val(data.PlatNo);
                $('#lblweekday').text(dollarUSLocale.format(data.FeeWeekDay));
                $('#lblweekend').text(dollarUSLocale.format(data.FeeWeekEnd));
                checkDate();
            })
            .fail(function (jqXHR, textStatus, errorThrown){
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            });
    },

    GetPIC: function (DeptID) {
        $.ajax({
            url: url + "/Home/ListPIC",
            type: "GET",
            data: { DeptID: DeptID.value.trim()}
        })
            .done(function (data, textStatus, jqXHR) {
                //console.log(data);
                /* if (Common.CheckError.List(data)) {*/
                document.getElementById('ddpic').options.length = 0;

                $("#ddpic").append("<option value='0'>--Select PIC--</option>");
                $.each(data, function (i, item) {
                    $("#ddpic").append("<option value='" + item.UserID + "'>" + item.UserID + " - " + item.UserName + "</option>");
                })
                //$("#ddpic").select2({ placeholder: "Select PIC", width: null });
                //}
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                //Common.Alert.Error(errorThrown);
            });
    },

    Freq: function (BookRepeat) {
        if (BookRepeat.value == 'Y') {
            $("#divfreq").show();
            checkDate();
        }
        else
        {
            $("#divfreq").hide();
            checkDate();
        }
    },
}

var Form = {
    Submit: function () {

        //Form.Validation();

        strfee = $('#kintosharefee').val();
        newfee = strfee.replace(/\,/g, '');

        Submitparam = {
            Cartype: $("#cartype option:selected").text(), /*selectedCarText,*/ /*$('#cartype').text(),*/
            Department: $("#department option:selected").text(),
            PlatNo: $('#licenseplat').val(),
            PIC: $("#ddpic option:selected").text(),
            BookType: $('#booktype').val(),
            Purpose: $('#purpose').val(),
            //BookRepeat: $('#bookrepeat').val(),
            KintoShareFee: newfee, /*$('#kintosharefee').val(),*/
            //DateFreq: $('#datefreq').val(),
            StartDate: $('#datebookstart').val(),
            EndDate: $('#datebookend').val(),
            BookRepeat: $("#bookrepeat option:selected").val(),
            DateFreq: $("#bookfreq option:selected").val()
        };
        $.ajax({
            type: "POST",
            //async: false,
            url: url + "/Home/SubmitBook",
            data: Submitparam,
            dataType: "json",
            success: function (msg) {
                if (msg.Success) {
                    alert("Data has been save");
                    $('#divmybooklist').show();
                    $('#divdetail').hide();
                    $('#pnlCheckList').hide();
                    location.reload();
                    Form.LoadData();
                }
                else {
                    $("#btsubmitReq").prop("disabled", false);
                    $("#btsubmitReq").html('<button type="button" class="btn bg-teal btn-block btn-lg waves-effect" id="btsubmitReq">SUBMIT</button>');
                    $('#myModal').modal('show');
                    $('#modaltext').text(msg.Reason);
                }
                
            }, error: function (xhr, msg) {
                //alert("Proses Error " + msg);
                $("#btsubmitReq").prop("disabled", false);
                $("#btsubmitReq").html('<button type="button" class="btn bg-teal btn-block btn-lg waves-effect" id="btsubmitReq">SUBMIT</button>');
                $('#myModal').modal('show');
                $('#modaltext').text(msg);
            }
            //, complete: function () {
            //    alert("Proses sudah selesai");
            //    $('#divmybooklist').show();
            //    $('#divdetail').hide();
            //    $('#pnlCheckList').hide();
            //    location.reload();
            //    Form.LoadData();
            //}
        });
    },

    LoadHeader: function () {

        $("#tblBookHeader").DataTable({
            "columnDefs":
                [
                    {
                        "targets": [0, 7, 9, 10, 11],
                        "visible": false
                    },
                    {
                        "searchable": true,
                        "targets": [1, 2]
                    },
                ],
            "processing": true, // for show progress bar  
            "serverSide": true, // for process server side  
            "filter": false, // this is for disable filter (search box)  
            "orderMulti": false, // for disable multiple column at once  
            "destroy": true,
            "deferRender": true,
            "pageLength": 10,
            "ajax": {
                "url": url + "/Home/BookingList",
                "type": "POST",
                "datatype": "json"
            },
            "columns": [
                { "data": "ID", "name": "ID", "autoWidth": true },
                { "data": "BookingNo", "name": "BookingNo", "autoWidth": true },
                { "data": "Cartype", "name": "Cartype", "autoWidth": true },
                { "data": "PlatNo", "name": "PlatNo", "autoWidth": true },
                { "data": "Department", "name": "Department", "autoWidth": true },
                { "data": "PIC", "name": "PIC", "autoWidth": true },
                { "data": "BookDate", "name": "BookDate", "autoWidth": true },
                { "data": "DateFreq", "name": "DateFreq", "autoWidth": true },
                {
                    /*"data": "ApprovalStatus", "name": "ApprovalStatus", "autoWidth": true*/
                    "data": "ApprovalStatus",
                    render: function (data, type, full) {
                        if (data == 'CANCEL')
                            return 'REJECT';
                        return data;
                    }
                },
                { "data": "UserReq", "name": "UserReq", "autoWidth": true },
                { "data": "Purpose", "name": "Purpose", "autoWidth": true },
                { "data": "DateCrt", "name": "DateCrt", "autoWidth": true },
                {
                    data: null, render: function (data, type, row) {
                        if (data.ApprovalStatus == "APPROVE")
                            /*if (data.Ischeckin != 1)*/
                                return "<a href='#' class='btn btn-danger' onclick=Form.CheckIn('" + row.ID + "','" + row.BookingNo + "'); >CHECK-IN</a > ";
                            //else
                            //    return "<h5>DONE</h5>"; //,'" + row.Cartype + "','" + row.Department + "','" + row.PlatNo + "','" + row.PIC + "','" + row.BookDate + "','" + row.ApprovalStatus + "','" + row.UserReq + "','" + row.Purpose + "','" + row.DateCrt + "'); > Check - In</a > ";
                        else 
                            return "";
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (data.CheckInStatus != "Return" && data.CheckInStatus != null && data.CheckInStatus != "Updated")
                            /*if (data.Ischeckout != 1)*/
                                return "<a href='#' class='btn btn-danger' onclick=Form.CheckOut('" + row.ID + "','" + row.BookingNo + "'); >CHECK-OUT</a>";
                            //else
                            //    return "<h5>DONE</h5>";
                        else
                            return "";
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (data.ApprovalStatus == "WAITING" && data.Ischeckin == null || data.ApprovalStatus == "APPROVE" && data.Ischeckin == null)
                            return "<a href='#' class='btn btn-danger' onclick=showCancelMessage('" + row.ID + "','" + row.BookingNo + "');>CANCEL</a>";
                        else
                            return "";
                    }
                },
            ],
            "scrollY": 300, /* Enable vertical scroll to allow fixed columns */
            "scrollX": true, /* Enable horizontal scroll to allow fixed columns */
            "scrollCollapse": true,
            "fnDrawCallback": function () {

            },
        })

    },

    SubmitCheckList: function () {
        param = {
            ID: $('#lblIDChecklist').text(), //$("#lblIDChecklist").val(),
            bookNo: $('#lblBookNo').text(), //$("#lblBookNo").val(),
            rbff: document.querySelector('input[name="rbff"]:checked').value,
            rbdash: document.querySelector('input[name="rbdash"]:checked').value, //$("#rbdash").val(),
            rbSeat: document.querySelector('input[name="rbSeat"]:checked').value, //$("#rbSeat").val(),
            rbbmprf: document.querySelector('input[name="rbbmprf"]:checked').value, //$("#rbbmprf").val(),
            rbbmpr: document.querySelector('input[name="rbbmpr"]:checked').value, //$("#rbbmpr").val(),
            rbfenderrf: document.querySelector('input[name="rbfenderrf"]:checked').value, //$("#rbfenderrf").val(),
            rbfenderlf: document.querySelector('input[name="rbfenderlf"]:checked').value, //$("#rbfenderlf").val(),
            rbfenderrb: document.querySelector('input[name="rbfenderrb"]:checked').value, //$("#rbfenderrb").val(),
            rbfenderlb: document.querySelector('input[name="rbfenderlb"]:checked').value, //$("#rbfenderlb").val(),
            rbkm: document.querySelector('input[name="rbkm"]:checked').value, //$("#rbkm").val(),
            rbstnk: document.querySelector('input[name="rbstnk"]:checked').value, //$("#rbstnk").val(),
            rbserviceBook: document.querySelector('input[name="rbserviceBook"]:checked').value, //$("#rbserviceBook").val(),
            rbvelg: document.querySelector('input[name="rbvelg"]:checked').value, //$("#rbvelg").val(),
            rbbanrf: document.querySelector('input[name="rbbanrf"]:checked').value, //$("#rbbanrf").val(),
            rbbanlf: document.querySelector('input[name="rbbanlf"]:checked').value, //$("#rbbanlf").val(),
            rbbanrb: document.querySelector('input[name="rbbanrb"]:checked').value, //$("#rbbanrb").val(),
            rbbanlb: document.querySelector('input[name="rbbanlb"]:checked').value, //$("#rbbanlb").val(),
            rbdongkrak: document.querySelector('input[name="rbdongkrak"]:checked').value, //$("#rbdongkrak").val(),
            rbkaca: document.querySelector('input[name="rbkaca"]:checked').value, //$("#rbkaca").val(),
            rbkf: document.querySelector('input[name="rbkf"]:checked').value, //$("#rbkf").val(),
            rbaudio: document.querySelector('input[name="rbaudio"]:checked').value, //$("#rbaudio").val(),
            rbac: document.querySelector('input[name="rbac"]:checked').value, //$("#rbac").val(),
            rbbancdg: document.querySelector('input[name="rbbancdg"]:checked').value, //$("#rbbancdg").val(),
            rbfuel: document.querySelector('input[name="rbfuel"]:checked').value,
            bodyrepair: document.getElementById("txtbodyrepair").value,
            cleaniness: document.querySelector('input[name="rbclean"]:checked').value,/*document.getElementById("txtCleanliness").value,*/
            smoke: document.querySelector('input[name="rbsmoke"]:checked').value,
            parking: document.getElementById("txrparking").value
        };
        console.log(param);
        $.ajax ({
            url: url + "/Home/SubmitChecklist",
            type: "POST",
            datatype: "json",
            data: param,
            success: function (result) {
                location.reload();
            },
            error: function (xhr, msg) {
                $("#btsave").prop("disabled", false);
                $("#btsave").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...');
                alert("Proses Error " + msg);
            }
        })
    },

    SubmitCheckOut: function () {
        /*Form.CheckListValidation();*/
        charge=$('#lblttlChargeAll').text()
        chargefee = charge.replace(/\,/g, '');
        param = {
            ID: $('#lblIDChecklist').text(), //$("#lblIDChecklist").val(),
            bookNo: $('#lblBookNo').text(), //$("#lblBookNo").val(),
            rbff: document.querySelector('input[name="rbff"]:checked').value,
            rbdash: document.querySelector('input[name="rbdash"]:checked').value, //$("#rbdash").val(),
            rbSeat: document.querySelector('input[name="rbSeat"]:checked').value, //$("#rbSeat").val(),
            rbbmprf: document.querySelector('input[name="rbbmprf"]:checked').value, //$("#rbbmprf").val(),
            rbbmpr: document.querySelector('input[name="rbbmpr"]:checked').value, //$("#rbbmpr").val(),
            rbfenderrf: document.querySelector('input[name="rbfenderrf"]:checked').value, //$("#rbfenderrf").val(),
            rbfenderlf: document.querySelector('input[name="rbfenderlf"]:checked').value, //$("#rbfenderlf").val(),
            rbfenderrb: document.querySelector('input[name="rbfenderrb"]:checked').value, //$("#rbfenderrb").val(),
            rbfenderlb: document.querySelector('input[name="rbfenderlb"]:checked').value, //$("#rbfenderlb").val(),
            rbkm: document.querySelector('input[name="rbkm"]:checked').value, //$("#rbkm").val(),
            rbstnk: document.querySelector('input[name="rbstnk"]:checked').value, //$("#rbstnk").val(),
            rbserviceBook: document.querySelector('input[name="rbserviceBook"]:checked').value, //$("#rbserviceBook").val(),
            rbvelg: document.querySelector('input[name="rbvelg"]:checked').value, //$("#rbvelg").val(),
            rbbanrf: document.querySelector('input[name="rbbanrf"]:checked').value, //$("#rbbanrf").val(),
            rbbanlf: document.querySelector('input[name="rbbanlf"]:checked').value, //$("#rbbanlf").val(),
            rbbanrb: document.querySelector('input[name="rbbanrb"]:checked').value, //$("#rbbanrb").val(),
            rbbanlb: document.querySelector('input[name="rbbanlb"]:checked').value, //$("#rbbanlb").val(),
            rbdongkrak: document.querySelector('input[name="rbdongkrak"]:checked').value, //$("#rbdongkrak").val(),
            rbkaca: document.querySelector('input[name="rbkaca"]:checked').value, //$("#rbkaca").val(),
            rbkf: document.querySelector('input[name="rbkf"]:checked').value, //$("#rbkf").val(),
            rbaudio: document.querySelector('input[name="rbaudio"]:checked').value, //$("#rbaudio").val(),
            rbac: document.querySelector('input[name="rbac"]:checked').value, //$("#rbac").val(),
            rbbancdg: document.querySelector('input[name="rbbancdg"]:checked').value, //$("#rbbancdg").val(),
            rbfuel: document.querySelector('input[name="rbfuel"]:checked').value,
            bodyrepair : document.getElementById("txtbodyrepair").value,
            cleaniness: document.querySelector('input[name="rbclean"]:checked').value,/* document.getElementById("txtCleanliness").value,*/
            smoke: document.querySelector('input[name="rbsmoke"]:checked').value,
            Charge: chargefee,
            parking: document.getElementById("txrparking").value
        };
        $.ajax({
            url: url + "/Home/SubmitCheckOut",
            type: "POST",
            datatype: "json",
            data: param,
            success: function (result) {
                location.reload();
            },
            error: function (xhr, msg) {
                $("#btcheckout").prop("disabled", false);
                $("#btcheckout").html('<button type="button" class="btn bg-teal waves-effect" id="btcheckout">CHECK-OUT</button>');
                alert("Proses Error " + msg);

            }
        })

    },

    CheckIn: function (Bookid, BookingNo) { //, Cartype,Department,PlatNo,PIC,BookDate,ApprovalStatus,UserReq,Purpose,ReqDate) {
        //$("#lblIDChecklist").val(Bookid);
        $("#divFuelBeforeCO").hide();
        $.ajax({
            url: url + "/Home/CheckListDetail",
            type: "POST",
            data: { Bookid: Bookid, BookingNo: BookingNo }
        }).done(function (data, textStatus, jqXHR) {
            $("#divmybooklist").hide();
            $("#pnlCheckList").show();

            $("#checkintitle").show();
            $("#checkouttitle").hide();

            $("#btcheckout").hide();
            $("#divbtncheckout").hide();

            $("#divBody").hide();
            $("#divClean").hide();
            $("#divsmoke").hide();

            $("#ChechkInStatus").show();

            $("#divapproveCheckOut").hide();
            $("#divreturnCheckOut").hide();

            $("#divFuel").hide();

            //if (data.cleaniness != '0') {
            //    data.cleaniness = "Y"
            //}
            //else if (data.cleaniness == "Y") {
            //    data.cleaniness = "Y"
            //}
            //else {
            //    data.cleaniness = "N"
            //}

            if (data.Role != 'admin') {
                document.getElementById('lblCarType').innerHTML = data.Cartype;
                document.getElementById('lblDepartment').innerHTML = data.Department;
                document.getElementById('lblPlatNo').innerHTML = data.PlatNo;
                document.getElementById('lblPIC').innerHTML = data.PIC;
                document.getElementById('lblBookType').innerHTML = data.BookType;
                document.getElementById('lblpurpose').innerHTML = data.Purpose;
                document.getElementById('lblbookDate').innerHTML = data.BookDate;
                document.getElementById('lblRequest').innerHTML = data.UserReq;
                document.getElementById('lblStartDate').innerHTML = data.Startdate;
                document.getElementById('lblstatus').innerHTML = data.ApprovalStatus;
                document.getElementById('lblEndDate').innerHTML = data.Enddate;

                document.getElementById('lblIDChecklist').innerHTML = Bookid;
                document.getElementById('lblBookNo').innerHTML = BookingNo;

                if (data.CheckInStatus != null) {
                    document.getElementById('ChechkInStatus').innerHTML = "This Approval Checklist is " + data.CheckInStatus;
                }
                else {
                    document.getElementById('ChechkInStatus').innerHTML = "";
                }

                $("input[name=rbfuel][value=" + data.rbfuel + "]").prop('checked', true);
                $("input[name=rbfuel]").prop('disabled', true);
                $("input[name=rbff][value=" + data.rbff + "]").prop('checked', true);
                $("input[name=rbff]").prop('disabled', true);
                $("input[name=rbdash][value=" + data.rbdash + "]").prop('checked', true);
                $("input[name=rbdash]").prop('disabled', true);
                $("input[name=rbSeat][value=" + data.rbSeat + "]").prop('checked', true);
                $("input[name=rbSeat]").prop('disabled', true);
                $("input[name=rbbmprf][value=" + data.rbbmprf + "]").prop('checked', true);
                $("input[name=rbbmprf]").prop('disabled', true);
                $("input[name=rbbmpr][value=" + data.rbbmpr + "]").prop('checked', true);
                $("input[name=rbbmpr]").prop('disabled', true);
                $("input[name=rbfenderrf][value=" + data.rbfenderrf + "]").prop('checked', true);
                $("input[name=rbfenderrf]").prop('disabled', true);
                $("input[name=rbfenderlf][value=" + data.rbfenderlf + "]").prop('checked', true);
                $("input[name=rbfenderlf]").prop('disabled', true);
                $("input[name=rbfenderrb][value=" + data.rbfenderrb + "]").prop('checked', true);
                $("input[name=rbfenderrb]").prop('disabled', true);
                $("input[name=rbfenderlb][value=" + data.rbfenderlb + "]").prop('checked', true);
                $("input[name=rbfenderlb]").prop('disabled', true);
                $("input[name=rbkm][value=" + data.rbkm + "]").prop('checked', true);
                $("input[name=rbkm]").prop('disabled', true);
                $("input[name=rbstnk][value=" + data.rbstnk + "]").prop('checked', true);
                $("input[name=rbstnk]").prop('disabled', true);
                $("input[name=rbserviceBook][value=" + data.rbserviceBook + "]").prop('checked', true);
                $("input[name=rbserviceBook]").prop('disabled', true);
                $("input[name=rbvelg][value=" + data.rbvelg + "]").prop('checked', true);
                $("input[name=rbvelg]").prop('disabled', true);
                $("input[name=rbbanrf][value=" + data.rbbanrf + "]").prop('checked', true);
                $("input[name=rbbanrf]").prop('disabled', true);
                $("input[name=rbbanlf][value=" + data.rbbanlf + "]").prop('checked', true);
                $("input[name=rbbanlf]").prop('disabled', true);
                $("input[name=rbbanrb][value=" + data.rbbanrb + "]").prop('checked', true);
                $("input[name=rbbanrb]").prop('disabled', true);
                $("input[name=rbbanlb][value=" + data.rbbanlb + "]").prop('checked', true);
                $("input[name=rbbanlb]").prop('disabled', true);
                $("input[name=rbdongkrak][value=" + data.rbdongkrak + "]").prop('checked', true);
                $("input[name=rbdongkrak]").prop('disabled', true);
                $("input[name=rbkaca][value=" + data.rbkaca + "]").prop('checked', true);
                $("input[name=rbkaca]").prop('disabled', true);
                $("input[name=rbkf][value=" + data.rbkf + "]").prop('checked', true);
                $("input[name=rbkf]").prop('disabled', true);
                $("input[name=rbaudio][value=" + data.rbaudio + "]").prop('checked', true);
                $("input[name=rbaudio]").prop('disabled', true);
                $("input[name=rbac][value=" + data.rbac + "]").prop('checked', true);
                $("input[name=rbac]").prop('disabled', true);
                $("input[name=rbbancdg][value=" + data.rbbancdg + "]").prop('checked', true);
                $("input[name=rbbancdg]").prop('disabled', true);
                $("input[name=rbsmoke][value=" + data.smoke + "]").prop('checked', true);
                $("input[name=rbsmoke]").prop('disabled', true);

                document.getElementById('txtbodyrepair').value = data.bodyrepair;
                document.getElementById('txtbodyrepair').disabled = true;
                $("input[name=rbclean][value=" + data.cleaniness + "]").prop('checked', true);
                $("input[name=rbclean]").prop('disabled', true);
                document.getElementById('txrparking').value = data.parking;
                document.getElementById('txrparking').disabled = true;

                $("#btsave").hide();
                $("#divbtnsave").hide();
                //console.log(data.CheckInStatus);
                if (data.CheckInStatus == "Approve" || data.CheckInStatus == "Return" ) {
                    $("#btapprove").hide();
                    $("#divapprove").hide();

                    $("#divreturn").hide();
                    $("#btreturn").hide();
                }
                else if (data.IsCheckIn != 1) {
                    $("#btapprove").hide();
                    $("#divapprove").hide();

                    $("#divreturn").hide();
                    $("#btreturn").hide();
                }
                else {
                    $("#btapprove").show();
                    $("#divapprove").show();

                    $("#divreturn").show();
                    $("#btreturn").show();
                }

                if (data.CheckInStatus == "Reject") {
                    $("#divreject").hide();
                }
                else {
                    $("#divreject").show();
                }
            }
            else {
                document.getElementById('lblCarType').innerHTML = data.Cartype;
                document.getElementById('lblDepartment').innerHTML = data.Department;
                document.getElementById('lblPlatNo').innerHTML = data.PlatNo;
                document.getElementById('lblPIC').innerHTML = data.PIC;
                document.getElementById('lblBookType').innerHTML = data.BookType;
                document.getElementById('lblpurpose').innerHTML = data.Purpose;
                document.getElementById('lblbookDate').innerHTML = data.BookDate;
                document.getElementById('lblRequest').innerHTML = data.UserReq;
                document.getElementById('lblStartDate').innerHTML = data.Startdate;
                document.getElementById('lblstatus').innerHTML = data.ApprovalStatus;
                document.getElementById('lblEndDate').innerHTML = data.Enddate;

                document.getElementById('lblIDChecklist').innerHTML = Bookid;
                document.getElementById('lblBookNo').innerHTML = BookingNo;

                if (data.CheckInStatus != null) {
                    document.getElementById('ChechkInStatus').innerHTML = "This Approval Checklist is " + data.CheckInStatus;
                }
                else {
                    document.getElementById('ChechkInStatus').innerHTML = "";
                }

                $("input[name=rbfuel][value=" + data.rbfuel + "]").prop('checked', true);
                $("input[name=rbff][value=" + data.rbff + "]").prop('checked', true);
                $("input[name=rbdash][value=" + data.rbdash + "]").prop('checked', true);
                $("input[name=rbSeat][value=" + data.rbSeat + "]").prop('checked', true);
                $("input[name=rbbmprf][value=" + data.rbbmprf + "]").prop('checked', true);
                $("input[name=rbbmpr][value=" + data.rbbmpr + "]").prop('checked', true);
                $("input[name=rbfenderrf][value=" + data.rbfenderrf + "]").prop('checked', true);
                $("input[name=rbfenderlf][value=" + data.rbfenderlf + "]").prop('checked', true);
                $("input[name=rbfenderrb][value=" + data.rbfenderrb + "]").prop('checked', true);
                $("input[name=rbfenderlb][value=" + data.rbfenderlb + "]").prop('checked', true);
                $("input[name=rbkm][value=" + data.rbkm + "]").prop('checked', true);
                $("input[name=rbstnk][value=" + data.rbstnk + "]").prop('checked', true);
                $("input[name=rbserviceBook][value=" + data.rbserviceBook + "]").prop('checked', true);
                $("input[name=rbvelg][value=" + data.rbvelg + "]").prop('checked', true);
                $("input[name=rbbanrf][value=" + data.rbbanrf + "]").prop('checked', true);
                $("input[name=rbbanlf][value=" + data.rbbanlf + "]").prop('checked', true);
                $("input[name=rbbanrb][value=" + data.rbbanrb + "]").prop('checked', true);
                $("input[name=rbbanlb][value=" + data.rbbanlb + "]").prop('checked', true);
                $("input[name=rbdongkrak][value=" + data.rbdongkrak + "]").prop('checked', true);
                $("input[name=rbkaca][value=" + data.rbkaca + "]").prop('checked', true);
                $("input[name=rbkf][value=" + data.rbkf + "]").prop('checked', true);
                $("input[name=rbaudio][value=" + data.rbaudio + "]").prop('checked', true);
                $("input[name=rbac][value=" + data.rbac + "]").prop('checked', true);
                $("input[name=rbbancdg][value=" + data.rbbancdg + "]").prop('checked', true);
                $("input[name=rbsmoke][value=" + data.smoke + "]").prop('checked', true);

                document.getElementById('txtbodyrepair').value = data.bodyrepair;
                document.getElementById('txrparking').value = data.parking;
                $("input[name=rbclean][value=" + data.cleaniness + "]").prop('checked', true);

                $("#btsave").show();
                $("#divbtnsave").show();

                $("#btapprove").hide();
                $("#divapprove").hide();

                $("#divreturn").hide();
                $("#btreturn").hide();

                $("#divreject").hide();
               

            }
        }).fail(function (xhr, msg) {
            alert("Proses Error " + msg);
        });

    },

    CheckOut: function (Bookid, BookingNo) {
        $("#divFuelBeforeCO").show();
        $("#lblIDChecklist").val(Bookid, BookingNo);
        $("#divmybooklist").hide();
        $("#pnlCheckList").show();
        $("#divreject").hide();
        $.ajax({
            url: url + "/Home/CheckOutDetail",
            type: "POST",
            data: { Bookid: Bookid, BookingNo: BookingNo }
        }).done(function (data, textStatus, jqXHR) {
            $("#divmybooklist").hide();
            $("#pnlCheckList").show();

            $("#checkintitle").hide();
            $("#checkouttitle").show();

            $("#btsave").hide();
            $("#divbtnsave").hide();

            $("#divBody").show();
            $("#divClean").show();
            $("#divsmoke").show();
            $("#ChechkInStatus").hide();

            $("#btapprove").hide();
            $("#divapprove").hide();

            $("#divreturn").hide();
            $("#btreturn").hide();

            //if (data.cleaniness != '0') {
            //    data.cleaniness = "Y"
            //}
            //else if (data.cleaniness == "Y") {
            //    data.cleaniness = "Y"
            //}
            //else {
            //    data.cleaniness = "N"
            //}

            if (data.Role != 'admin') {

                $("input[name=rbfuel][value=" + data.rbfuel + "]").prop('checked', true);
                $("input[name=rbfuel]").prop('disabled', true);
                $("input[name=rbff][value=" + data.rbff + "]").prop('checked', true);
                $("input[name=rbff]").prop('disabled', true);
                $("input[name=rbdash][value=" + data.rbdash + "]").prop('checked', true);
                $("input[name=rbdash]").prop('disabled', true);
                $("input[name=rbSeat][value=" + data.rbSeat + "]").prop('checked', true);
                $("input[name=rbSeat]").prop('disabled', true);
                $("input[name=rbbmprf][value=" + data.rbbmprf + "]").prop('checked', true);
                $("input[name=rbbmprf]").prop('disabled', true);
                $("input[name=rbbmpr][value=" + data.rbbmpr + "]").prop('checked', true);
                $("input[name=rbbmpr]").prop('disabled', true);
                $("input[name=rbfenderrf][value=" + data.rbfenderrf + "]").prop('checked', true);
                $("input[name=rbfenderrf]").prop('disabled', true);
                $("input[name=rbfenderlf][value=" + data.rbfenderlf + "]").prop('checked', true);
                $("input[name=rbfenderlf]").prop('disabled', true);
                $("input[name=rbfenderrb][value=" + data.rbfenderrb + "]").prop('checked', true);
                $("input[name=rbfenderrb]").prop('disabled', true);
                $("input[name=rbfenderlb][value=" + data.rbfenderlb + "]").prop('checked', true);
                $("input[name=rbfenderlb]").prop('disabled', true);
                $("input[name=rbkm][value=" + data.rbkm + "]").prop('checked', true);
                $("input[name=rbkm]").prop('disabled', true);
                $("input[name=rbstnk][value=" + data.rbstnk + "]").prop('checked', true);
                $("input[name=rbstnk]").prop('disabled', true);
                $("input[name=rbserviceBook][value=" + data.rbserviceBook + "]").prop('checked', true);
                $("input[name=rbserviceBook]").prop('disabled', true);
                $("input[name=rbvelg][value=" + data.rbvelg + "]").prop('checked', true);
                $("input[name=rbvelg]").prop('disabled', true);
                $("input[name=rbbanrf][value=" + data.rbbanrf + "]").prop('checked', true);
                $("input[name=rbbanrf]").prop('disabled', true);
                $("input[name=rbbanlf][value=" + data.rbbanlf + "]").prop('checked', true);
                $("input[name=rbbanlf]").prop('disabled', true);
                $("input[name=rbbanrb][value=" + data.rbbanrb + "]").prop('checked', true);
                $("input[name=rbbanrb]").prop('disabled', true);
                $("input[name=rbbanlb][value=" + data.rbbanlb + "]").prop('checked', true);
                $("input[name=rbbanlb]").prop('disabled', true);
                $("input[name=rbdongkrak][value=" + data.rbdongkrak + "]").prop('checked', true);
                $("input[name=rbdongkrak]").prop('disabled', true);
                $("input[name=rbkaca][value=" + data.rbkaca + "]").prop('checked', true);
                $("input[name=rbkaca]").prop('disabled', true);
                $("input[name=rbkf][value=" + data.rbkf + "]").prop('checked', true);
                $("input[name=rbkf]").prop('disabled', true);
                $("input[name=rbaudio][value=" + data.rbaudio + "]").prop('checked', true);
                $("input[name=rbaudio]").prop('disabled', true);
                $("input[name=rbac][value=" + data.rbac + "]").prop('checked', true);
                $("input[name=rbac]").prop('disabled', true);
                $("input[name=rbbancdg][value=" + data.rbbancdg + "]").prop('checked', true);
                $("input[name=rbbancdg]").prop('disabled', true);
                $("input[name=rbsmoke][value=" + data.smoke + "]").prop('checked', true);
                $("input[name=rbsmoke]").prop('disabled', true);

                document.getElementById('txtbodyrepair').value = data.bodyrepair;
                document.getElementById('txtbodyrepair').disabled = true;
                $("input[name=rbclean][value=" + data.cleaniness + "]").prop('checked', true);
                $("input[name=rbclean]").prop('disabled', true);
                document.getElementById('txrparking').value = data.parking;
                document.getElementById('txrparking').disabled = true;

                //$("#lblCarType").val(data.Cartype);
                document.getElementById('lblCarType').innerHTML = data.Cartype;
                document.getElementById('lblDepartment').innerHTML = data.Department;
                document.getElementById('lblPlatNo').innerHTML = data.PlatNo;
                document.getElementById('lblPIC').innerHTML = data.PIC;
                document.getElementById('lblBookType').innerHTML = data.BookType;
                document.getElementById('lblpurpose').innerHTML = data.Purpose;
                document.getElementById('lblbookDate').innerHTML = data.BookDate;
                document.getElementById('lblRequest').innerHTML = data.UserReq;
                document.getElementById('lblStartDate').innerHTML = data.Startdate;
                document.getElementById('lblstatus').innerHTML = data.ApprovalStatus;
                document.getElementById('lblEndDate').innerHTML = data.Enddate;

                document.getElementById('lblIDChecklist').innerHTML = Bookid;
                document.getElementById('lblBookNo').innerHTML = BookingNo;

                document.getElementById('hideFuelVal').innerHTML = data.fuelCI;
                if (data.fuelCI == "25") {
                    document.getElementById('lblFuelCI').innerHTML = "0%-25%";
                }
                else if (data.fuelCI == "50") {
                    document.getElementById('lblFuelCI').innerHTML = "25%-50%";
                }
                else if (data.fuelCI == "75") {
                    document.getElementById('lblFuelCI').innerHTML = "50%-75%";
                }
                else {
                    document.getElementById('lblFuelCI').innerHTML = "75%-100%";
                }

                $("#btcheckout").hide();
                $("#divbtncheckout").hide();

                if (data.CheckOutStatus == "Approve" || data.CheckOutStatus == "Return") {
                    $("#divapproveCheckOut").hide();
                    $("#divreturnCheckOut").hide();
                }
                else if (data.IsCheckOut != 1) {
                    $("#divapproveCheckOut").hide();
                    $("#divreturnCheckOut").hide();
                }
                else {
                    $("#divapproveCheckOut").show();
                    $("#divreturnCheckOut").show();
                }
            }
            else
            {
                $("input[name=rbfuel][value=" + data.rbfuel + "]").prop('checked', true);
                $("input[name=rbff][value=" + data.rbff + "]").prop('checked', true);
                $("input[name=rbdash][value=" + data.rbdash + "]").prop('checked', true);
                $("input[name=rbSeat][value=" + data.rbSeat + "]").prop('checked', true);
                $("input[name=rbbmprf][value=" + data.rbbmprf + "]").prop('checked', true);
                $("input[name=rbbmpr][value=" + data.rbbmpr + "]").prop('checked', true);
                $("input[name=rbfenderrf][value=" + data.rbfenderrf + "]").prop('checked', true);
                $("input[name=rbfenderlf][value=" + data.rbfenderlf + "]").prop('checked', true);
                $("input[name=rbfenderrb][value=" + data.rbfenderrb + "]").prop('checked', true);
                $("input[name=rbfenderlb][value=" + data.rbfenderlb + "]").prop('checked', true);
                $("input[name=rbkm][value=" + data.rbkm + "]").prop('checked', true);
                $("input[name=rbstnk][value=" + data.rbstnk + "]").prop('checked', true);
                $("input[name=rbserviceBook][value=" + data.rbserviceBook + "]").prop('checked', true);
                $("input[name=rbvelg][value=" + data.rbvelg + "]").prop('checked', true);
                $("input[name=rbbanrf][value=" + data.rbbanrf + "]").prop('checked', true);
                $("input[name=rbbanlf][value=" + data.rbbanlf + "]").prop('checked', true);
                $("input[name=rbbanrb][value=" + data.rbbanrb + "]").prop('checked', true);
                $("input[name=rbbanlb][value=" + data.rbbanlb + "]").prop('checked', true);
                $("input[name=rbdongkrak][value=" + data.rbdongkrak + "]").prop('checked', true);
                $("input[name=rbkaca][value=" + data.rbkaca + "]").prop('checked', true);
                $("input[name=rbkf][value=" + data.rbkf + "]").prop('checked', true);
                $("input[name=rbaudio][value=" + data.rbaudio + "]").prop('checked', true);
                $("input[name=rbac][value=" + data.rbac + "]").prop('checked', true);
                $("input[name=rbbancdg][value=" + data.rbbancdg + "]").prop('checked', true);
                $("input[name=rbsmoke][value=" + data.smoke + "]").prop('checked', true);

                document.getElementById('txtbodyrepair').value = data.bodyrepair;
                $("input[name=rbclean][value=" + data.cleaniness + "]").prop('checked', true);
                document.getElementById('txrparking').value = data.parking;
                //document.getElementById('lblttlChargeAll').innerHTML = data.Charge;

                document.getElementById('lblCarType').innerHTML = data.Cartype;
                document.getElementById('lblDepartment').innerHTML = data.Department;
                document.getElementById('lblPlatNo').innerHTML = data.PlatNo;
                document.getElementById('lblPIC').innerHTML = data.PIC;
                document.getElementById('lblBookType').innerHTML = data.BookType;
                document.getElementById('lblpurpose').innerHTML = data.Purpose;
                document.getElementById('lblbookDate').innerHTML = data.BookDate;
                document.getElementById('lblRequest').innerHTML = data.UserReq;
                document.getElementById('lblStartDate').innerHTML = data.Startdate;
                document.getElementById('lblstatus').innerHTML = data.ApprovalStatus;
                document.getElementById('lblEndDate').innerHTML = data.Enddate;

                document.getElementById('lblIDChecklist').innerHTML = Bookid;
                document.getElementById('lblBookNo').innerHTML = BookingNo;

                document.getElementById('hideFuelVal').innerHTML = data.fuelCI;
                if (data.fuelCI == "25") {
                    document.getElementById('lblFuelCI').innerHTML = "0%-25%";
                }
                else if (data.fuelCI == "50") {
                    document.getElementById('lblFuelCI').innerHTML = "25%-50%";
                }
                else if (data.fuelCI == "75") {
                    document.getElementById('lblFuelCI').innerHTML = "50%-75%";
                }
                else {
                    document.getElementById('lblFuelCI').innerHTML = "75%-100%";
                }

                if (data.CheckOutStatus == "Approve" || data.CheckOutStatus == "Return") {
                    $("#btcheckout").show();
                    $("#divbtncheckout").show();
                }
                else {
                    $("#btcheckout").hide();
                    $("#divbtncheckout").hide();
                }

                $("#divapproveCheckOut").hide();
                $("#divreturnCheckOut").hide();
            }

            let dollarUSLocale = Intl.NumberFormat('en-US');
            var chargebody = 300000;
            var chargeSmoke = 1000000;
            var chargeFuel = 120000 //50000;
            var chargeclean = 150000;
            document.getElementById('lblcbody').innerHTML = dollarUSLocale.format(chargebody);
            document.getElementById('lblcclean').innerHTML = dollarUSLocale.format(chargeclean);
            document.getElementById('lblsmoke').innerHTML = dollarUSLocale.format(chargeSmoke);
            document.getElementById('lblcFuel').innerHTML = dollarUSLocale.format(chargeFuel);

            checkChargeBody();
            checkChargeClean();
            checkSmoke();
            checkChargeFuel();

        }).fail(function (xhr, msg) {   
            alert("Proses Error " + msg);
        });
    },

    Validation: function () {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var today = mm + '/' + dd + '/' + yyyy;

        var lblbookDate = $("#datebook").val(); 
        var booktype = document.getElementById("booktype").value;
        var dateStart = $("#datebookstart").val();
        var dateEnd = $("#datebookend").val();
        var result = true;
        
        if (lblbookDate == "") {
            $('#myModal').modal('show');
            $('#modaltext').text("Please provide date book..");
            result = false;
        }
        else if (dateStart > dateEnd) {
            $('#myModal').modal('show');
            $('#modaltext').text("Start date greater than End date. Please provide the date");
            result = false;
        }
        else if (dateStart < today && dateEnd < today) {
            $('#myModal').modal('show');
            $('#modaltext').text("Cannot book past date");
            result = false;
        }
        else if ($('#cartype option:selected').val() == 0) {
            $('#myModal').modal('show');
            $('#modaltext').text("Please provide asset..");
            result = false;
        }
        else if ($('#department option:selected').val() == 0) {
            $('#myModal').modal('show');
            $('#modaltext').text("Please provide department..");
            result = false;
        }
        else if ($('#ddpic option:selected').val() == 0) {
            $('#myModal').modal('show');
            $('#modaltext').text("Please provide PIC..");
            result = false;
        }
        else if ($('#purpose option:selected').val() == 0) {
            $('#myModal').modal('show');
            $('#modaltext').text("Please provide Purpose..");
            result = false;
        }
        else if (booktype == "") {
            $('#myModal').modal('show');
            $('#modaltext').text("Please provide Book Type..");
            result = false;
        }
        else if ($('#bookrepeat option:selected').val() == 0) {
            $('#myModal').modal('show');
            $('#modaltext').text("This is Book repeat or not? please provide");
            result = false;
        }
        
        return result;
    },

    CheckListValidation: function (check) {
        var result = true;
        var bodyrepair = document.getElementById("txtbodyrepair").value;
        var cleaniness = document.querySelector('input[name="rbclean"]:checked'); /*document.getElementById("txtCleanliness").value;*/
        //var bodyrepair = $('#txtbodyrepair').text;
        //var cleaniness = $('#txtCleanliness').text;

        var Fuel = document.querySelector('input[name="rbfuel"]:checked');
        var FrontFender = document.querySelector('input[name="rbff"]:checked');
        var Dashboard = document.querySelector('input[name="rbdash"]:checked');
        var Seat = document.querySelector('input[name="rbSeat"]:checked');
        var BemperFRONT = document.querySelector('input[name="rbbmprf"]:checked');
        var BemperBACK = document.querySelector('input[name="rbbmpr"]:checked');
        var FenderRIGHTFRONT = document.querySelector('input[name="rbfenderrf"]:checked');
        var FenderLEFTFRONT = document.querySelector('input[name="rbfenderlf"]:checked');
        var FenderRIGHTBACK = document.querySelector('input[name="rbfenderrb"]:checked');
        var FenderLEFTBACK = document.querySelector('input[name="rbfenderlb"]:checked');
        var CarHood = document.querySelector('input[name="rbkm"]:checked');
        var STNK = document.querySelector('input[name="rbstnk"]:checked');
        var ServiceBook = document.querySelector('input[name="rbserviceBook"]:checked');
        var VELG = document.querySelector('input[name="rbvelg"]:checked');
        var TIRERIGHTFRONT = document.querySelector('input[name="rbbanrf"]:checked');
        var TIRELEFTFRONT = document.querySelector('input[name="rbbanlf"]:checked');
        var TIRERIGHTBACK = document.querySelector('input[name="rbbanrb"]:checked');
        var TIRELEFTBACK = document.querySelector('input[name="rbbanlb"]:checked');
        var Jack = document.querySelector('input[name="rbdongkrak"]:checked');
        var Windshield = document.querySelector('input[name="rbkaca"]:checked');
        var GlassFilm = document.querySelector('input[name="rbkf"]:checked');
        var AUDIO = document.querySelector('input[name="rbaudio"]:checked');
        var AC = document.querySelector('input[name="rbac"]:checked');
        var SpareTire = document.querySelector('input[name="rbbancdg"]:checked');
        var smoke = document.querySelector('input[name="rbsmoke"]:checked');

        if (Fuel == null) { /*(!Fuel.checked) {*/
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Fuel condition");
            result = false;
        }
        else if (FrontFender == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Front Fender condition");
            result = false;
        }
        else if (Dashboard == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Dashboard condition");
            result = false;
        }
        else if (Seat == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Seat condition");
            result = false;
        }
        else if (BemperFRONT == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Bemper front condition");
            result = false;
        }
        else if (BemperBACK == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Bemper back condition");
            result = false;
        }
        else if (FenderRIGHTFRONT == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Fender right-front condition");
            result = false;
        }
        else if (FenderLEFTFRONT == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Fender left-front condition");
            result = false;
        }
        else if (FenderRIGHTBACK == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Fender right-back condition");
            result = false;
        }
        else if (FenderLEFTBACK == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Fender left-back condition");
            result = false;
        }
        else if (CarHood == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Car Hood condition");
            result = false;
        }
        else if (STNK == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide STNK condition");
            result = false;
        }
        else if (ServiceBook == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Service Book condition");
            result = false;
        }
        else if (VELG == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide VELG condition");
            result = false;
        }
        else if (TIRERIGHTFRONT == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide TIRE RIGHT-FRONT condition");
            result = false;
        }
        else if (TIRELEFTFRONT == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide TIRE LEFT-FRONT condition");
            result = false;
        }
        else if (TIRERIGHTBACK == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide TIRE RIGHT-BACK condition");
            result = false;
        }
        else if (TIRELEFTBACK == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide TIRE LEFT-BACK condition");
            result = false;
        }
        else if (Jack == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Jack condition");
            result = false;
        }
        else if (Windshield == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Windshield condition");
            result = false;
        }
        else if (GlassFilm == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Car Glass Wrap Film condition");
            result = false;
        }
        else if (AUDIO == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide AUDIO condition");
            result = false;
        }
        else if (AC == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide AC condition");
            result = false;
        }
        else if (SpareTire == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Spare Tire condition");
            result = false;
        }
        else if (smoke == null) {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide smoke condition");
            result = false;
        }
        else if (bodyrepair == "") {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide Body Repair condtion");
            result = false;
        }
        else if (cleaniness == "") {
            $('#myModal').modal('show');
            $('#modaltext').text("please provide cleaniness condtion");
            result = false;
        }
        return result;
    },

    ChecklistApproval: function (StatusCheckIn) {
        var BookNumber = $('#lblBookNo').text();
        //console.log(StatusCheckIn);
        //console.log(BookNumber);
        $.ajax({
            url: url + "/Home/ApprovalCheckIn",
            type: "POST",
            datatype: "json",
            data: { BookNumber: BookNumber, StatusCheckIn: StatusCheckIn},
            success: function (result) {
                location.reload();
            },
            error: function (xhr, msg) {
                alert("Proses Error " + msg);
            }
        })
    },

    ApprovalCheckOut: function (StatusCheckOut) {
        var BookNumber = $('#lblBookNo').text();
        $.ajax({
            url: url + "/Home/ApprovalCheckOut",
            type: "POST",
            datatype: "json",
            data: { BookNumber: BookNumber, StatusCheckOut: StatusCheckOut },
            success: function (result) {
                location.reload();
            },
            error: function (xhr, msg) {
                alert("Proses Error " + msg);
            }
        })
    },
}
