# Why `static.html` is static

The file `static.html` is a static web page because all weather values are hardcoded directly into the HTML. The city name, temperature, condition, humidity, wind speed, pressure, forecast cards, and timestamps are fixed values that never change unless the developer manually edits the file. It uses HTML and CSS only, so there is no JavaScript logic, no API request, and no automatic refresh of data from an external weather service.

Its limitations come from that fixed content. A user cannot search for a different city, the page cannot show real-time weather updates, and the same sample data appears every time the file is opened. Because it is not connected to a live API, it also cannot display loading feedback, validate user input, or report network and city lookup errors. The static version is useful for demonstrating layout and responsive design, but not for delivering live, interactive weather information.
