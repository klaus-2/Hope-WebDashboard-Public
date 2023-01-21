const ToastTicket = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true
})

$("#ticketsettings").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'ticket',
            data: form.serialize(),
            beforeSend: function () {
                ToastTicket.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastTicket.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastTicket.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#ticketRoomMessage").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'ticket/room-message',
            data: form.serialize(),
            beforeSend: function () {
                ToastTicket.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastTicket.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastTicket.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

// Live edit values in Embed for Ticket Room
$(document).ready(function () {
    $("#embedAuthorIconPreview").attr("src", authorIcon);
    $("#author_icon").keyup(function () {
        $("#embedAuthorIconPreview").attr("src", $(this).val());
    });
});
$(document).ready(function () {
    $("#embedAuthorNamePreview").text(authorName);
    $("#author_name").on("input", function () {
        $("#embedAuthorNamePreview").text($(this).val());
    });
});
$(document).ready(function () {
    $("#embedAuthorNamePreview").attr("href", authorUrl);
    $("#author_url").keyup(function () {
        $("#embedAuthorNamePreview").attr("href", $(this).val());
    });
});
$(document).ready(function () {
    $("#embedTitlePreview").text(embedTitle);
    $("#title").on("input", function () {
        $("#embedTitlePreview").text($(this).val());
    });
});
$(document).ready(function () {
    $("#embedTitlePreview").attr("href", embedTitleUrl);
    $("#url").keyup(function () {
        $("#embedTitlePreview").attr("href", $(this).val());
    });
});
$(document).ready(function () {
    $("#embedDescriptionPreview").text(description);
    $("#embedDescription").on("input", function () {
        $("#embedDescriptionPreview").text($(this).val());
    });
});
$(document).ready(function () {
    $("#embedThumbPreview").attr("src", embedThumb);
    $("#thumb").keyup(function () {
        $("#embedThumbPreview").attr("src", $(this).val());
    });
});
$(document).ready(function () {
    $("#embedFooterPreview").text(embedFooter);
    $("#footer").on("input", function () {
        $("#embedFooterPreview").text($(this).val());
    });
});
$(document).ready(function () {
    $("#embedFooterIconPreview").attr("src", embedFooterIcon);
    $("#footerIcon").keyup(function () {
        $("#embedFooterIconPreview").attr("src", $(this).val());
    });
});
$(document).ready(function () {
    $("#embedColorPreview").css("border-color", embedColor || '#000000');
    $("#embedColor").on("input", function () {
        $("#embedColorPreview").css("border-color", $(this).val());
    });
});
$(document).ready(function () {
    $("#embedImagePreview").attr("src", embedImage);
    $("#embedImage").keyup(function () {
        $("#embedImagePreview").attr("src", $(this).val());
    });
});
$(document).ready(function () {
    var checkBox = document.getElementById("timestamp");
    if (checkBox.checked == true) {
        $("#embedStamp").css("display", 'initial');
    } else {
        $("#embedStamp").css("display", 'none');
    }
});

function Stamp() {
    var checkBox = document.getElementById("timestamp");
    if (checkBox.checked == true) {
        $("#embedStamp").css("display", 'initial');
    } else {
        $("#embedStamp").css("display", 'none');
    }
}

$("#ticketInteractionMessage").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'ticket/interaction-message',
            data: form.serialize(),
            beforeSend: function () {
                ToastTicket.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastTicket.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastTicket.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

// Live edit values in Embed for Ticket Room
$(document).ready(function () {
    $("#embedAuthorIconPreview1").attr("src", authorIcon1);
    $("#author_icon1").keyup(function () {
        $("#embedAuthorIconPreview1").attr("src", $(this).val());
    });
});
$(document).ready(function () {
    $("#embedAuthorNamePreview1").text(authorName1);
    $("#author_name1").on("input", function () {
        $("#embedAuthorNamePreview1").text($(this).val());
    });
});
$(document).ready(function () {
    $("#embedAuthorNamePreview1").attr("href", authorUrl1);
    $("#author_url1").keyup(function () {
        $("#embedAuthorNamePreview1").attr("href", $(this).val());
    });
});
$(document).ready(function () {
    $("#embedTitlePreview1").text(embedTitle1);
    $("#title1").on("input", function () {
        $("#embedTitlePreview1").text($(this).val());
    });
});
$(document).ready(function () {
    $("#embedTitlePreview1").attr("href", embedTitleUrl1);
    $("#url1").keyup(function () {
        $("#embedTitlePreview1").attr("href", $(this).val());
    });
});
$(document).ready(function () {
    $("#embedDescriptionPreview1").text(description1);
    $("#embedDescription1").on("input", function () {
        $("#embedDescriptionPreview1").text($(this).val());
    });
});
$(document).ready(function () {
    $("#embedThumbPreview1").attr("src", embedThumb1);
    $("#thumb1").keyup(function () {
        $("#embedThumbPreview1").attr("src", $(this).val());
    });
});
$(document).ready(function () {
    $("#embedFooterPreview1").text(embedFooter1);
    $("#footer1").on("input", function () {
        $("#embedFooterPreview1").text($(this).val());
    });
});
$(document).ready(function () {
    $("#embedFooterIconPreview1").attr("src", embedFooterIcon1);
    $("#footerIcon1").keyup(function () {
        $("#embedFooterIconPreview1").attr("src", $(this).val());
    });
});
$(document).ready(function () {
    $("#embedColorPreview1").css("border-color", embedColor1 || '#000000');
    $("#embedColor1").on("input", function () {
        $("#embedColorPreview1").css("border-color", $(this).val());
    });
});
$(document).ready(function () {
    $("#embedImagePreview1").attr("src", embedImage1);
    $("#embedImage1").keyup(function () {
        $("#embedImagePreview1").attr("src", $(this).val());
    });
});
$(document).ready(function () {
    var checkBox1 = document.getElementById("timestamp1");
    if (checkBox1.checked == true) {
        $("#embedStamp1").css("display", 'initial');
    } else {
        $("#embedStamp1").css("display", 'none');
    }
});

function Stamp1() {
    var checkBox1 = document.getElementById("timestamp1");
    if (checkBox1.checked == true) {
        $("#embedStamp1").css("display", 'initial');
    } else {
        $("#embedStamp1").css("display", 'none');
    }
}