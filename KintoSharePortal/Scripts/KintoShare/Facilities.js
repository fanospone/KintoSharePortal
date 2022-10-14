var url = "";

if (ENVIRONMENT == "LOCAL")
    url = BASE_URL_LOCAL;
else if (ENVIRONMENT == "DEV")
    url = BASE_URL_DEV;
else
    url = BASE_URL_PRD;
var paramHeader = {};

jQuery(document).ready(function () {
    $("#divassetaction").hide();
    Control.Init();
    Form.LoadData();

    
});

function showpnladdasset() {
    $("#divassetaction").show();
    $("#lblAddasset").show();
    $("#lblEditasset").hide();
}

var Control = {
    Init: function () {
        Control.Button();

    },
    Button: function () {
        $("#btsave").unbind().click(function () {
            Form.Save();
        });

        $("btaddasset").unbind().click(function () {
            $("#divassetaction").show();
        });
        $("#btcancel").unbind().click(function () {
            $("#divassetaction").hide();
        });
    }
}
var Data = {
    Params: function ()
    {

    }
}
var Table = {
    Init: function (id) {
        $(id).DataTable({
            "filter": false,
            "destroy": true,
            "data": [],
        });
    }
}
var Form = {

    Save: function () {

        if ($('#cartype').val() == 0 || $('#cartype').val() == null) {
            document.getElementById("validateCarType").innerHTML = "Please Provide Car Type";
            return false;
        }
        else if ($("input[type='radio'][name='carstat']:checked").val() == 0 || $("input[type='radio'][name='carstat']:checked").val() == null) {
            document.getElementById("validatestatus").innerHTML = "Please choise one Status";
            return false;
        }
        else if ($('#platno').val() == 0 || $('#platno').val() == null) {
            document.getElementById("validatePlat").innerHTML = "Please Provide License Plat No.";
            return false;
        }
        else if ($('#capacity').val() == 0 || $('#capacity').val() == null) {
            document.getElementById("validatecapacity").innerHTML = "Please Provide Capacity";
            return false;
        }
        else if ($('#accessories').val() == 0 || $('#accessories').val() == null) {
            document.getElementById("validateaccesories").innerHTML = "Please Provide Accessories";
            return false;
        }
        else if ($('#chasisno').val() == 0 || $('#chasisno').val() == null) {
            document.getElementById("validatechasisno").innerHTML = "Please Provide Chasis No";
            return false;
        }
        else if ($('#engineno').val() == 0 || $('#engineno').val() == null) {
            document.getElementById("validateEngineNo").innerHTML = "Please Provide Engine No";
            return false;
        }
        else if ($('#feeweekday').val() == 0 || $('#feeweekday').val() == null) {
            document.getElementById("validatefeeweekday").innerHTML = "Please Provide Fee Weekday";
            return false;
        }
        else if ($('#feeweekend').val() == 0 || $('#feeweekend').val() == null) {
            document.getElementById("validatefeeweekend").innerHTML = "Please Provide Fee weekend";
            return false;
        }
        //var l = Ladda.create(document.querySelector("#btsave"))
        //l.start();
        strfeeday = $('#feeweekday').val()
        newfeeday = strfeeday.replace(/\./g, '')

        strfeeend = $('#feeweekend').val()
        newfeeend = strfeeend.replace(/\./g, '')
        params = {
            CarType: $('#cartype').val(),
            status: $("input[type='radio'][name='carstat']:checked").val(),
            PlatNo: $('#platno').val(),
            capacity: $('#capacity').val(),
            accessories: $('#accessories').val(),
            ChasisNo: $('#chasisno').val(),
            EngineNo: $('#engineno').val(),
            FeeWeekDay: newfeeday,
            FeeWeekEnd: newfeeend,
        };
        $.ajax ({
            url: "/Home/AddAsset",
            type: "POST",
            datatype: "json",
            data: params,
            //type: 'POST',
            //contentType: "application/json;charset=utf-8",
            //data: JSON.stringify(params),
            success: function (result) {
                document.getElementById('cartype').value = null;
                document.getElementById('platno').value = null;
                document.getElementById('capacity').value = null;
                document.getElementById('accessories').value = null;
                document.getElementById('chasisno').value = null;
                document.getElementById('engineno').value = null;
                document.getElementById('feeweekday').value = null;
                document.getElementById('feeweekend').value = null;

                $("#divassetaction").hide();
                Form.LoadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        })
    },
   
    LoadData: function () {

        $("#tblAsset").DataTable({
            "processing": true, // for show progress bar  
            "serverSide": true, // for process server side  
            "filter": true, // this is for disable filter (search box)  
            "orderMulti": false, // for disable multiple column at once  
            "pageLength": 5,//[[5, 10, 25, 50], ['5', '10', '25', '50']],
            "ajax": {
                "url": "/Home/ListAsset",
                "type": "POST",
                "datatype": "json"
            },
            "columnDefs":
                [
                    {
                        "targets": [0,6,7],
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": [7],
                        "searchable": false,
                        "orderable": false
                    },
                    {
                        "targets": [8],
                        "searchable": false,
                        "orderable": false
                    },
                    {
                        "targets": [9],
                        "searchable": false,
                        "orderable": false
                    }
                ],
            "columns": [
                { "data": "ID", "name": "ID", "autoWidth": true },
                { "data": "carType", "name": "carType", "autoWidth": true },
                { "data": "platNo", "title": "platNo", "name": "platNo", "autoWidth": true },
                { "data": "capacity", "name": "capacity", "autoWidth": true },
                { "data": "accessories", "name": "accessories", "autoWidth": true },
                { "data": "status", "name": "status", "autoWidth": true },
                { "data": "chasisNo", "name": "chasisNo", "autoWidth": true },
                { "data": "engineNo", "name": "engineNo", "title": "engineNo", "autoWidth": true },
                { "data": "feeweekday", "name": "feeweekday", "autoWidth": true, render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                { "data": "feeweekend", "name": "feeweekend", "autoWidth": true, render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                {
                    "render": function (data, type, full, meta) { return '<a class="btn btn-info" href="/Home/Edit/' + full.ID + '">Edit</a>'; }
                },
                {
                    data: null, render: function (data, type, row) {
                        return "<a href='#' class='btn btn-danger' onclick=DeleteData('" + row.ID + "'); >Delete</a>";
                    }
                },
            ],
            "scrollY": 300, /* Enable vertical scroll to allow fixed columns */
            "scrollX": true, /* Enable horizontal scroll to allow fixed columns */
            "scrollCollapse": true,
            "fnDrawCallback": function () {

            },

        })
    }
}
