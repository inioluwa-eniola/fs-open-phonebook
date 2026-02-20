Mental Model for fullstack app

Frontend:
- write frontend code usig state + conditional rendering 
- initial state comes from the backend using useEffect
- UI reacts to changes in state and not changes in the database

- React never talks to MongoDB
- React only talks to HTTP endpoints

Service File - people.js:
- peopls.js is a client-side abstraction layer 
- it:
    - defines getAll, create, update, remove 
    - uses axios 
    - hides URLs + HTTP details from the components 

    Relative URLs 
    - /api/persons does not point directly to MongoDB
        - it points to express server 
    - In development:
        - Vite proxy --> localhost:3001
    - In production:
        - same server serves frontend + API


    Browser (React)
        ↓ HTTP request
    Express server (index.js)
        ↓ Mongoose query
    MongoDB

    - people.js runs in broswer
    - index.js runs on the server
    - They communicate via HTTP


person.js
- Defines Schema + model
- may trigger a connection 


Mental model 

┌──────────────┐
│   React UI   │
│ (useState)   │
│ (useEffect)  │
└──────┬───────┘
       │ HTTP (axios)
       ▼
┌──────────────────┐
│ Express Server   │
│ (routes)         │
│ (/api/persons)   │
└──────┬───────────┘
       │ Mongoose API
       ▼
┌──────────────────┐
│ MongoDB Atlas    │
│ (documents)      │
└──────────────────┘



Layer:              Responsibility
Frontend -->        UI, state, user interaction
Service file --->   HTTP abstraction
Express --->        API, routing, validation
Mongoose ----->     Schema, + DB validation
MongoDB ---->       Persistent storage