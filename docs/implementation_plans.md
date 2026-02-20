# 📄 Implementation Plans

## Socket Communication

- When the user is on the main menu, do not connect to the server.

- If the user clicks on "Create Party", connect to the server and send the request.

- If the user enters a party code and clicks on "Join Party", connect to the server and send the request.
  - If the party code is invalid, disconnect immediately.

- If the user leaves the party, is removed from the party, or the party is disbanded, immediately disconnect from the server.

- Service worker should track the connection status of the websocket.
  - The offscreen document sends the status whenever it changes, and the service worker saves it.

- The service worker should track the details of the user's current party.

- Manually reload the connection status & party details from the server when the service worker wakes up.

- If the socket is automatically reconnected, offscreen should inform the service worker and the service worker should attempt to rejoin the same party.
