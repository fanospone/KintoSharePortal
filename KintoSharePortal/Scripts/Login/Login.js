$(function () {
    $("#btnSignIn").click(function () {
        signIn();
    });

$("#btnSubmitOTP").click(function () {
    submitOTP();
    });

$("#txtUsername").keypress(function (e) {
        var key = e.which;
if (key == 13)
signIn();
    });

$("#txtPassword").keypress(function (e) {
        var key = e.which;
if (key == 13)
signIn();
    });

function signIn() {
        var username = $("#txtUsername").val();
var password = $("#txtPassword").val();

$('#username-error').hide();
if (username == '' || username == null) {
    $('#username-error').show();
return false;
        }

$('#password-error').hide();
if (password == '' || password == null) {
    $('#password-error').show();
$('#spinner').removeClass("show");
return false;
        }


var data = {
    username: username,
password: password
        }

var url = "";

if (ENVIRONMENT == "LOCAL")
url = BASE_URL_LOCAL;
else if (ENVIRONMENT == "DEV")
url = BASE_URL_DEV;
else
url = BASE_URL_PRD;

$.ajax({
    type: "POST",
url: url + "/Login/CheckUser",
contentType: "application/json; charset=utf-8",
data: JSON.stringify(data),
dataType: "html",
success: function (response) {
    $("#partialModal").find(".modal-body").html(response);
$("#partialModal").modal("show");
            },
failure: function (response) {
    alert(response.responseText);
            },
error: function (response) {
    alert(response.responseText);
            }
        });
    }
});
