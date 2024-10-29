```mermaid
sequenceDiagram
    participant browser
    participant spa_server

    browser->>spa_server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate spa_server
    spa_server-->>browser: HTML document
    deactivate spa_server

    browser->>spa_server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate spa_server
    spa_server-->>browser: the css file
    deactivate spa_server

    browser->>spa_server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate spa_server
    spa_server-->>browser: the JavaScript file
    Note left of spa_server: this is a different js file then seen on the example-app
    deactivate spa_server


    browser->>spa_server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate spa_server
    spa_server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate spa_server
