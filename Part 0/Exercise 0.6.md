```mermaid
sequenceDiagram
    participant browser
    participant spa_server

    browser->>spa_server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: the browser sends the new note to the server
    activate spa_server
    spa_server-->>spa_server: the event handler creates a new note, adds it to the notes list,and rerenders the note list on the page and sends the new note to the server.
    spa_server-->>browser: Returns 201(Accepted) and the location of the new note as JSON
    deactivate spa_server
