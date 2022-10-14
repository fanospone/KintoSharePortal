var url = "";

if (ENVIRONMENT == "LOCAL")
    url = BASE_URL_LOCAL;
else if (ENVIRONMENT == "DEV")
    url = BASE_URL_DEV;
else
    url = BASE_URL_PRD;
jQuery(document).ready(function () {
    $("#divttlcbody").hide();
    $("#divttlcClean").hide();
    $("#divttlcSmoke").hide();

    $('#datePick').multiDatesPicker();
    $("#divmybooklist").show();
    $("#divdetail").hide();
    $("#pnlCheckList").hide();
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
    var ttl = 0;
    let dollarUSLocale = Intl.NumberFormat('en-US');
    let daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = new Date(StartDate).getDay();
    let dayName = daysArray[day];
    
    var ddStart = String(new Date(StartDate).getDate());
    var ddEnd = String(new Date(EndDate).getDate());

    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(StartDate);
    const secondDate = new Date(EndDate);

    for (var i = parseInt(ddStart); i <= parseInt(ddEnd); i++) {
        console.log(daysArray[day]);
        var StrDay = daysArray[day];
        var feeweekday = $('#lblweekday').text();
        var feeweekend = $('#lblweekend').text();
        feeday = feeweekday.replace(/\,/g, '');
        feeend = feeweekend.replace(/\,/g, '');

        if (StrDay !== 'Saturday' && StrDay !== 'Sunday') {
            ttl = parseInt(ttl) + parseInt(feeday);
            ttl++;
            console.log(ttl);

        }
        else {
            ttl = parseInt(ttl) + parseInt(feeend);
            ttl++;
            console.log(ttl);
        }

        if (day == 6)
            day = 0;
        else
            day++;
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
    TtlChargeAll = parseInt(chargeSmokefee) + parseInt(chargeCleanfee) + parseInt(chargeBodyfee)
    document.getElementById('lblttlChargeAll').innerHTML = dollarUSLocale.format(TtlChargeAll);
}

function checkChargeClean() {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    $("#divttlcClean").show();
    var ttlClean = 0;
    var valpanel = $("#txtCleanliness").val();

    cclean = $('#lblcclean').text();
    ccleanfee = cclean.replace(/\,/g, '');

    ttlClean = parseInt(valpanel) * parseInt(ccleanfee)
    document.getElementById('lblttlChargeClean').innerHTML = dollarUSLocale.format(ttlClean);

    chargeSmoke = $('#lblttlChargeSmoke').text();
    chargeSmokefee = chargeSmoke.replace(/\,/g, '');
    chargeClean = $('#lblttlChargeClean').text();
    chargeCleanfee = chargeClean.replace(/\,/g, '');
    chargeBody = $('#lblttlChargeBody').text();
    chargeBodyfee = chargeBody.replace(/\,/g, '');
    TtlChargeAll = parseInt(chargeSmokefee) + parseInt(chargeCleanfee) + parseInt(chargeBodyfee)
    document.getElementById('lblttlChargeAll').innerHTML = dollarUSLocale.format(TtlChargeAll);
}

function CheckSmoke() {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    $("#divttlcSmoke").show();
    smokec = document.querySelector('input[name="rbsmoke"]:checked').value;
    if (smokec == "Y") {
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
        TtlChargeAll = parseInt(chargeSmokefee) + parseInt(chargeCleanfee) + parseInt(chargeBodyfee)
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
        TtlChargeAll = parseInt(chargeSmokefee) + parseInt(chargeCleanfee) + parseInt(chargeBodyfee)
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
                url: "/Home/DeleteBook",
                data: { Bookid: id, BookingNo: bookNo },
                dataType: "json",
                success: function (msg) {
                    alert("Data has been save");
                    location.reload();
                }, error: function (xhr, msg) {
                    alert("Proses Error " + msg);
                }, complete: function () {
                    alert("Proses Complete");
                    Form.LoadData();
                }
            });
            swal("Deleted!", "Your imaginary file has been deleted.", "success");
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
            swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
    });
}

var Control = {
    Button: function () {
        $("#btsubmitReq").unbind().click(function () {
            if (Form.Validation()) {
                Form.Submit();
            }
        });

        $("#btcancelReq").unbind().click(function () {
            $("#divmybooklist").show();
            $("#divdetail").hide();
            $("#pnlCheckList").hide();
        });

        $("#btsave").unbind().click(function () {
            Form.SubmitCheckList();
        });
        $("#btcheckout").unbind().click(function () {
            if (Form.CheckListValidation()) {
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
        });
    },

    BindingDept: function () {
        $.ajax({
            url: "/Home/ListDept",
            type: "GET"
        })
            .done(function (data, textStatus, jqXHR) {
                //console.log(data);
                /* if (Common.CheckError.List(data)) {*/
                $("#department").append("<option value='0'>--Select Department--</option>");
                    $.each(data, function (i, item) {
                        //console.log(item);
                        $("#department").append("<option value='" + item.DeptId + "'>" + item.DeptId + " - " + item.DeptName + "</option>");
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
            url: "/Home/ListCar",
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

        $.ajax({
            url: "/Home/PlatNo",
            type: "GET",
            data: { CarId: CarId.value.trim() }
        })
            .done(function (data, textStatus, jqXHR) {
                $("#licenseplat").val(data.PlatNo);
                $('#lblweekday').text(dollarUSLocale.format(data.FeeWeekDay));
                $('#lblweekend').text(dollarUSLocale.format(data.FeeWeekEnd));
            })
            .fail(function (jqXHR, textStatus, errorThrown){
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            });
    },

    GetPIC: function (DeptID) {
        $.ajax({
            url: "/Home/ListPIC",
            type: "GET",
            data: { DeptID: DeptID.value.trim()}
        })
            .done(function (data, textStatus, jqXHR) {
                //console.log(data);
                /* if (Common.CheckError.List(data)) {*/
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
}

var Form = {
    Submit: function () {

        Form.Validation();

        strfee = $('#kintosharefee').val();
        newfee = strfee.replace(/\,/g, '');

        Submitparam = {
            Cartype: $("#cartype option:selected").text(), /*selectedCarText,*/ /*$('#cartype').text(),*/
            Department: $("#department option:selected").text(),
            PlatNo: $('#licenseplat').val(),
            PIC: $("#ddpic option:selected").text(),
            BookType: $('#booktype').val(),
            Purpose: $('#purpose').val(),
            BookRepeat: $('#bookrepeat').val(),
            KintoShareFee: newfee, /*$('#kintosharefee').val(),*/
            DateFreq: $('#datefreq').val(),
            StartDate: $('#datebookstart').val(),
            EndDate: $('#datebookend').val()
        };
        $.ajax({
            type: "POST",
            //async: false,
            url: "/Home/SubmitBook",
            data: Submitparam,
            dataType: "json",
            success: function (msg) {
                alert("Data has been save");
                $('#divmybooklist').show();
                $('#divdetail').hide();
                $('#pnlCheckList').hide();
                location.reload();
                Form.LoadData();
            }, error: function (xhr, msg) {
                alert("Proses Error " + msg);
            }, complete: function () {
                alert("Proses sudah selesai");
                $('#divmybooklist').show();
                $('#divdetail').hide();
                $('#pnlCheckList').hide();
                location.reload();
                Form.LoadData();
            }
        });
    },

    LoadHeader: function () {

        $("#tblBookHeader").DataTable({
            "processing": true, // for show progress bar  
            "serverSide": true, // for process server side  
            "filter": true, // this is for disable filter (search box)  
            "orderMulti": false, // for disable multiple column at once  
            "pageLength": 5,
            "ajax": {
                "url": "/Home/BookingList",
                "type": "POST",
                "datatype": "json"
            },
            "columnDefs":
                [
                    {
                        "targets": [0, 9, 10, 11],
                        "visible": false,
                        "searchable": false
                    }
                ],
            "columns": [
                { "data": "ID", "name": "ID", "autoWidth": true },
                { "data": "BookingNo", "name": "BookingNo", "autoWidth": true },
                { "data": "Cartype", "name": "Cartype", "autoWidth": true },
                { "data": "PlatNo", "name": "PlatNo", "autoWidth": true },
                { "data": "Department", "name": "Department", "autoWidth": true },
                { "data": "PIC", "name": "PIC", "autoWidth": true },
                { "data": "BookDate", "name": "BookDate", "autoWidth": true },
                { "data": "DateFreq", "name": "DateFreq", "autoWidth": true },
                { "data": "ApprovalStatus", "name": "ApprovalStatus", "autoWidth": true },
                { "data": "UserReq", "name": "UserReq", "autoWidth": true },
                { "data": "Purpose", "name": "Purpose", "autoWidth": true },
                { "data": "DateCrt", "name": "DateCrt", "autoWidth": true },
                {
                    data: null, render: function (data, type, row) {
                        if (data.ApprovalStatus != "Cancel" && data.ApprovalStatus != "Waiting")
                            return "<a href='#' class='btn btn-danger' onclick=Form.CheckIn('" + row.ID + "','" + row.BookingNo + "'); > Check - In </a > "; //,'" + row.Cartype + "','" + row.Department + "','" + row.PlatNo + "','" + row.PIC + "','" + row.BookDate + "','" + row.ApprovalStatus + "','" + row.UserReq + "','" + row.Purpose + "','" + row.DateCrt + "'); > Check - In</a > ";
                        
                        else 
                            return "";
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (data.ApprovalStatus != "Cancel" && data.ApprovalStatus != "Waiting")
                            return "<a href='#' class='btn btn-danger' onclick=Form.CheckOut('" + row.ID + "','" + row.BookingNo + "'); >CheckOut</a>";
                        else
                            return "";
                    }
                },
                {
                    data: null, render: function (data, type, row) {
                        if (data.ApprovalStatus == "Waiting")
                            return "<a href='#' class='btn btn-danger' onclick=showCancelMessage('" + row.ID + "','" + row.BookingNo + "');>Cancel</a>";
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
            rbfuel: document.querySelector('input[name="rbfuel"]:checked').value
        };
        console.log(param);
        $.ajax ({
            url: "/Home/SubmitChecklist",
            type: "POST",
            datatype: "json",
            data: param,
            success: function (result) {
                location.reload();
            },
            error: function (xhr, msg) {
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
            cleaniness: document.getElementById("txtCleanliness").value,
            smoke: document.querySelector('input[name="rbsmoke"]:checked').value,
            Charge: chargefee
        };
        $.ajax({
            url: "/Home/SubmitCheckOut",
            type: "POST",
            datatype: "json",
            data: param,
            success: function (result) {
                location.reload();
            },
            error: function (xhr, msg) {
                alert("Proses Error " + msg);
            }
        })

    },

    CheckIn: function (Bookid, BookingNo) { //, Cartype,Department,PlatNo,PIC,BookDate,ApprovalStatus,UserReq,Purpose,ReqDate) {
        //$("#lblIDChecklist").val(Bookid);
        $.ajax({
            url: "/Home/CheckListDetail",
            type: "POST",
            data: { Bookid: Bookid, BookingNo: BookingNo }
        }).done(function (data, textStatus, jqXHR) {
            $("#divmybooklist").hide();
            $("#pnlCheckList").show();

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

            $("#btsave").show();
            $("#divbtnsave").show();

            $("#btcheckout").hide();
            $("#divbtncheckout").hide();
        }).fail(function (xhr, msg) {
            alert("Proses Error " + msg);
        });

    },

    CheckOut: function (Bookid, BookingNo) {
        $("#lblIDChecklist").val(Bookid, BookingNo);
        $("#divmybooklist").hide();
        $("#pnlCheckList").show();
        $.ajax({
            url: "/Home/CheckListDetail",
            type: "POST",
            data: { Bookid: Bookid, BookingNo: BookingNo }
        }).done(function (data, textStatus, jqXHR) {
            $("#divmybooklist").hide();
            $("#pnlCheckList").show();

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

            $("#btsave").hide();
            $("#divbtnsave").hide();

            $("#btcheckout").show();
            $("#divbtncheckout").show();
            let dollarUSLocale = Intl.NumberFormat('en-US');
            var chargebody = 50000;
            var chargeSmoke = 1000000;
            document.getElementById('lblcbody').innerHTML = dollarUSLocale.format(chargebody);
            document.getElementById('lblcclean').innerHTML = dollarUSLocale.format(chargebody);
            document.getElementById('lblsmoke').innerHTML = dollarUSLocale.format(chargeSmoke);

        }).fail(function (xhr, msg) {   
            alert("Proses Error " + msg);
        });
    },

    Validation: function () {
        var lblbookDate = $("#datebook").val();
        var booktype = document.getElementById("booktype").value;
        var result = true;
        
        if (lblbookDate == "") {
            $('#myModal').modal('show');
            $('#modaltext').text("Please provide date book..");
            result = false;
        }
        else if ($('#cartype option:selected').val() == 0) {
            $('#myModal').modal('show');
            $('#modaltext').text("Please provide vacehile..");
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

    CheckListValidation: function () {
        var result = true;
        var bodyrepair = document.getElementById("txtbodyrepair").value;
        var cleaniness = document.getElementById("txtCleanliness").value;
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
}