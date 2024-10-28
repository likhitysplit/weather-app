/*
PROJECT PLANNING:
    1) user input component
        simple input box with cities
        searches for city (in the future, implement a search box that filters down to input)
    2) weather display component
        things to display:
            current temperature
            daily high + low
            weekly weather forecast
            + more in the future ??
    3) weather api utilization
        possible apis:
            CURRENTLY USING: 
            discarded >> https://www.weatherapi.com
            https://api.weather.gov <-- need to use separate api to geocode city into lad/long XXX

        map over to weather display component

    NOTES:
        look into useEffect + implement in Weather.js instead of const fetchApiData
        look into Redux + implement in project -> https://redux.js.org/
        look into this charts library sorter -> https://d3js.org/
        next:
            try to animate graphs w CSS -> DONE !!
            incorporate diff color (new palette)
            tab-like/button structure: --> DONE !!
                set curr bar graph as default --> DONE !!
                add diff graphs w data + tabs to access them --> DONE !!
            learn abt defining types + maintaining w diff components in react (similar to typescript)
                NOTE --> javascript is a dynamically typed language so there are no types
                declaring types is  "passive" in that it is however the variable is declared
                    ex. let x = true --> boolean
                    ex. let length = 16.5 --> float
                    ex. let person = {name: "john", age: 24} --> object
                apart from this, there is no way to directly type all values (but these types are maintained)
            maintaining users w system (login + profile) --> tues. --> DONE !!
                pre-set user vals + authenticate w/ react --> DONE !!
                create file w vals --> no database --> DONE !!
            add routing --> thurs. oct 17th
                1) pass the user route to the router (localhost:3000/1 for user 1, etc.)  --> DONE !! 
                2) the user should be sent to another component w/ a new path for each city --> DONE !!
                    (localhost:3000/{user}/{city}) --> DONE !!
            add timeout period after some time --> directly logs user out --> DONE !!
                use sessionStorage or localStorage << might be better --> DONE !!
            add cityInformation component
                add pop-up window w/ info about the city
                transferring data between components (cityWeather) w/ storage file
            use git for version history 
                set up github repository
*/
