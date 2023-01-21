const ToastSticky = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true
  })

$("#stickychannel").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/channel',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#stickycount").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/count',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#author-icon").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/author-icon',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#author-name").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/author-name',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#author-url").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/author-url',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#title").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/title',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#titleURL").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/title-url',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#description").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/description',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#thumbnail").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/thumbnail',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#footer-icon").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/footer-icon',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#footer").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/footer',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#image").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/image',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#timestamp").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/timestamp',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#color").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'sticky/color',
            data: form.serialize(),
            beforeSend: function () {
                ToastSticky.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastSticky.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastSticky.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$(document).ready(function () {
    $('#author_icon1').keyup(function () {
        var inputVal = $(this).val();
        $('#embedAuthorIcon1').attr('src', inputVal);
    });
});
$(document).ready(function () {
    document.getElementById('author_name1').textContent = 'Author name';
    $('#author_name1').on('input', function () {
        $('#embedAuthorName1').text($(this).val());
    });
});
$(document).ready(function () {
    $('#author_url1').keyup(function () {
        var inputVal = $(this).val();
        $('#embedAuthorName1').attr('href', inputVal);
    });
});
$(document).ready(function () {
    document.getElementById('title1').textContent =
        '__***📌 Sticky message: Read before typing!***__';
    $('#title1').on('input', function () {
        $('#embedTitle1').text($(this).val());
    });
});
$(document).ready(function () {
    $('#url1').keyup(function () {
        var inputVal = $(this).val();
        $('#embedTitle1').attr('href', inputVal);
    });
});
$(document).ready(function () {
    document.getElementById('description1').textContent =
        'This is a fixed message!';
    $('#description1').on('input', function () {
        $('#embedDescription1').text($(this).val());
    });
});
$(document).ready(function () {
    $('#thumb1').keyup(function () {
        var inputVal = $(this).val();
        $('#embedThumb1').attr('src', inputVal);
    });
});
$(document).ready(function () {
    document.getElementById('footer1').textContent = 'Powered by hopebot.top';
    $('#footer1').on('input', function () {
        $('#embedFooter1').text($(this).val());
    });
});
$(document).ready(function () {
    $('#footerIcon1').keyup(function () {
        var inputVal = $(this).val();
        $('#embedFooterIcon1').attr('src', inputVal);
    });
});
$(document).ready(function () {
    $('#color1').on('input', function () {
        var inputVal = $(this).val();
        $('#embedColor1').css('border-color', $(this).val());
    });
});
$(document).ready(function () {
    $('#image1').keyup(function () {
        var inputVal = $(this).val();
        $('#embedImage1').attr('src', inputVal);
    });
});
function Stamp() {
    var checkBox = document.getElementById('leave_timestamp');
    var textP = document.getElementById('embedStamp1');
    if (checkBox.checked == true) {
        textP.style.display = 'initial';
    } else {
        textP.style.display = 'none';
    }
}
function myFunction2() {
    var checkBox = document.getElementById('embedType');
    var text = document.getElementById('text');
    var textP = document.getElementById('textPreview');
    var embed = document.getElementById('embed');
    var embedP = document.getElementById('embedPreview');
    var image = document.getElementById('image');
    var imageP = document.getElementById('imagePreview');
    if (checkBox.checked == true) {
        text.style.display = 'none';
        textP.style.display = 'none';
        embed.style.display = 'block';
        embedP.style.display = 'block';
        image.style.display = 'none';
        imageP.style.display = 'none';
    }
}
function myFunction3() {
    var checkBox = document.getElementById('imageType');
    var text = document.getElementById('text');
    var textP = document.getElementById('textPreview');
    var embed = document.getElementById('embed');
    var embedP = document.getElementById('embedPreview');
    var image = document.getElementById('image');
    var imageP = document.getElementById('imagePreview');
    if (checkBox.checked == true) {
        text.style.display = 'none';
        textP.style.display = 'none';
        embed.style.display = 'none';
        embedP.style.display = 'none';
        image.style.display = 'block';
        imageP.style.display = 'block';
    }
}
