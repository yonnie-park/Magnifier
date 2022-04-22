let zoom_val = 1.0
let scroll_val = 0
let divShown = false;

$(document).ready(function() {
    document.addEventListener('keydown', function(e) { //Refactoring Content
        if (e.code === 'Space') {
            e.preventDefault()
        }
    })

    document.addEventListener('keydown', function(e) {
        if (e.code === 'Equal' && e.shiftKey) { //Graphical Zoom in
            console.log("shift+"); //when pressed shift + plus
            zoom_val = zoom_val + 0.1
            $("body").css({
                "transform": "scale(" + zoom_val + ")", //scale css
                "transform-origin": "0 0" //zooms from the top left
            })
            let doc_width = $(document).width()
            let win_width = $(window).width()
            if (doc_width > win_width) {
                document.addEventListener('mousemove', function(e) {
                    if (e.clientX < 100) {
                        console.log("left margin");
                        scroll_val = scroll_val - 10
                        $(document).scrollLeft(scroll_val);
                    } else if (e.clientX > win_width - 100) {
                        console.log("right margin");
                        scroll_val = scroll_val + 10
                        $(document).scrollLeft(scroll_val);
                    }
                })
            }
        } else if (e.code === 'Minus' && e.shiftKey) { //Graphical Zoom out
            console.log("shift-"); //when pressed shift + minus
            zoom_val = zoom_val - 0.1
            $("body").css({
                "transform": "scale(" + zoom_val + ")",
                "transform-origin": "0 0"
            })
        } else if (e.code === 'Equal') { //Browser Zoom in
            console.log("plus");
            zoom_val = zoom_val + 0.1
            document.body.style.zoom = zoom_val
        } else if (e.code === 'Minus') { //Browser Zoom out
            console.log("minus");
            zoom_val = zoom_val - 0.1
            document.body.style.zoom = zoom_val
        }
    })
    $("*:not(body)").hover(
        function(event) { //call when hover
            $(this).addClass("highlight");
            event.stopPropagation();
            document.addEventListener('keydown', function(e) { //Refactoring Content
                if (e.code === 'Space' & !divShown) {
                    console.log("space")
                    $("body").append($("<div id='refactor'></div>"))
                    $(refactor).append($(".highlight").clone())
                    divShown = true;
                    document.addEventListener('keydown', function(e) { //Refactoring Content
                        if (e.code === 'Space') {
                            $(refactor).remove()
                            divShown = false;
                        }
                    })
                }
            })
        },

        function(event) { //call when stop hover
            $(this).removeClass("highlight")
            $(".highlight").removeClass('highlight')
        }
    )


})
