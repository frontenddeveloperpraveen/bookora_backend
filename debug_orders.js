const mongoose = require('mongoose');
const Order = require('./models/Order');
const User = require('./models/User');

mongoose.connect('mongodb+srv://dineshbooks07_db_user:rj4wBn2KpsdQ2zzH@ebook.ykvg7aq.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB Connected');
    try {
        const users = await User.find();
        console.log('ALL USERS:');
        users.forEach(u => console.log(`ID: ${u._id}, Name: ${u.name}, Email: ${u.email}`));

        const orders = await Order.find();
        console.log('\nALL ORDERS:');
        orders.forEach(o => {
            console.log(`Order ID: ${o._id}, User ID: ${o.user}, Books: ${o.books.length}`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
}).catch(err => console.log(err));
