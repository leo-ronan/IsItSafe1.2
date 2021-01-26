import $ from 'jquery';
import '../component/myMap';
$(document).ready(function () {

    var filters = {
        disasters: {
            include: "",
            exclude: ""
        },
        location: {
            county: "",
            state: "",
            stateName: ""
        },
        date: {
            startDate: "",
            endDate: ""
        }
    }
    
    $(".leaflet-interactive").on("click", function(event) {
        //Get desired filters
        setTimeout(2000);
        var target = JSON.parse(sessionStorage.getItem("target"));
        console.log(target);
        var popup = $(".leaflet-popup-content").html();
        console.log(popup);
        var stateId = target.GEO_ID;
        filters = {
            disasters: {
                include: "",
                exclude: ""
            },
            location: {
                type: "codes",
                county: target.COUNTY,
                state: stateId.charAt(stateId.length-5) + stateId.charAt(stateId.length-4),
                countyName: target.NAME,
                stateName: target.STATE
            },
            date: {
                startDate: "2020-01-01",
                endDate: ""
            }
        }
        console.log(filters);
        femaCall(filters);
    });
    
    function femaCall(filters) {
        //Set up variables for storing response data
        var disasterStart, disasterEnd, disasterType, disasterCounty, disasterStatus, disasterStateName;
        var locationState, locationCounty, locationFilter
        var disasterInc, disasterExc, disasterFilter, disasterTitle;
        var date1, date2, dateFilter;
        
        if (filters !== null) {
        //DISASTERS
        if (filters.disasters.include == "" && filters.disasters.exclude == "") {
            //All
            disasterFilter = "";
        }
        else if (filters.disasters.include !== "" && filters.disasters.exclude !== "") {
            //Include and exclude
            disasterInc = filters.disasters.include;
            disasterExc = filters.disasters.exclude;
            disasterFilter = "incidentType%20eq%20%27" + disasterInc + "%27%20and%20incidentType%20ne%20%27" + disasterExc + "%27";
        }
        else if (filters.disasters.include !== "" && filters.disasters.exclude == "") {
            //Only include
            disasterInc = filters.disasters.include;
            disasterFilter = "incidentType%20eq%20%27" + disasterInc + "%27";
        }
        else if (filters.disasters.include == "" && filters.disasters.exclude !== "") {
            //Only exclude
            disasterExc = filters.disasters.exclude;
            disasterFilter = "incidentType%20ne%20%27" + disasterExc + "%27";
        }
        
        //LOCATION
        if (filters.location.county == "" && filters.location.state == "") {
            //No location filter
            locationFilter = "";
        }
        else if (filters.location.county !== null && filters.location.state !== null) {
            //Filter by state and county
            locationState = filters.location.state;
            locationCounty = filters.location.county;
            locationFilter = "(fipsStateCode%20eq%20%27" + locationState + "%27%20and%20fipsCountyCode%20eq%20%27" + locationCounty + "%27)";
            
        }
        else if (filters.location.county !== null && filters.location.state == null) {
            //Filter by county only
            locationCounty = filters.location.county;
            locationFilter = "fipsCountyCode%20eq%20%27" + locationCounty + "%27";
        }
        else if (filters.location.county == null && filters.location.state !== null) {
            //Filter by state only
            locationState = filters.location.state;
            locationFilter = "fipsStateCode%20eq%20%27" + locationState + "%27";
        }

        //DATE
        if (filters.date.startDate == "" && filters.date.endDate == "") {
            //No date filter
            dateFilter = "";
        }
        else if (filters.date.startDate !== "" && filters.date.endDate !== "") {
            //Start and end date filter
            date1 = filters.date.startDate;
            date2 = filters.date.endDate;
            dateFilter = "declarationDate%20ge%20%27" + date1 + "%27%20and%20declarationDate%20le%20%27" + date2 + "%27";
        }
        else if (filters.date.startDate !== "" && filters.date.endDate == "") {
            //Filter by start date only
            date1 = filters.date.startDate;
            dateFilter = "declarationDate%20ge%20%27" + date1 + "%27";
        }
        else if (filters.date.startDate == "" && filters.date.endDate !== "") {
            //Filter by end date only
            date2 = filters.date.endDate;
            dateFilter = "declarationDate%20le%20%27" + date2 + "%27";
        }
        }
        //Ensure link is spaced properly depending on which data is being filtered
        if (dateFilter != "" && locationFilter != "") {
            dateFilter = "%20and%20" + dateFilter;
        }
        if ((disasterFilter != "" && dateFilter != "") || (disasterFilter != "" && dateFilter == "" && locationFilter != "")) {
            disasterFilter = "%20and%20" + disasterFilter;
        }
        //$filter=declarationDate%20{gt, lt, eq}%27{date in ISO-8601 format}%27%20{and, or}%20state%20{eq, ne}%20%27{state abbr. (caps)}%27
          //gt = greater than, lt = less than, eq = equal to, ne = not equal to (exclude)
        var linkStart = "https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$filter=";
        var queryURL = linkStart + locationFilter + dateFilter + disasterFilter;
        console.log(queryURL);
        $.ajax({
            datatype: "json",
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
                console.log(response);
                //Shortcut for readability
                var res = response.DisasterDeclarationsSummaries;
    
                //Read last item in array
                if (res.length == 0) {
                    alert("No data!");
                }
                else {
                    $("#data").empty();
                    $("#disasterCount").empty();
                    var totalActive = 0;
                    for (var i = 0; i < res.length; i++) {
                        //Store info in previously created variables
                        disasterCounty = filters.location.countyName;
                        disasterType = res[i].incidentType;
                        disasterStart = res[i].incidentBeginDate.slice(0, 10);
                        disasterEnd = res[i].incidentEndDate;
                        disasterStateName = filters.location.stateName;
                        disasterTitle = res[i].declarationTitle;
                        //If there is no end date, set disasterStatus to true (active)
                        if (disasterEnd != null) {
                            disasterStatus = false;
                        }
                        else {
                            disasterStatus = true;
                            totalActive++;
                        //Display info
                        $("#data").append("<li id='county'>County: " + disasterCounty + "</li>");
                        $("#data").append("<li id='type'>Type: " + disasterType + "</li>");
                        $("#data").append("<li id='type'>Disaster: " + disasterTitle + "</li>");
                        $("#data").append("<li id='start'>Start: " + disasterStart + "</li>");
                        if (disasterStatus == false){
                            $("#data").append("<li id='end'>End: " + disasterEnd + "</li>");
                        }
                        else {
                            $("#data").append("<li id='status'>Still active!</li>")
                        }
                        $("#data").append("<br>");
                        }
                    }
                    var pluralCheck = "";
                        if (totalActive > 1) {
                            pluralCheck = "s";
                        }
                        $("#disasterCount").append("<h2 style='text-align: center'>There are " + totalActive + " active disaster" + pluralCheck + " in " + disasterCounty + ", " + disasterStateName);
                }      
            });
    }    
});
