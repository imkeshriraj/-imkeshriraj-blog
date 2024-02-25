const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
require('dotenv').config();
const port = process.env.PORT;
const connectDb = require('./connection');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/auth');
connectDb();

const Blog = require('./models/blog');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/user', userRouter);
app.use('/blog', blogRouter);


app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({}).sort({ createdAt: -1 });

  return res.render('home', {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});