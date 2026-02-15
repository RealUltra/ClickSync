# ClickSync

**Allows multiple people to control the same video stream when watching movies & TV shows with friends.**

## 📄 Initial Plan

- The chrome extension is the client & there is a javascript server.

- Use socket.io to communicate between the server & client.

- Each client can either be designated as a viewer or host. The host is the computer playing the video.

- The chrome extension’s UI has two tabs: Party and Media.

- The Party tab allows you to create a new party or join an existing party with a code. You can also put a password on your party.

- The Media tab is disabled when you are:
  - Not in a party.
  - In a party where the host has not yet connected to a media source.

- If you’re the host and you haven’t selected a media source, the Media tab asks you to choose a media source.

- If a media source is selected, the media tab contains the controls for the video on both viewer & host machines.

- The host machine can unselect the current media source, and change it out with a different one.
