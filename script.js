function movieSearch(){
    $('#movie-list').html('');
    $.ajax({
        url:'http://www.omdbapi.com/',
        type:'GET',
        dataType:'json',
        data:{
            'apikey':'a68d6cba',
            's':$('#search-movie').val()
        },
        success:function(result){
            if(result.Response=="True"){
                let movie=result.Search;
                $.each(movie, function(i,data){
                    $('#movie-list').append(`
                    <div class="col-md-3 mb-2">
                    <div class="card">
                    <img class="card-img-top" src="`+data.Poster+`" alt="Image Not Found">
                    <div class="card-body">
                      <h5 class="card-title">Judul :`+data.Title+`</h5>
                      <h5 class="card-title">Tahun :`+data.Year+`</h5>
                      <a href="#" class="btn btn-primary see-details" data-toggle="modal" data-target="#exampleModal" data-id="`+data.imdbID+`">see details</a>
                    </div>
                  </div>
                    </div>
                    `);
                });
            }else{
                $('#movie-list').html(`
                <div class="col">
                <h1 class="text-center">`+result.Error+`</h1>
                </div>`);
            }
        }
    });
    $('#search-movie').val('');
}

    $('#movie-list').on('click', `.see-details`,function(){
        $.ajax({
            url:'http://www.omdbapi.com/',
            dataType:'json',
            type:'GET',
            data:{
                'apikey':'a68d6cba',
                'i':$(this).data('id')
            },
            success:function(movie){
                if(movie.Response==="True"){
                    $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+movie.Poster+`" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item">Title : `+movie.Title+`</li>
                                    <li class="list-group-item">Year : `+movie.Year+`</li>
                                    <li class="list-group-item">Genre : `+movie.Genre+`</li>
                                    <li class="list-group-item">Director : `+movie.Director+`</li>
                                    <li class="list-group-item">Actor : `+movie.Actors+`</li>
                                    <li class="list-group-item">Language : `+movie.Language+`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    `);
                }else{

                }
            }
        });
    });

$('#search-button').on('click', function(){
    movieSearch();
});
$('#search-movie').on('keyup', function(e){
    if(e.keyCode==13){
        movieSearch();
    }
});
