const ToastAutoMod = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true
})

$("#logchannel").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/logchannel',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#toggle").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/toggle',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antialtform").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antialt',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antialtform-users").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antialt-users',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antialtform-limit").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antialt-limit',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antialtform-action").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antialt-action',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antibadwords-form").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antibadwords',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antibadwords-words").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antibadwords-words',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antibadwords-time").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antibadwords-time',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antibadwords-limit").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antibadwords-limit',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antibadwords-channels").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antibadwords-ch',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antibadwords-roles").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antibadwords-roles',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#anticaps-form").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/anticaps',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#anticaps-limit").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/anticaps-limit',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#anticaps-time").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/anticaps-time',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#anticaps-count").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/anticaps-count',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#anticaps-channels").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/anticaps-channels',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#anticaps-roles").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/anticaps-roles',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antidehoisting-form").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antidehoisting',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antieveryone-form").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antieveryone',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antieveryone-time").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antieveryone-time',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antieveryone-channels").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antieveryone-channels',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antieveryone-roles").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antieveryone-roles',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antiextlinks-form").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antiextlinks',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antiextlinks-time").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antiextlinks-time',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antiextlinks-count").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antiextlinks-count',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antiextlinks-channels").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antiextlinks-channels',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antiextlinks-roles").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antiextlinks-roles',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antiinvites-form").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antiinvites',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antiinvites-time").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antiinvites-time',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antiinvites-count").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antiinvites-count',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antiinvites-channels").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antiinvites-channels',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antiinvites-roles").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antiinvites-roles',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassemojis-form").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassemojis',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassemojis-limit").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassemojis-limit',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassemojis-time").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassemojis-time',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassemojis-count").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassemojis-count',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassemojis-channels").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassemojis-channels',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassemojis-roles").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassemojis-roles',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimasslines-form").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimasslines',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimasslines-limit").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimasslines-limit',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimasslines-time").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimasslines-time',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimasslines-count").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimasslines-count',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimasslines-channels").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimasslines-channels',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimasslines-roles").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimasslines-roles',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassmentions-form").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassmentions',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassmentions-limit").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassmentions-limit',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassmentions-time").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassmentions-time',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassmentions-count").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassmentions-count',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassmentions-channels").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassmentions-channels',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassmentions-roles").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassmentions-roles',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassspoilers-form").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassspoilers',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassspoilers-limit").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassspoilers-limit',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassspoilers-time").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassspoilers-time',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassspoilers-count").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassspoilers-count',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassspoilers-channels").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassspoilers-channels',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antimassspoilers-roles").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antimassspoilers-roles',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antinsfw-form").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antinsfw',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antinsfw-time").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antinsfw-time',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antinsfw-count").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antinsfw-count',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antinsfw-channels").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antinsfw-channels',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antinsfw-roles").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antinsfw-roles',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antispam-form").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antispam',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antispam-time").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antispam-time',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antispam-count").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antispam-count',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antispam-channels").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antispam-channels',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antispam-roles").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antispam-roles',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antizalgo-form").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antizalgo',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antizalgo-time").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antizalgo-time',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antizalgo-count").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antizalgo-count',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antizalgo-channels").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antizalgo-channels',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#antizalgo-roles").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/antizalgo-roles',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#automute-time").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/automute-time',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#automute-count").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/automute-count',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#globalchannel").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/globalchannel',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#globalrole").on({
    keydown: function (e) {
        // if (e.which === 32) return false;
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'automod/globalrole',
            data: form.serialize(),
            beforeSend: function () {
                ToastAutoMod.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                ToastAutoMod.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            ToastAutoMod.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});