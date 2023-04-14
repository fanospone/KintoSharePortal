
jQuery(document).ready(function () {
    Table.Load();
    Control.Button();
    //Control.ReportType();
    $('#divReportUser').hide();
});

var Table = {
    Load: function () {
        //Table.Init("#tblBookHeader");
        params = {
            Reporttype: $("#reporttype").val(),
            Startdate: $("#Startdate").val(),
            Enddate: $("#Enddate").val()
        };
        $.ajax({
            type: "POST",
            url: BaseUrl + "/Home/BookingListReport",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(params),
            dataType: "json",
            async: false,
            success: function (data) {
                $("#tblBookHeader").DataTable(
                    {
                        paging: true,
                        searching: true,
                        bLengthChange: true,
                        lengthMenu: [[10, 25, -1], [10, 25, "All"]],
                        bfilter: true,
                        bsort: true,
                        bpaginate: true,
                        bDestroy: true,
                        scrollX: true,
                        data: data,
                        columnDefs: [
                            {
                                'targets': [0, 9, 10, 11],
                                'visible': false
                            },
                        ],
                        columns: [
                            { 'data': 'ID' },
                            { 'data': 'BookingNo' },
                            { 'data': 'Cartype' },
                            { 'data': 'PlatNo' },
                            { 'data': 'Department' },
                            { 'data': 'PIC' },
                            { 'data': 'BookDate' },
                            { 'data': 'DateFreq' },
                            { 'data': 'ApprovalStatus' },
                            { 'data': 'UserReq' },
                            { 'data': 'Purpose' },
                            { 'data': 'DateCrt' },
                            { 'data': 'KintoShareFee', render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                        ],

                    })
            },
            error: function (err) {
                alert(err.responseText);
                console.log(err);
            }
        })
        //    $("#tblBookHeader").DataTable({
        //        "processing": true, // for show progress bar  
        //        "serverSide": true, // for process server side  
        //        "filter": false, // this is for disable filter (search box)  
        //        "orderMulti": false, // for disable multiple column at once  
        //        "destroy": true,
        //        "pageLength": 5,
        //        "ajax": {
        //            "url": url + "/Home/BookingListReport",
        //            "type": "POST",
        //            "datatype": "json",
        //            "data": params
        //        },
        //        "columnDefs":
        //            [
        //                {
        //                    "targets": [0, 9, 10, 11],
        //                    "visible": false,
        //                    "searchable": false
        //                }
        //            ],
        //        "columns": [
        //            { "data": "ID", "name": "ID" },
        //            { "data": "BookingNo", "name": "BookingNo" },
        //            { "data": "Cartype", "name": "Cartype" },
        //            { "data": "PlatNo", "name": "PlatNo" },
        //            { "data": "Department", "name": "Department" },
        //            { "data": "PIC", "name": "PIC" },
        //            { "data": "BookDate", "name": "BookDate" },
        //            { "data": "DateFreq", "name": "DateFreq" },
        //            { "data": "ApprovalStatus", "name": "ApprovalStatus" },
        //            { "data": "UserReq", "name": "UserReq" },
        //            { "data": "Purpose", "name": "Purpose" },
        //            { "data": "DateCrt", "name": "DateCrt" },
        //            { "data": "KintoShareFee", "name": "KintoShareFee", render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
        //        ],
        //        "scrollY": 300, /* Enable vertical scroll to allow fixed columns */
        //        "scrollX": true, /* Enable horizontal scroll to allow fixed columns */
        //        "scrollCollapse": true,
        //        //"fnDrawCallback": function () {

        //        //},
        //    });
    },

    LoadUserReport: function () {
        /*Table.Init("#tblBookUser");*/
        paramUser = {
            Reporttype: $("#reporttype").val(),
            Startdate: $("#Startdate").val(),
            Enddate: $("#Enddate").val()
        };
        $.ajax({
            type: "POST",
            url: BaseUrl + "/Home/UserListReport",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(paramUser),
            dataType: "json",
            async: false,
            success: function (data) {
                $("#tblBookUser").DataTable(
                    {
                        paging: true,
                        searching: true,
                        bLengthChange: true,
                        lengthMenu: [[10, 25, -1], [10, 25, "All"]],
                        bfilter: true,
                        bsort: true,
                        bpaginate: true,
                        bDestroy: true,
                        scrollX: true,
                        data: data,
                        columnDefs: [
                            {
                                'targets': [0],
                                'visible': false
                            },
                        ],
                        columns: [
                            { 'data': 'ID'},
                            { 'data': 'BookingNo' },
                            { 'data': 'BookDate'},
                            { 'data': 'Startdate'},
                            { 'data': 'Enddate'},
                            { 'data': 'Revenue', render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                            { 'data': 'KintoShareFee', render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                            { 'data': 'Charge', render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                            { 'data': 'UserReq'},
                            { 'data': 'PIC'},
                            { 'data': 'Department'},
                        ],

                    })
            },
            error: function (err) {
                alert(err.responseText);
                console.log(err);
            }
        })

        //$("#tblBookUser").DataTable({
        //    "processing": true, // for show progress bar  
        //    "serverSide": true, // for process server side  
        //    "filter": false, // this is for disable filter (search box)  
        //    "orderMulti": false, // for disable multiple column at once  
        //    "destroy": true,
        //    "pageLength": 5,
        //    "ajax": {
        //        "url": url + "/Home/UserListReport",
        //        "type": "POST",
        //        "datatype": "json",
        //        "data": paramUser
        //    },
        //    "columnDefs":
        //        [
        //            {
        //                "targets": [0],
        //                "visible": false,
        //                "searchable": false
        //            }
        //        ],
        //    "columns": [
        //        { "data": "ID", "name": "ID", "autoWidth": true },
        //        { "data": "BookingNo", "name": "BookingNo", "autoWidth": true },
        //        { "data": "Startdate", "name": "Startdate", "autoWidth": true },
        //        { "data": "Enddate", "name": "Enddate", "autoWidth": true },
        //        { "data": "Revenue", "name": "Revenue", "autoWidth": true, "autoWidth": true, render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
        //        { "data": "KintoShareFee", "name": "KintoShareFee", "autoWidth": true, render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
        //        { "data": "Charge", "name": "Charge", "autoWidth": true, render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
        //        { "data": "UserReq", "name": "UserReq", "autoWidth": true },
        //        { "data": "PIC", "name": "PIC", "autoWidth": true },
        //        { "data": "Department", "name": "Department", "autoWidth": true },
        //    ],
        //    "scrollY": 300, /* Enable vertical scroll to allow fixed columns */
        //    "scrollX": true, /* Enable horizontal scroll to allow fixed columns */
        //    "scrollCollapse": true,
        //    //"fnDrawCallback": function () {

        //    //},
        //})

    },
}

var Form = {
    Validation: function () {
        var result = true;
        var todayDate = new Date();
        var dd = String(todayDate.getDate()).padStart(2, '0');
        var mm = String(todayDate.getMonth() + 1).padStart(2, '0');
        var yyyy = todayDate.getFullYear();
        Today = mm + '-' + dd + '-' + yyyy;
        var stDate = document.getElementById('Startdate').value; /*new Date($("#Startdate").val());*/
        var edDate = document.getElementById('Enddate').value;/*new Date($("#Enddate").val());*/

        console.log(todayDate);
        console.log(stDate);
        console.log(edDate);

        if ((stDate == "" || stDate == null)) {
            //$('#myModal').modal('show');
            $('#myModal').modal('show').addClass('in');
            $('#modaltext').text("Please provide start date");
            result = false;
        }
        else if ((edDate == "" || edDate == null)) {
            //$('#myModal').modal('show');
            $('#myModal').modal('show').addClass('in');
            $('#modaltext').text("Please provide end date");
            result = false;
        }
        else if (stDate > edDate) {
            //$('#myModal').modal('show');
            $('#myModal').modal('show').addClass('in');
            $('#modaltext').text("Start date must be smaller than End date");
            result = false;
        }
        return result;
    }
}

var Control = {
    Button: function () {
        $("#btExportExcel").unbind().click(function () {
            if (Form.Validation()) {
                Export.ToExcel();
            }
        });

        $("#btnsearch").unbind().click(function () {
            ReportTypeSearch = $("#reporttype option:selected").text();
            if (ReportTypeSearch == "Asset") {
                if (Form.Validation()) {
                    $("#divReportUser").hide();
                    $("#content").show();
                    Table.Load();
                }
            }
            else {
                if (Form.Validation()) {
                    $("#divReportUser").show();
                    $("#content").hide();
                    Table.LoadUserReport();
                }
            }
        });
    },

    ReportType: function () {
        ReportType = $("#reporttype option:selected").text();
        if (ReportType == "Asset") {
            $("#divReportUser").hide();
            $("#content").show();
            Table.Load();
        }
        else {
            $("#divReportUser").show();
            $("#content").hide();
            Table.LoadUserReport();
        }
    },
}

var Export = {
    ToExcel: function () {
        window.location.href = BaseUrl + "Home/ExportToExcelKinto?Reporttype=" + $('#reporttype').val() + "&Startdate=" + $("#Startdate").val() + "&Enddate=" + $("#Enddate").val();
    },
}