const app = {};
app.retroBaseUrl = 'https://retroapi.hackeryou.com/api'
app.lyricsURL = 'https://api.lyrics.ovh/v1'
app.retroApiKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjAyZDNiMmQ5MDk0Y2QwNDNiNzFlNzliIn0sImlhdCI6MTYxMzU3NzAwNSwiZXhwIjoxNjQ1MTEzMDA1fQ.xcI4-n9182sSCr_YX-kV_hbZcr_rVl6LXryGKWYbHZ8`

app.movieBaseUrl = 'http://www.omdbapi.com/';
app.movieKey = `5e358330`

app.$title = $('.movieTitle');
app.$moviePlot = $('.moviePlot');
app.$poster = $('.poster')


app.setMovie = function(){
    const retroDetails = app.getRetroDetails();
    retroDetails.then(res => {
        
        const randomYear = app.randomElement(res)
        const year = randomYear.year
        const movieArray = randomYear.movies
        const randomMovie = app.randomElement(movieArray)
        const title = randomMovie.title

        const movie = app.getMovie(title, year)
        movie.then(res => {
            app.$title.append(`${title}, ${year}`)
            app.$moviePlot.append(res.Plot)

            if (res.Poster !== "N/A"){
                app.$poster.attr('alt', `Poster for ${randomMovie}`)
                app.$poster.attr('src', res.Poster)

            }
        })
    })
}



app.randomElement = function(array){
    const index = Math.floor(Math.random() * array.length)
    return array[index]
}


app.getRetroDetails = function(){
    const yearsResponse = $.ajax({
        url: `${app.retroBaseUrl}/years`,
        method: 'GET',
        dataType: 'json',
        data: {
            apiKey: app.retroApiKey
        }
    })

    return yearsResponse
}

app.getMovie = function (title, year) {
    const response = $.ajax({
        url: app.movieBaseUrl,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: app.movieKey,
            t: title,
            y: year
        }
    })
    return response
}


app.refreshMovie = function(){
    app.$title.empty();
    app.$moviePlot.empty();
    app.$poster.empty();
    app.setMovie();
}
app.init = function(){
    app.setMovie();
    $('.curtain').on('click', function() {
        if ($('#curtain_checkbox').prop('checked') === false) {
            app.refreshMovie()
        }
    })
}

$(function() {
    app.init()
});







