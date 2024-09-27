// const mongoose = require('mongoose');
// const { faker } = require('@faker-js/faker');
// const config = require('config');


// const dbUri = config.get('db.uri');

// const { Ticket } = require('./src/models/ticketModel');
// const { User } = require('./src/models/userModel');
// const { Session } = require('./src/models/sessionModel');

// console.log('Database URI:', dbUri);


// mongoose.connect(dbUri)
//     .then(() => {
//         console.log('Connected to MongoDB...');
//         return generateTestData(); 
//     })
//     .catch(err => console.error('Could not connect to MongoDB...', err));

// const generateTestData = async () => {
//     try {
//         const users = await User.find();
//         const sessions = await Session.find();

//         if (users.length === 0 || sessions.length === 0) {
//             console.error('No users or sessions found in the database. Add some users and sessions first.');
//             process.exit(1);
//         }

//         const numberOfTickets = 10; 

//         for (let i = 0; i < numberOfTickets; i++) {
//             const randomUser = users[Math.floor(Math.random() * users.length)];
//             const randomSession = sessions[Math.floor(Math.random() * sessions.length)];
//             const randomDate = faker.date.past();

//             const ticket = new Ticket({
//                 user: randomUser._id,
//                 session: randomSession._id,
//                 purchaseDate: randomDate
//             });

//             await ticket.save();
//             console.log(`Ticket ${i + 1} created`);
//         }

//         console.log(`Generated ${numberOfTickets} test tickets.`);
//     } catch (err) {
//         console.error('Error generating test data:', err);
//     } finally {
        
//         mongoose.disconnect();
//     }
// };

// generateTestData();
