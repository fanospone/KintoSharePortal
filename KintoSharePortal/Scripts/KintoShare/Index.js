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


document.addEventListener('DOMContentLoaded', function () {
    Table.Load();


    var calendarEl = document.getElementById('calendar');

    //var JArObject = [
    //    {
    //        title: 'All Day Event',
    //        start: '2020-09-01'
    //    },
    //    {
    //        title: 'Long Event',
    //        start: '2020-09-07',
    //        end: '2020-09-10'
    //    },
    //    {
    //        groupId: 999,
    //        title: 'Repeating Event',
    //        start: '2020-09-09T16:00:00'
    //    },
    //    {
    //        groupId: 999,
    //        title: 'Repeating Event',
    //        start: '2020-09-16T16:00:00'
    //    },
    //    {
    //        title: 'Conference',
    //        start: '2020-09-11',
    //        end: '2020-09-13'
    //    },
    //    {
    //        title: 'Meeting',
    //        start: '2020-09-12T10:30:00',
    //        end: '2020-09-12T12:30:00'
    //    },
    //    {
    //        title: 'Lunch',
    //        start: '2020-09-12T12:00:00'
    //    },
    //    {
    //        title: 'Meeting',
    //        start: '2020-09-12T14:30:00'
    //    },
    //    {
    //        title: 'Happy Hour',
    //        start: '2020-09-12T17:30:00'
    //    },
    //    {
    //        title: 'Dinner',
    //        start: '2020-09-12T20:00:00'
    //    },
    //    {
    //        title: 'Birthday Party',
    //        start: '2020-09-13T07:00:00'
    //    },
    //    {
    //        title: 'Click for Google',
    //        url: 'http://google.com/',
    //        start: '2020-09-28'
    //    }
    //];

   // Request.CallApi();

    var calendar = new FullCalendar.Calendar(calendarEl, {
       //initialDate: '2020-09-12',
        initialDate: today,
        editable: true,
        selectable: true,
        businessHours: true,
        dayMaxEvents: true, // allow "more" link when too many events
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
                        title: value.Cartype + " - " + value.ApprovalStatus,
                        start: value.Startdate,
                        end: value.Enddate,
                        //start: '2022-09-22'
                        color: color
                    });
                    console.log(value.Enddate);
                });
                //}
                successCallback(events);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            });
        }
    });

    calendar.render();
});

var Table = {
    Load: function () {
        $("#tblAsset").DataTable({
            "processing": true, // for show progress bar  
            "serverSide": true, // for process server side  
            "filter": true, // this is for disable filter (search box)  
            "orderMulti": false, // for disable multiple column at once  
            "pageLength": 5,//[[5, 10, 25, 50], ['5', '10', '25', '50']],
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
                { "data": "status", "name": "status", "autoWidth": true },
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
    }
}