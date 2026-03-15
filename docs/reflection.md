# Laboratory Reflection

## Why I chose React

I chose React because it made the lab requirements easy to explain and implement using reusable components. The dashboard could be split into focused UI parts such as the search form, current weather card, highlights section, hourly outlook, forecast, and theme toggle, while `useState` and `useEffect` handled the app state and API flow clearly.

## Hardest part of API integration

The hardest part was shaping the OpenWeather responses into a dashboard-friendly format. The current weather endpoint and forecast endpoint return different payload structures, so the app had to transform them into one consistent state object, handle invalid city names, handle network failures, and still keep the interface stable when the API key is missing.

## How responsive design improved usability

Responsive design made the app usable on smaller screens by turning the desktop dashboard into stacked cards for tablets and phones. That keeps the search, current conditions, and forecast readable without horizontal scrolling, while still letting larger screens show a richer multi-column layout.

## Which optimization had the biggest impact

The biggest practical optimization was localStorage caching because it improves the perceived speed immediately after reloads. The dashboard can restore the last successful weather result and theme preference before the next live request finishes, which makes the app feel faster and more polished.
