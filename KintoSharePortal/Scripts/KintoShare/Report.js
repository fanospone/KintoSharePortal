var url = "";

if (ENVIRONMENT == "LOCAL")
    url = BASE_URL_LOCAL;
else if (ENVIRONMENT == "DEV")
    url = BASE_URL_DEV;
else
    url = BASE_URL_PRD;

jQuery(document).ready(function () {
    Table.Load();
    Control.Button();
    $('#divReportUser').hide();

});

var Table = {
    Load: function () {
        params = {
            Reporttype: $("#reporttype").val(),
            Startdate: $("#Startdate").val(),
            Enddate: $("#Enddate").val()
        };
        $("#tblBookHeader").DataTable({
            "processing": true, // for show progress bar  
            "serverSide": true, // for process server side  
            "filter": true, // this is for disable filter (search box)  
            "orderMulti": false, // for disable multiple column at once  
            "pageLength": 5,
            "ajax": {
                "url": "/Home/BookingListReport",
                "type": "POST",
                "datatype": "json",
                "data" : params
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
                { "data": "KintoShareFee", "name": "KintoShareFee", "autoWidth": true, render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
            ],
            "scrollY": 300, /* Enable vertical scroll to allow fixed columns */
            "scrollX": true, /* Enable horizontal scroll to allow fixed columns */
            "scrollCollapse": true,
            "fnDrawCallback": function () {

            },
        })
    },
    LoadUserReport: function () {
        $("#tblBookUser").DataTable({
            "processing": true, // for show progress bar  
            "serverSide": true, // for process server side  
            "filter": true, // this is for disable filter (search box)  
            "orderMulti": false, // for disable multiple column at once  
            "pageLength": 5,
            "ajax": {
                "url": "/Home/UserListReport",
                "type": "POST",
                "datatype": "json",
                "data": params
            },
            "columnDefs":
                [
                    {
                        "targets": [0],
                        "visible": false,
                        "searchable": false
                    }
                ],
            "columns": [
                { "data": "ID", "name": "ID", "autoWidth": true },
                { "data": "BookingNo", "name": "BookingNo", "autoWidth": true },
                { "data": "Startdate", "name": "Startdate", "autoWidth": true },
                { "data": "Enddate", "name": "Enddate", "autoWidth": true },
                { "data": "Revenue", "name": "Revenue", "autoWidth": true, "autoWidth": true, render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                { "data": "KintoShareFee", "name": "KintoShareFee", "autoWidth": true, render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                { "data": "Charge", "name": "Charge", "autoWidth": true, render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                { "data": "UserReq", "name": "UserReq", "autoWidth": true },
                { "data": "PIC", "name": "PIC", "autoWidth": true },
                { "data": "Department", "name": "Department", "autoWidth": true },
            ],
            "scrollY": 300, /* Enable vertical scroll to allow fixed columns */
            "scrollX": true, /* Enable horizontal scroll to allow fixed columns */
            "scrollCollapse": true,
            "fnDrawCallback": function () {

            },
        })

    }
}

var Control = {
    Button: function () {
        $("#btExportExcel").unbind().click(function () {
            //$("#tblBookHeader").hide();
            Export.ToExcel();
        });
        //$("#btExportExcelNew").unbind().click(function () {
        //    //$("#tblBookHeader").hide();
        //    Export.ToExcelNew();
        //});
    },
    ReportType: function () {
        ReportType = $("#reporttype option:selected").text();
        if (ReportType == 'Asset') {
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
        window.location.href = "/Home/ExportToExcelKinto?Reporttype=" + $('#reporttype').val() + "&Startdate=" + $("#Startdate").val() + "&Enddate=" + $("#Enddate").val();
    },
}