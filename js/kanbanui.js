$(function() {
    jQuery.event.props.push('dataTransfer');
    var dataTransfer = null;
    $( ".connectedSortable" ).sortable({
        revert: true,
        scroll: false,  
        placeholder: 'drag-place-holder',
        forcePlaceholderSize: true, 
        connectWith: ".connectedSortable",
        helper:function(event, element){return $(element).clone().addClass('dragging');},
        start: function (e, ui) {
            ui.item.show().addClass('ghost');
        },
        stop: function (e, ui) {
            ui.item.show().removeClass('ghost');
            dataTransfer = {
                idCard: ui.item.context.id,
                originalStage: e.target.id,
                currentStage: ui.item.context.parentNode.id,
            };
            var project = new Project();
            project.idproject(dataTransfer.idCard).stage(dataTransfer.currentStage);
            UpdateCardData(project);
            dataTransfer = null;
        },
        cursor:'move'
    }).disableSelection();

    var UpdateCardData =  function(data){
        UtilityProject.updateProject(data);
    }
});