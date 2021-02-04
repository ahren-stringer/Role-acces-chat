import expess from 'express'
import mongoose from 'mongoose'
import Cors from "cors"
import auth from './routes/auth.routes.js'
import profile from './routes/profile.routes.js'
import users from './routes/users.routes.js'
import dialogs from './routes/dialogs.routes.js'
import messages from './routes/messages.routes.js'
import updateLastSeen from './middlewares/updateLastSeen.js'

//API Config
const app = expess();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://Pavel:4xSzHb2SeAdAydKR@cluster0.xwykf.mongodb.net/role_access_chat?retryWrites=true&w=majority'
//'4xSzHb2SeAdAydKR'
//Middlewares
app.use(expess.json())
app.use(Cors())
app.use(updateLastSeen)
// Авторизация
app.use('', auth)
//     //Пользовательские данные
app.use('', profile)
// Пользователи
app.use('', users)
// Диалоги
app.use('', dialogs)
// Сообщения
app.use('', messages)

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

})

mongoose.connection.on('error', err => {
    console.log(err);
});

if (process.env.NODE_ENV === 'production') {
    app.use(expess.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
//Listener

app.listen(port, () => console.log('Server Starts on localhost', port))