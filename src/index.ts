import 'module-alias/register';

import * as bodyParser from 'body-parser';
import * as express from 'express';

import { moviesRouter } from './modules/movies';
import { validationError } from './validation';

const app = express()

app.use(bodyParser.json())
app.use(validationError);
app.use('/movies', moviesRouter())
app.get('/', (req, res) => {
  return res.send('Hello there.')
})

const boot = (): void => {
  app.listen(6969, () => {
    console.log('server started')
  })
}

boot()