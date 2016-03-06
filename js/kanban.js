$(document).ready(function(){
    var cards = document.querySelectorAll('.card');
    for (var i = 0, n = cards.length; i < n; i++) {
        var card = cards[i];
        card.draggable = true;
    };
    var board = $('board');
    var hideMe;
    var target_transfered;
    jQuery.event.props.push('dataTransfer');
    $("#board").on('selectstart',function(e) {
        e.preventDefault();
    });
    $("#board").on('dragstart', function(e){
        e.dataTransfer.setData("card",e.target.id);
        e.dataTransfer.effectAllowed = "move";
        hideMe = e.target;
        target_transfered = e.target;
    });

    $("#board").on('dragend', function(e){
        $(e.target).show();
    });

    var lastEneterd;
    $("#board").on('dragenter', function(e){
        if (hideMe) {
            $(hideMe).hide();
            hideMe = null;
        }
        // Save this to check in dragleave.
        lastEntered = e.target;
        var section = closestWithClass(e.target, 'section');
        // TODO: Check that it's not the original section.
        if (section) {
            e.preventDefault(); // Not sure if these needs to be here. Maybe for IE?
            return false;
        }
    });

    $("#board").on('dragover', function(e){
        var target = e.target;
        if(target.classList.contains("section")){
            if(!$('.placeholder', target).length){
               var div =" <div class='card placeholder'></div>";
               $(target).append(div);
            }
        }else if(target.className == 'card'){
            var context = closestWithClass(e.target, 'section');
            var alto = e.target.clientHeight/2;
            var target_id = e.target.id;
            var div =" <div class='card placeholder'></div>";
            $('.placeholder',context).remove();
            if(e.offsetY > alto){
                //abajo
                if(e.target.nextElementSibling == null || !e.target.nextElementSibling.classList.contains("placeholder")){
                    $(div).insertAfter("#"+target_id);
                }
            }else{
                //arriba
                if(e.target.previousElementSibling == null || !e.target.previousElementSibling.classList.contains("placeholder")){
                    $(div).insertBefore("#"+target_id);
                }
            }
        }
        // TODO: Check data type.
        // TODO: Check that it's not the original section.
        if (closestWithClass(e.target, 'section')) {
            e.preventDefault();
        }
    });


    $("#board").on('dragleave', function(e){
        // FF is raising this event on text nodes so only check elements.
        if (e.target.nodeType === 1) {
            // dragleave for outer elements can trigger after dragenter for inner elements
            // so make sure we're really leaving by checking what we just entered.
            // relatedTarget is missing in WebKit: https://bugs.webkit.org/show_bug.cgi?id=66547
            var section = closestWithClass(e.target, 'section');

            if (lastEntered && section && !section.contains(lastEntered)) {

                $('.placeholder',section).remove();
            }
        }
        lastEntered = null; // No need to keep this around.
    });

     $("#board").on('drop', function(e){
        var section = closestWithClass(e.target, 'section');
        var id = e.dataTransfer.getData('card');
        if (id) {
            var card = $('#'+id);
            // Might be a card from another window.
            if (card) {
                if (section !== card.parentNode) {
                    $('.placeholder', section).replaceWith(card);
                    target_transfered = null;
                }
            } else {
                alert('couldn\'t find card #' + id);
            }
        }
        $('.placeholder',section).remove();
        e.preventDefault();
    });
    function closestWithClass(target, className) {
        while (target) {
            if (target.nodeType === 1 &&
                target.classList.contains(className)) {
                return target;
            }
            target = target.parentNode;
        }
        return null;
    }
});