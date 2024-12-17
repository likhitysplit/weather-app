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
            use git for version history  --> ALMOST DONE !!
                set up github repository

            validation for buttons (disabled when no values) --> thurs. nov 7
            implement mock data APIs DONE !!
                set delay time to ensure data is fetched properly (w/o disturbing other functions) DONE !!
            set loading UI for when data is being fetched (delay time) DONE !!
            set roles DONE !!
                set admin role for likhi user (visibility -> to see city information tab) DONE !!
                add one more user -> curr roles DONE !!
                    one admin DONE !!
                    one reg user DONE !!
                    one user w/o perms to login DONE !!

            validation for buttons (disabled when no values) --> tues. nov 12
            add registration form for users  DONE 
                add field for role w/ select options DONE 
                if chosen username already exists, give validation message DONE 
                password should have certain requirements DONE 
            create separate repo branch (NOT WORKING)
            user validation pt. 2
                get user info using URLs (queryparam) -> use this to check role DONE
                use common loader component for both get weather and city information (universal) DONE
                    add dynamic parameters DONE
                show user role when displaying name at the top DONE
                    use diff color for name for admins DONE
            add country param to user DONE 
                use country (ex. usa) to determine if fahrenheit or celsius data should be displayed DONE


            if there is extra time..
                use bootstrap + flex to make website more responsive
            set up "like" component to be used in both getweather and cityinfo components
                users will have "getweather_liked" or "cityinfo_liked" field that the liked cities will be saved to
                    if liked in both components, push data to user array
            

            give password validation as user enters password (dynamic) DONE 
                below input text field (even when user hasn't entered entire password yet) DONE
            set manual delay time in WeatherRedux before displaying  DONE
                set timeout so the data is taken from API after a few seconds DONE
            lengthen session time to 1 hour (user automatically logged out after) DONE
            disable register button if user is already registered DONE 
                display text underneath input box DONE
            store data in a local storage (based on sessions) DONE
                fetch data from there DONE
                allows for new users to be added DONE
            dynamic username checking DONE
                starts comparing new username after 3 characters DONE
            
            
            
            use bootstrap to make website more responsive/interactive + explore bootstrap further --> thurs. nov. 19th DONE
                look into w3schools + bootstrap official site DONE
                use bootstrap components + mix with current components DONE
            set up "like" component to be used in both getweather and cityinfo components DONE?
                users will have "getweather_liked" or "cityinfo_liked" field that the liked cities will be saved to DONE?
                    if liked in both components, push data to user array 
            look into react's implementations of "lazy-loading" DONE
                components only get rendered (better optimization) DONE
                https://react.dev/reference/react/lazy DONE
                also add lazy loading for images (on cityinformation component) DONE
            edit role calls so that it uses query params to set + fetch data DONE
            set up "router outlet" that loads dynamic data DONE
                does not include header + footer (universal components) DONE
                helps set up a single-page application DONE            
                

                remove header/footer page from login/register page DONE !!
                add interactive features to header + footer (borders, buttons) DONE !!
                start off w counting # of likes in likebutton component DONE !!
                    (split up w/ separate fields for cityinfo_liked and getweather_liked) DONE !!
                    start off w array of cities based on location DONE !!
                add encryption to storage values (users data) DONE !!
                    when fetching data, decrypt the encrypted data from earlier DONE !!


                dec. 10th TO-DO !!

                fix undefined data transfer (w/ cityinformation component)  DONE !!
                handle errors (use try-catch) to check for errors w data DONE !!
                    in multiple components (ex. weatherredux, login/register, likecomponent) DONE !!
                add guards for invalid paths (based on user roles) DONE !!
                    prevent the user from routing thru specific paths if they aren't allowed DONE !!
                keep a "subscription" option for users DONE !!
                    if the user has a subscription, he can view the graphs ('premium' version) DONE !!
                add to the register component -> lets the user register directly via google  --> 401 UNAUTHORIZED ERROR !! TROUBLESHOOT !!
                
                deploy new repos for weather app and to-do app DONE !!

*/


