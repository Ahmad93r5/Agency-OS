    import { createConsumer } from "@rails/actioncable";

    export default createConsumer("ws://localhost:3001/cable"); 
    // Browser ko backend ke WebSocket (ws://localhost:3001/cable) se connect karta hai.

