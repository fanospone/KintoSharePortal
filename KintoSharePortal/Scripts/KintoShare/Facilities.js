var paramHeader = {};

jQuery(document).ready(function () {
    $("#divassetaction").hide();
    Control.Init();
    Form.LoadData();

    
});

function showpnladdasset() {
    document.getElementById('cartype').value = "";
    document.getElementById('platno').value = "";
    document.getElementById('accessories').value = "";
    document.getElementById('capacity').value = "";
    document.getElementById('chasisno').value = "";
    document.getElementById('engineno').value = "";
    document.getElementById('feeweekday').value = "";
    document.getElementById('feeweekend').value = "";
    $("input[type=radio][name=carstat]").prop('checked', false);

    $("#divassetaction").show();
    $("#lblAddasset").show();
    $("#lblEditasset").hide();
}

function showCancelMessage(id) {
    swal({
        title: "Are you sure?",
        /*text: "You will not be able to recover this imaginary file!",*/
        text: "You will delete this car !!!",
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
                url: BaseUrl + "/Home/DeleteAsset",
                data: { AssetID: id },
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
            swal("Deleted!", "Your asset has been deleted.", "success");
        } else {
            swal("Cancelled", "Your asset is safe :)", "error");
        }
    });
}

var Control = {
    Init: function () {
        Control.Button();

    },

    Button: function () {
        $("#btsave").unbind().click(function () {
            if (Form.validation()) {
                Form.Save();
            }
        });

        $("#btSaveEdit").unbind().click(function () {
            if (Form.validation()) {
                Form.SaveEdit();
            }
        });

        $("#btaddasset").unbind().click(function () {
            $("#divassetaction").show();
            $("#divheaderasset").hide();
            $("#btsave").show();
            $("#DivBtnSaveEdit").hide();
            $("#lblEditasset").hide();
            $("#lblAddasset").show();
        });

        $("#btcancel").unbind().click(function () {
            $("#divassetaction").hide();
            $("#divheaderasset").show();
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
    validation: function () {
        var result = true;
        if ($('#cartype').val() == 0 || $('#cartype').val() == null) {
            //$('#myModal').modal('show');
            $('#myModal').modal('show').addClass('in');
            $('#modaltext').text("Please Provide Car Type");
            result = false;
        }
        else if ($("input[type='radio'][name='carstat']:checked").val() == 0 || $("input[type='radio'][name='carstat']:checked").val() == null) {
            //$('#myModal').modal('show');
            $('#myModal').modal('show').addClass('in');
            $('#modaltext').text("Please choise one Status");
            result = false;
        }
        else if ($('#platno').val() == 0 || $('#platno').val() == null) {
            //$('#myModal').modal('show');
            $('#myModal').modal('show').addClass('in');
            $('#modaltext').text("Please Provide License Plat No.");
            result = false;
        }
        else if ($('#capacity').val() == 0 || $('#capacity').val() == null) {
            //$('#myModal').modal('show');
            $('#myModal').modal('show').addClass('in');
            $('#modaltext').text("Please Provide Capacity");
            result = false;
        }
        else if ($('#accessories').val() == 0 || $('#accessories').val() == null) {
            //$('#myModal').modal('show');
            $('#myModal').modal('show').addClass('in');
            $('#modaltext').text("Please Provide Accessories");
            result = false;
        }
        else if ($('#chasisno').val() == 0 || $('#chasisno').val() == null) {
            //$('#myModal').modal('show');
            $('#myModal').modal('show').addClass('in');
            $('#modaltext').text("Please Provide Chasis No.");
            result = false;
        }
        else if ($('#engineno').val() == 0 || $('#engineno').val() == null) {
            //$('#myModal').modal('show');
            $('#myModal').modal('show').addClass('in');
            $('#modaltext').text("Please Provide Engine No");
            result = false;
        }
        else if ($('#feeweekday').val() == 0 || $('#feeweekday').val() == null) {
            //$('#myModal').modal('show');
            $('#myModal').modal('show').addClass('in');
            $('#modaltext').text("Please Provide Fee Weekday");
            result = false;
        }
        else if ($('#feeweekend').val() == 0 || $('#feeweekend').val() == null) {
            //$('#myModal').modal('show');
            $('#myModal').modal('show').addClass('in');
            $('#modaltext').text("Please Provide Fee Weekend");
            result = false;
        }
        return result;
    },

    Save: function () {
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
            url: BaseUrl + "/Home/AddAsset",
            type: "POST",
            datatype: "json",
            data: params,
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
        $.ajax({
            type: "POST",
            url: BaseUrl + "/Home/ListAsset",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(),
            dataType: "json",
            async: false,
            success: function (data) {
                console.log(data);
                $("#tblAsset").DataTable(
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
                                "targets": [0, 6, 7],
                                "visible": false,
                            },
                        ],
                        columns: [
                            { 'data': 'ID'},
                            { 'data': 'carType'},
                            { 'data': 'platNo'},
                            { 'data': 'capacity'},
                            { 'data': 'accessories'},
                            { 'data': 'status'},
                            { 'data': 'chasisNo'},
                            { 'data': 'engineNo'},
                            { 'data': 'feeweekday', render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                            { 'data': 'feeweekend', render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                            {
                                /*"render": function (data, type, full, meta) { return '<a class="btn btn-info" href="/Home/Edit/' + full.ID + '">Edit</a>'; }*/
                                data: null, render: function (data, type, row) {
                                    return "<a href='#' class='btn btn-info' onclick=Form.Edit('" + row.ID + "'); >EDIT</a>";
                                }
                            },
                            {
                                data: null, render: function (data, type, row) {
                                    return "<a href='#' class='btn btn-danger' onclick=showCancelMessage('" + row.ID + "'); >DELETE</a>";
                                }
                            },
                        ],
                    }
                )
            },
            error: function (err) {
                alert(err.responseText);
                console.log(err);
            }
        })
    },

    Edit: function (ID) {
        $.ajax({
            url: BaseUrl + "/Home/CheckAsset",
            type: "POST",
            data: { AssetID: ID }
        }).done(function (data, textStatus, jqXHR) {
            $("#lblEditasset").show();
            $("#lblAddasset").hide();
            $("#divassetaction").show();
            $("#divheaderasset").hide();
            $("#btsave").hide();
            $("#btSaveEdit").show();
            $("#AssetID").hide();
            console.log(data);
            $("#AssetID").val(data.ID);
            $("#cartype").val(data.carType);
            $("#platno").val(data.platNo);
            $("#accessories").val(data.accessories);
            $("#capacity").val(data.capacity);
            $("#chasisno").val(data.chasisNo);
            $("#engineno").val(data.engineNo);
            $("#feeweekday").val(data.feeweekday);
            $("#feeweekend").val(data.feeweekend);
            $("input[name=carstat][value=" + data.status + "]").prop('checked', true);

        }).fail(function (xhr, msg) {
            alert("Proses Error " + msg);
        });

    },

    SaveEdit: function () {
        strfeeday = $('#feeweekday').val()
        newfeeday = strfeeday.replace(/\./g, '')

        strfeeend = $('#feeweekend').val()
        newfeeend = strfeeend.replace(/\./g, '')
        params = {
            ID: $('#AssetID').val(),
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
        $.ajax({
            url: BaseUrl + "/Home/SaveEdit",
            type: "POST",
            datatype: "json",
            data: params,
            success: function (result) {
                alert("Data has been save");
                location.reload();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        })
    }
}
