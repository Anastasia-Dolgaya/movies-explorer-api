const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { limiter } = require('./middlewares/limiter');
const errorsHandler = require('./middlewares/errorsHandler');
const { router } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

app.use(requestLogger);

app.use(limiter);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
