$("#xd1").on({
    keypress: function (e) {
        // if (e.which == 13) console.log('ok');
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'autorole',
            data: form.serialize(),
            beforeSend: function () {
                Toast.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                Toast.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            Toast.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});

$("#xd2").on({
    keypress: function (e) {
        // if (e.which == 13) console.log('ok');
    },
    change: function (e) {
        e.preventDefault();
        var form = $(this);

        $.ajax({
            type: "POST",
            url: 'stickyrole',
            data: form.serialize(),
            beforeSend: function () {
                Toast.fire({
                    icon: 'warning',
                    title: 'Saving...'
                });
            },
            success: function (data) {
                Toast.fire({
                    icon: 'success',
                    title: 'Saved Changes'
                });
            }
        }).fail(function () {
            Toast.fire({
                icon: 'error',
                title: 'An error occurred while saving...'
            });
        });
    },
});