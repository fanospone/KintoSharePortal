var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var today = yyyy + '-' + mm + '-' + dd;

var url = "";

if (ENVIRONMENT == "LOCAL")
    url = BASE_URL_LOCAL;
else if (ENVIRONMENT == "DEV")
    url = BASE_URL_DEV;
else
    url = BASE_URL_PRD;

$("#datebook").datepicker();

//a simple date formatting function
function dateFormat(inputDate, format) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace("MM", month.toString().padStart(2, "0"));

    //replace the year
    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
}

document.addEventListener('DOMContentLoaded', function () {
    Form.CarList();
    Form.GetPIC();
    Table.Load();
    Control.Button();

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        ///////////////////////////////////////////// VIEW CALENDAR BY MONTH /////////////////////////////////////////////
        //initialDate: today, //'2020-09-12',
        //editable: true,
        //selectable: true,
        //businessHours: true,
        //dayMaxEvents: true, // allow "more" link when too many events
        //events: function (fetchInfo, successCallback, failureCallback) {
        //    $.ajax({
        //        url: url + "/Home/IndexBooking",
        //        type: "GET",
        //        datatype: "json"
        //    }).done(function (data, textStatus, jqXHR) {
        //        var events = [];
        //        /*if (data.ApprovalStatus == 'Waiting') {*/
        //        $.each(data, function (key, value) {
        //            var color = "";
        //            if (value.ApprovalStatus == 'Waiting') {
        //                color = '#FFFF00';
        //            }
        //            else if (value.ApprovalStatus == 'Cancel') {
        //                color = '#FF4500';
        //            }
        //            else {
        //                color = '#66CDAA';
        //            }
        //            events.push({
        //                title: value.Cartype + " - " + value.BookingNo,
        //                start: value.Startdate,
        //                end: value.Enddate,
        //                //description: value.BookingNo,
        //                //start: '2022-09-22'
        //                color: color
        //            });
        //            //console.log(value.BookingNo);
        //        });
        //        //}
        //        successCallback(events);
        //    }).fail(function (jqXHR, textStatus, errorThrown) {
        //        console.log(jqXHR);
        //        console.log(textStatus);
        //        console.log(errorThrown);
        //    });
        //},
        //eventClick: function (arg) {
        //    console.log(arg.event.title);
        //    const input = arg.event.title;
        //    const [car, bookno] = input.split(' - ');

        //    $.ajax({
        //        url: url + "/Home/DateBookDetail",
        //        type: "POST",
        //        data: { BookingNo: bookno }
        //    }).done(function (data, textStatus, jqXHR) {
        //        $('#modalTitle').text(bookno);
        //        //$('#modalBody').text(car);
        //        document.getElementById('lblcar').innerHTML = car;
        //        document.getElementById('lblplatno').innerHTML = data.PlatNo ;
        //        document.getElementById('lblPIC').innerHTML = data.PIC ;
        //        document.getElementById('lbldept').innerHTML = data.Department ;
        //        $('#calendarModal').modal('show');
        //        //console.log(car);
        //        //console.log(bookno);
        //    }).fail(function (xhr, msg) {
        //        alert("Proses Error " + msg);
        //    });
        //},
        //dateClick: function (info) {

        //    //alert('clicked ' + info.dateStr);
        //    var dateclicked = info.dateStr;
        //    var todayDate = new Date();
        //    var dd = String(todayDate.getDate()).padStart(2, '0');
        //    var mm = String(todayDate.getMonth() + 1).padStart(2, '0');
        //    var yyyy = todayDate.getFullYear();
        //    Todayclick = yyyy + '-' + mm + '-' + dd;
        //    if (Todayclick > dateclicked) {
        //        $('#myModal').modal('show');
        //        $('#modaltext').text("Cannot book past date.");
        //    }
        //    else {
        //        window.location.href = url + "/Home/Mybook?date=" + dateclicked;
        //        window.localStorage.setItem('click', true);
        //    }
        //},
        ///////////////////////////////////////////// END VIEW CALENDAR BY MONTH /////////////////////////////////////////////

        /////////////////////////////////////////////  CALENDAR BY WEEK /////////////////////////////////////////////
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        timeZone: 'UTC',
        initialView: 'timeGridSevenDays',
        aspectRatio: 1.5,
        height: 'auto',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'resourceTimelineMonth,timeGridSevenDays', //'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth' /*timeGridSixDays'*/
        },
        views: {
            timeGridSevenDays: {
                type: 'resourceTimelineDay',
                duration: { days: 7 },
                slotDuration: { days: 1 },
                buttonText: '7 days'
            }
        },
        editable: true,
        resourceAreaHeaderContent: "CAR TYPE",
        //slotLabelFormat: [
        //    /*{ month: 'long', year: 'numeric' },*/
        //    { day: 'numeric', month: 'long', year: 'numeric' }
        //    //,
        //    //{ hour: 'numeric' }
        //    //{ month: 'long', year: 'numeric' }, // top level of text
        //    //{ weekday: 'short' } // lower level of text
        //],
        resources: function (fetchInfo, successCallback, failureCallback) {
            $.ajax({
                url: url + "/Home/ResourcesAsset",
                method: "POST",
                datatype: "json"
            }).done(function (data, textStatus, jqXHR) {
                var resources = [];
                $.each(data, function (key, value) {
                    resources.push({
                        id: value.ID,
                        title: value.Cartype
                    });
                });
                successCallback(resources);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert("error get asset resources");
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            });
        },
        //    [
        //    {id: "a", title: "Auditorium A"},
        //    {id: "b", title: "Auditorium B"},
        //    {id: "c", title: "Auditorium C"},
        //    {id: "d", title: "Auditorium D"}
        //],
        
        events: function (fetchInfo, successCallback, failureCallback) {
            $.ajax({
                url: url + "/Home/IndexBooking",
                type: "GET",
                datatype: "json"
            }).done(function (data, textStatus, jqXHR) {
                var events = [];
                /*if (data.ApprovalStatus == 'Waiting') {*/
                $.each(data, function (key, value) {
                    var color = "";
                    if (value.ApprovalStatus == 'Waiting') {
                        color = '#FFFF00';
                    }
                    else if (value.ApprovalStatus == 'Cancel') {
                        color = '#FF4500';
                    }
                    else {
                        color = '#66CDAA';
                    }
                    events.push({
                        title: value.Cartype + " - " + value.BookingNo,
                        start: value.Startdate,
                        end: value.Enddate,
                        resourceId: value.CarID,
                        //description: value.BookingNo,
                        //start: '2022-09-22'
                        color: color
                    });
                    //console.log(value.BookingNo);
                });
                //}
                successCallback(events);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            });
        },
        eventClick: function (arg) {
            console.log(arg.event.title);
            const input = arg.event.title;
            const [car, bookno] = input.split(' - ');

            $.ajax({
                url: url + "/Home/DateBookDetail",
                type: "POST",
                data: { BookingNo: bookno }
            }).done(function (data, textStatus, jqXHR) {
                $('#modalTitle').text(bookno);
                //$('#modalBody').text(car);
                document.getElementById('lblcar').innerHTML = car;
                document.getElementById('lblplatno').innerHTML = data.PlatNo ;
                document.getElementById('lblPIC').innerHTML = data.PIC ;
                document.getElementById('lbldept').innerHTML = data.Department ;
                $('#calendarModal').modal('show');
                //console.log(car);
                //console.log(bookno);
            }).fail(function (xhr, msg) {
                alert("Proses Error " + msg);
            });
        },
        dateClick: function (info) {

            //alert('clicked ' + info.dateStr);
            var dateclicked = info.dateStr;
            var todayDate = new Date();
            var dd = String(todayDate.getDate()).padStart(2, '0');
            var mm = String(todayDate.getMonth() + 1).padStart(2, '0');
            var yyyy = todayDate.getFullYear();
            Todayclick = yyyy + '-' + mm + '-' + dd;

            var resourceA = calendar.getResources();
            console.log(resourceA);
            if (Todayclick > dateclicked) {
                $('#myModal').modal('show');
                $('#modaltext').text("Cannot book past date.");
            }
            else {
                window.location.href = url + "/Home/Mybook?date=" + dateclicked + "&resid=" + info.resource.id ;
                window.localStorage.setItem('click', true);
            }
        }
        /////////////////////////////////////////////  ENDCALENDAR BY WEEK /////////////////////////////////////////////
    });
    calendar.render();
});

var Control = {
    Button: function () {
        $("#btsearch").unbind().click(function () {
            //Request.Search();
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
        });
    }
}

var Table = {
    Load: function () {
        $("#tblAsset").DataTable({
            "processing": true, // for show progress bar  
            "serverSide": true, // for process server side  
            "filter": false, // this is for disable filter (search box)  
            "orderMulti": false, // for disable multiple column at once  
            "pageLength": 10,//[[5, 10, 25, 50], ['5', '10', '25', '50']],
            "ajax": {
                "url": url + "/Home/ListAsset",
                "type": "POST",
                "datatype": "json"
            },
            "columnDefs":
                [
                    {
                        "targets": [0, 6, 7],
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
                //{ "data": "platNo", "title": "platNo", "name": "platNo", "autoWidth": true },
                { "data": "platNo", "name": "platNo", "autoWidth": true },
                { "data": "capacity", "name": "capacity", "autoWidth": true },
                { "data": "accessories", "name": "accessories", "autoWidth": true },
                {
                    "data": "status",
                    render: function (data, type, full) {
                        if (data == 'NOTAVAILABLE')
                            return 'NOT AVAILABLE';
                        return data;
                    }
                },
                { "data": "chasisNo", "name": "chasisNo", "autoWidth": true },
                { "data": "engineNo", "name": "engineNo", "title": "engineNo", "autoWidth": true },
                { "data": "feeweekday", "name": "feeweekday", "autoWidth": true, render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                { "data": "feeweekend", "name": "feeweekend", "autoWidth": true, render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                
            ],
            "scrollY": 300, /* Enable vertical scroll to allow fixed columns */
            "scrollX": true, /* Enable horizontal scroll to allow fixed columns */
            "scrollCollapse": true,
            "fnDrawCallback": function () {
            },
        })
    }
}

var Form = {
    CarList: function () {
        console.log(url);
        var form = $('#__AjaxAntiForgeryForm');
        var token = $('input[name="__RequestVerificationToken"]', form).val();
        $.ajax({
            url: url + "/Home/ListCar",
            type: "GET",
            data: { __RequestVerificationToken: token}
        })
            .done(function (data, textStatus, jqXHR) {
                $("#ddasset").append("<option value='0'>ALL ASSET</option>");
                $.each(data, function (i, item) {
                    $("#ddasset").append("<option value='" + item.CarId + "'>" + item.CarName + "</option>");
                })
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Failed get asset list! please check your connection");
            });
    },
    GetPIC: function () {
        $.ajax({
            url: url + "/Home/ListPIC",
            type: "GET",
            data: { DeptID: "" }
        })
            .done(function (data, textStatus, jqXHR) {
                document.getElementById('dduser').options.length = 0;
                $("#dduser").append("<option value='0'>ALL USER</option>");
                $.each(data, function (i, item) {
                    $("#dduser").append("<option value='" + item.UserID + "'>" + item.UserName + "</option>");
                })
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                //Common.Alert.Error(errorThrown);
            });
    },
}

var Request = {
    CallApi: function () {
        $.ajax({
            url: url + "/Home/IndexBooking",
            type: "GET",
            datatype: "JSON.stringify(response)"
            //datatype: "json"
        }).done(function (data, textStatus, jqXHR) {
           // var ArrObject = [];
            $.each(data,function (key, value) {
               
                ArrObject.push({
                    title: value.Cartype,
                    start:'2022-09-22'
                });
            });

            console.log(ArrObject);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });
    },

    Search: function () {
        console.log(dateFormat($('#datebook').val(), 'yyyy-MM-dd'));
        var selectedDate = $('#datebook').val(); //dateFormat($('#datebook').val(), 'yyyy-MM-dd');
        if (selectedDate == "") {
            var todayDate = new Date();
            var dd = String(todayDate.getDate()).padStart(2, '0');
            var mm = String(todayDate.getMonth() + 1).padStart(2, '0');
            var yyyy = todayDate.getFullYear();
            selectedDate = yyyy + '-' + mm + '-' + dd
        }
        else {
            selectedDate = dateFormat($('#datebook').val(), 'yyyy-MM-dd');
        }
        var calendarReload = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarReload,
            {
                schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
                initialDate: selectedDate,
                initialView: 'timeGridSevenDays',
                aspectRatio: 1.5,
                height: 'auto',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'resourceTimelineMonth,timeGridSevenDays', //'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth' /*timeGridSixDays'*/
                },
                views: {
                    timeGridSevenDays: {
                        type: 'resourceTimelineDay',
                        duration: { days: 7 },
                        slotDuration: { days: 1 },
                        buttonText: '7 days'
                    }
                },
                editable: true,
                resourceAreaHeaderContent: "CAR TYPE",
                //slotLabelFormat: [
                //    /*{ month: 'long', year: 'numeric' },*/
                //    { day: 'numeric', month: 'long', year: 'numeric' }
                //    //,
                //    //{ hour: 'numeric' }
                //    //{ month: 'long', year: 'numeric' }, // top level of text
                //    //{ weekday: 'short' } // lower level of text
                //],
                resources: function (fetchInfo, successCallback, failureCallback) {
                    $.ajax({
                        url: url + "/Home/ResourcesAsset",
                        method: "POST",
                        datatype: "json"
                    }).done(function (data, textStatus, jqXHR) {
                        var resources = [];
                        $.each(data, function (key, value) {
                            resources.push({
                                id: value.ID,
                                title: value.Cartype
                            });
                        });
                        successCallback(resources);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        alert("error get asset resources");
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    });
                },
                //    [
                //    {id: "a", title: "Auditorium A"},
                //    {id: "b", title: "Auditorium B"},
                //    {id: "c", title: "Auditorium C"},
                //    {id: "d", title: "Auditorium D"}
                //],

                events: function (fetchInfo, successCallback, failureCallback) {
                    paramCalendar = {
                        Startcdate: $('#datebook').val(),
                        PIC: $("#dduser option:selected").text(),
                        Cartype: $("#ddasset option:selected").text()
                    };
                    $.ajax({
                        url: url + "/Home/SearchIndex",
                        type: "GET",
                        data: paramCalendar
                    }).done(function (data, textStatus, jqXHR) {
                        var events = [];
                        $.each(data, function (key, value) {
                            var color = "";
                            if (value.ApprovalStatus == 'Waiting') {
                                color = '#FFFF00';
                            }
                            else if (value.ApprovalStatus == 'Cancel') {
                                color = '#FF4500';
                            }
                            else {
                                color = '#66CDAA';
                            }
                            events.push({
                                title: value.Cartype + " - " + value.BookingNo,
                                start: value.Startdate,
                                end: value.Enddate,
                                resourceId: value.CarID,
                                color: color
                            });
                        });
                        successCallback(events);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        alert(textStatus, errorThrown);
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    });
                },
                eventClick: function (arg) {
                    console.log(arg.event.title);
                    const input = arg.event.title;
                    const [car, bookno] = input.split(' - ');

                    $.ajax({
                        url: url + "/Home/DateBookDetail",
                        type: "POST",
                        data: { BookingNo: bookno }
                    }).done(function (data, textStatus, jqXHR) {
                        $('#modalTitle').text(bookno);
                        //$('#modalBody').text(car);
                        document.getElementById('lblcar').innerHTML = car;
                        document.getElementById('lblplatno').innerHTML = data.PlatNo;
                        document.getElementById('lblPIC').innerHTML = data.PIC;
                        document.getElementById('lbldept').innerHTML = data.Department;
                        $('#calendarModal').modal('show');
                        //console.log(car);
                        //console.log(bookno);
                    }).fail(function (xhr, msg) {
                        alert("Proses Error " + msg);
                    });
                },
                dateClick: function (info) {
                    //alert('clicked ' + info.dateStr);
                    var dateclicked = info.dateStr;
                    var todayDate = new Date();
                    var dd = String(todayDate.getDate()).padStart(2, '0');
                    var mm = String(todayDate.getMonth() + 1).padStart(2, '0');
                    var yyyy = todayDate.getFullYear();
                    Todayclick = yyyy + '-' + mm + '-' + dd;

                    var resourceA = calendar.getResources();
                    console.log(resourceA);
                    if (Todayclick > dateclicked) {
                        $('#myModal').modal('show');
                        $('#modaltext').text("Cannot book past date.");
                    }
                    else {
                        window.location.href = url + "/Home/Mybook?date=" + dateclicked + "&resid=" + info.resource.id;
                        window.localStorage.setItem('click', true);
                    }
                }
            });
        calendar.render();
    },
}