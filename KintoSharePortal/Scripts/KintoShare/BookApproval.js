jQuery(document).ready(function () {
    $("#pnlapprovaldetail").hide();
    Form.LoadApproval();
    Control.Button();
    $('.js-sweetalert button').on('click', function () {
        var type = $(this).data('type');
        if (type === 'confirm') {
            showCancelMessage();
        }
    });


})

function showCancelMessage() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Deleted!", "Your imaginary file has been deleted.", "success");
        } else {
            swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
    });
}

var Form = {
    LoadApproval: function () {
        var id = "#tblApprovalHeader";
        //Table.Init(id);
        $.ajax({
            type: "POST",
            url: BaseUrl + "/Home/ApprovalList",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(),
            dataType: "json",
            async: false,

            success: function (data) {
                $("#tblApprovalHeader").DataTable({
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
                        {
                            'data': "Bookno", render: function (a, b, c) {
                                return "<a class='linkDetail' title='Detail Request'>" + c.Bookno + "</a>";
                            }
                        },
                        { 'data': 'Cartype' },
                        { 'data': 'Platno'},
                        { 'data': 'Department'},
                        { 'data': 'PIC'},
                        { 'data': 'Bookdate'},
                        { 'data': 'Requester'},
                        { 'data': 'Kintosharefee', render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                        { 'data': 'Approvalstatus'},
                    ]
                })
            },
            error: function (err) {
                alert(err.responseText);
                console.log(err);
            }
        })
        //$("#tblApprovalHeader").DataTable({
        //    "processing": true, // for show progress bar  
        //    "serverSide": true, // for process server side  
        //    "filter": false, // this is for disable filter (search box)  
        //    "orderMulti": false, // for disable multiple column at once  
        //    "pageLength": 5,
        //    "ajax": {
        //        "url": BaseUrl + "/Home/ApprovalList",
        //        "type": "POST",
        //        "datatype": "json"
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
        //        { data: "ID", "name": "ID", "autoWidth": true },
        //        {
        //            data: "Bookno", render: function (a, b, c) {
        //                return "<a class='linkDetail' title='Detail Request'>" + c.Bookno + "</a>";
        //            }
        //        },
        //        { data: "Cartype", "name": "Cartype", "autoWidth": true },
        //        { data: "Platno", "name": "Platno", "autoWidth": true },
        //        { data: "Department", "name": "Department", "autoWidth": true },
        //        { data: "PIC", "name": "PIC", "autoWidth": true },
        //        { data: "Bookdate", "name": "Bookdate", "autoWidth": true },
        //        { data: "Requester", "name": "Requester", "autoWidth": true },
        //        { data: "Kintosharefee", "name": "Kintosharefee", "autoWidth": true, render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
        //        { data: "Approvalstatus", "name": "Approvalstatus", "autoWidth": true },
        //        //{
        //        //    data: null, render: function (data, type, row) {
        //        //        return "<a href='#' class='btn btn-primary waves-effect' data-type='cancel' > APPROVE </a > "; //,'" + row.Cartype + "','" + row.Department + "','" + row.PlatNo + "','" + row.PIC + "','" + row.BookDate + "','" + row.ApprovalStatus + "','" + row.UserReq + "','" + row.Purpose + "','" + row.DateCrt + "'); > Check - In</a > ";
        //        //    }
        //        //},
        //    ],
        //    "scrollY": 300, /* Enable vertical scroll to allow fixed columns */
        //    "scrollX": true, /* Enable horizontal scroll to allow fixed columns */
        //    "scrollCollapse": true,
        //    "fnDrawCallback": function () {

        //    },
        //});

        $(id + " tbody").on("click", ".linkDetail", function (e) {
            var table = $(id).DataTable();
            var row = table.row($(this).parents('tr')).data();
            let dollarUSLocale = Intl.NumberFormat('en-US');

            dataType = "";
            Bookno = row.Bookno;
            Cartype = row.Cartype;
            Platno = row.Platno;
            Department = row.Department;
            PIC = row.PIC;
            Bookdate = row.Bookdate;
            Requester = row.Requester;
            Approvalstatus = row.Approvalstatus

            document.getElementById('txtBookno').innerHTML = row.Bookno;
            document.getElementById('txtvachile').innerHTML = row.Cartype;
            document.getElementById('txtplat').innerHTML = row.Platno;
            document.getElementById('txtdept').innerHTML = row.Department;
            document.getElementById('txtPIC').innerHTML = row.PIC;
            document.getElementById('txtreq').innerHTML = row.Requester;
            document.getElementById('txtBookdate').innerHTML = row.Bookdate;
            document.getElementById('txtstatus').innerHTML = row.Approvalstatus;
            document.getElementById('txtKintoShareFee').innerHTML = dollarUSLocale.format(row.Kintosharefee);
            if (Approvalstatus == 'Approve' || Approvalstatus == 'Cancel') {
                $("#btnApprove").hide();
                $("#btnCancel").hide();
            }
            else {
                $("#btnApprove").show();
                $("#btnCancel").show();
            }

            $("#pnlapprovalhead").hide();
            $("#pnlapprovaldetail").show();

        });

    },

    Approve: function (BookID) {

    }
}

var Control = {
    Button: function () {
        $("#btnApprove").unbind().click(function () {
            param = {
                //Bookno: $("#txtBookno").val(),
                Bookno: document.getElementById('txtBookno').textContent,
                Approvalstatus: $("#btnApprove").val(),
            };
            console.log(Bookno);
            console.log(Approvalstatus);
            $.ajax({
                url: BaseUrl + "/Home/ApprovalSubmit",
                type: "POST",
                datatype: "json",
                data: param,
                success: function (result) {
                    //$("#pnlapprovalhead").show();
                    //$("#pnlapprovaldetail").hide();
                    //Table.Init("#tblApprovalHeader");
                    //Form.LoadApproval();
                    location.reload();
                },
                error: function (xhr, msg) {
                    alert("Proses Error " + msg);
                }
            })
        });
        $("#btnCancel").unbind().click(function () {
            param = {
                //Bookno: $("#txtBookno").val(),
                Bookno: document.getElementById('txtBookno').textContent,
                Approvalstatus: $("#btnCancel").val(),
            };
            console.log(Bookno);
            console.log(Approvalstatus);
            $.ajax({
                url: BaseUrl + "/Home/ApprovalSubmit",
                type: "POST",
                datatype: "json",
                data: param,
                success: function (result) {
                    //$("#pnlapprovalhead").show();
                    //$("#pnlapprovaldetail").hide();
                    //Form.LoadApproval();
                    location.reload();
                },
                error: function (xhr, msg) {
                    alert("Proses Error " + msg);
                }
            })
        });
        $("#btnBack").unbind().click(function () {
            $("#pnlapprovalhead").show();
            $("#pnlapprovaldetail").hide();
        });
       
    }
}

var Table = {
    Init: function (idTable) {
        var tblInit = $(idTable).dataTable({
            "retrieve": true,
            "paging": false,
            "filter": false,
            "destroy": true,
            "data": []
        });

        $(window).resize(function () {
            $(idTable).DataTable().columns.adjust().draw();
        });
    }
}