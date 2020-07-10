/*==============================================================================

        * desc:
        * date created: 11.10.2017
        * ver: 0.1.2
        * author:
==============================================================================*/
//
$(window).load(function(){
    if($('#eform').length){
        var selector_area,
            selector_car = '[name=car]';

        var selector_area_popup;
        var selector_area_eform;
        if($('#popup').find('form').find('*[name=area]').length == 1){
            selector_area_popup = 'select[name=area]';
        }
        else if($('#popup').find('form').find('*[name=address]').length == 1){
            selector_area_popup = 'select[name=address]';
        }

        // create select tag area
        var html_area = "<div class='input-field col s12'><select id='eform_area' name='area'>";
        $("#popup "+ selector_area_popup +" option").each(function() {
            html_area += "<option value='" + $(this).text() + "'>" + $(this).text() + "</option>";
        });
        html_area += "</select></div>";

        // create select tag car
        var html_car = "<div class='input-field col s12'><select id='eform_car' name='car'>";
        $("#popup select[name=car] option").each(function() {
            html_car += "<option value='" + $(this).text() + "'>" + $(this).text() + "</option>";
        });
        html_car += "</select></div>";

        //---------------------------
        if($('#eform').find('form').find('*[name=area]').length == 1){
            selector_area_eform = '*[name=area]';
        }
        else if($('#eform').find('form').find('*[name=address]').length == 1){
            selector_area_eform = '*[name=address]';
        }
        //
        var parentTag_area = $('#eform').find(selector_area_eform).parent();
        $(parentTag_area).append(html_area);
        $('#eform').find('*[name="address"]').remove();
        //
        //---------------------------
        var parent_tag_car = $('#eform').find('*' + selector_car).parent();
        $(parent_tag_car).append(html_car);
        $('#eform').find('input' + selector_car).remove();

        //style css for select area
        $('select').material_select();
        $('.card.news.news-detail').css({
                'overflow': 'scroll'
        });
        $('#eform_area').parent().css({
            'margin-left': '3rem',
            'width': 'calc(100% - 3rem)',
            'margin-top': '10px'
        });
        $('#eform_car').parent().css({
            'margin-left': '3rem',
            'width': 'calc(100% - 3rem)',
            'margin-top': '10px'
        });
    }

});
