var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var today = yyyy + '-' + mm + '-' + dd;

//$("#datebook").datepicker();

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
        resources: function (fetchInfo, successCallback, failureCallback) {
            $.ajax({
                url: BaseUrl + "/Home/ResourcesAsset",
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
        events: function (fetchInfo, successCallback, failureCallback) {
            $.ajax({
                url: BaseUrl + "/Home/IndexBooking",
                type: "GET",
                datatype: "json"
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
                url: BaseUrl + "/Home/DateBookDetail",
                type: "POST",
                data: { BookingNo: bookno }
            }).done(function (data, textStatus, jqXHR) {
                $('#modalTitle').text(bookno);
                document.getElementById('lblcar').innerHTML = car;
                document.getElementById('lblplatno').innerHTML = data.PlatNo ;
                document.getElementById('lblPIC').innerHTML = data.PIC ;
                document.getElementById('lbldept').innerHTML = data.Department ;
                $('#calendarModal').modal('show').addClass('in');
            }).fail(function (xhr, msg) {
                alert("Proses Error " + msg);
            });
        },
        dateClick: function (info) {

            var dateclicked = info.dateStr;
            var todayDate = new Date();
            var dd = String(todayDate.getDate()).padStart(2, '0');
            var mm = String(todayDate.getMonth() + 1).padStart(2, '0');
            var yyyy = todayDate.getFullYear();
            Todayclick = yyyy + '-' + mm + '-' + dd;

            var resourceA = calendar.getResources();
            if (Todayclick > dateclicked) {
                $('#myModal').modal('show');
                $('#modaltext').text("Cannot book past date.");
            }
            else {
                window.location.href = BaseUrl + "/Home/Mybook?date=" + dateclicked + "&resid=" + info.resource.id ;
                window.localStorage.setItem('click', true);
            }
        }
    });
    calendar.render();
});

var Control = {
    Button: function () {
        $("#btsearch").unbind().click(function () {
            Request.Search();
        });
    }
}

var Table = {
    Load: function () {
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
                                'targets': [0, 6, 7],
                                'visible': false
                            },
                        ],
                        columns: [
                            { 'data': 'ID' },
                            { 'data': 'carType' },
                            { 'data': 'platNo' },
                            { 'data': 'capacity' },
                            { 'data': 'accessories' },
                            {
                                'data': 'status',
                                render: function (data, type, full) {
                                    if (data == 'NOTAVAILABLE')
                                        return 'NOT AVAILABLE';
                                    return data;
                                }
                            },
                            { 'data': 'chasisNo' },
                            { 'data': 'engineNo' },
                            { 'data': 'feeweekday', render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },
                            { 'data': 'feeweekend', render: $.fn.dataTable.render.number(',', '.', 0, 'Rp ') },

                        ]
                    })
            },
            error: function (err) {
                alert(err.responseText);
                console.log(err);
            }
        })
    }
}

var Form = {
    CarList: function () {
        $.ajax({
            url: BaseUrl + "/Home/ListCar",
            type: "GET"
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
            url: BaseUrl + "/Home/ListPIC",
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
            });
    },
}

var Request = {
    CallApi: function () {
        $.ajax({
            url: BaseUrl + "/Home/IndexBooking",
            type: "GET",
            datatype: "JSON.stringify(response)"
        }).done(function (data, textStatus, jqXHR) {
            $.each(data,function (key, value) {
               
                ArrObject.push({
                    title: value.Cartype,
                    start:'2022-09-22'
                });
            });
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });
    },

    Search: function () {
        var selectedDate = $('#datebook').val();
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
                resources: function (fetchInfo, successCallback, failureCallback) {
                    $.ajax({
                        url: BaseUrl + "/Home/ResourcesAsset",
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
                events: function (fetchInfo, successCallback, failureCallback) {
                    paramCalendar = {
                        Startcdate: $('#datebook').val(),
                        PIC: $("#dduser option:selected").text(),
                        Cartype: $("#ddasset option:selected").text()
                    };
                    $.ajax({
                        url: BaseUrl + "/Home/SearchIndex",
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
                        url: BaseUrl + "/Home/DateBookDetail",
                        type: "POST",
                        data: { BookingNo: bookno }
                    }).done(function (data, textStatus, jqXHR) {
                        $('#modalTitle').text(bookno);
                        document.getElementById('lblcar').innerHTML = car;
                        document.getElementById('lblplatno').innerHTML = data.PlatNo;
                        document.getElementById('lblPIC').innerHTML = data.PIC;
                        document.getElementById('lbldept').innerHTML = data.Department;
                        $('#calendarModal').modal('show');
                    }).fail(function (xhr, msg) {
                        alert("Proses Error " + msg);
                    });
                },
                dateClick: function (info) {
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
                        window.location.href = BaseUrl + "/Home/Mybook?date=" + dateclicked + "&resid=" + info.resource.id;
                        window.localStorage.setItem('click', true);
                    }
                }
            });
        calendar.render();
    },
}