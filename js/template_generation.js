

function FweatherUpdate(weather)
{
    if (weather === "snow")
    {
        $("#weatherElement").remove();
        var html = [
            '<h4 class="card-title animated fadeInUp rotateIn text-info" id="weatherElement">',
                '<i class="fa fa-snowflake"></i>',
            '</h4>'
        ].join("\n");
        
        $("#weather").append(html);
    }

    if (weather === "rain")
    {
        $("#weatherElement").remove();
        var html = [
            '<h4 class="card-title animated fadeInUp rotateIn text-primary" id="weatherElement">',
                '<i class="fa fa-cloud-rain"></i>',
            '</h4>'
        ].join("\n");
        
        $("#weather").append(html);
    }

    if (weather === "sun")
    {
        $("#weatherElement").remove();
        var html = [
            '<h4 class="card-title animated fadeInUp rotateIn text-warning" id="weatherElement">',
                '<i class="fa fa-sun"></i>',
            '</h4>'
        ].join("\n");
        
        $("#weather").append(html);
    }

    if (weather === "heat wave")
    {
        $("#weatherElement").remove();
        var html = [
            '<h4 class="card-title animated fadeInUp rotateIn text-danger" id="weatherElement">',
                '<i class="fa fa-burn"></i>',
            '</h4>'
        ].join("\n");
        
        $("#weather").append(html);
    }
}

function FpollutionUpdate(condition)
{
    if (condition === "normal")
    {
        $("#pollutionElement").remove();
        var html = [
            '<h4 class="card-title animated fadeInUp rotateIn text-success" id="pollutionElement">',
                '<i class="fa fa-check-circle fa-lg"></i>',
            '</h4>'
        ].join("\n");
        
        $("#pollution").append(html);   
    }
    if (condition === "pollution peak")
    {
        $("#pollutionElement").remove();
        var html = [
            '<h4 class="card-title animated fadeInUp rotateIn text-warning" id="pollutionElement">',
                '<i class="fas fa-exclamation-triangle fa-lg"></i>',
            '</h4>'
        ].join("\n");
        
        $("#pollution").append(html); 
    }
}

function FmissionUpdate(mission)
{
    $("#mission").html(mission);
}

function addPath()
{
    
}