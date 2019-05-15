function ajaxCall(){
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('#search').val(),
        dataType: 'jsonp',//using jsonp because it uses the script tag instead of XMLHttpRequest for requests
        type: 'GET',
        success: function(data){
        console.log(data);
            $('#update').empty();
            var data = JSON.stringify(data);
            data = JSON.parse(data);
            var output = '';
            data.query.search.forEach(function(data){
                var title = '<h2>' + data.title + '</h2>' + '<br>';
                var snippet = '<p>' + data.snippet + '</p>';
                var url = '<a href="https://en.wikipedia.org/wiki/' + data.title + '" target =_blank">';
                var endUrl = '</a>';
                output += url + title + endUrl + snippet + '<hr>';
                $('#update').append(output);
            });

        }
    });
    
}
function dayArticle(){
$('#update').empty();
$('#search').val('');
$('iframe').attr('src', 'https://en.wikipedia.org/wiki/Special:Random')
}


$(document).ready(function(){
$('#search').focus();
$('#search').on("keyup", function(){
    ajaxCall();
    $('iframe').attr('src', '')

});
//to show random wiki article
$('.random').on('click', function(){
    dayArticle()
    $(this).html('Show me another article')
});
});