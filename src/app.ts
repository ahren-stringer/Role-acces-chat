import expess from 'express'
import mongoose from 'mongoose'
import Cors from "cors"
import auth from './routes/auth.routes'
import profile from './routes/profile.routes'
import users from './routes/users.routes'
import dialogs from './routes/dialogs.routes'
import messages from './routes/messages.routes'
import updateLastSeen from './middlewares/updateLastSeen'
import checkAuth from './middlewares/checkAuth'
import path from "path"

//API Config
const app = expess();
const port : string | number = process.env.PORT || 8001;
const connection_url : string = 'mongodb+srv://Pavel:4xSzHb2SeAdAydKR@cluster0.xwykf.mongodb.net/role_access_chat?retryWrites=true&w=majority'
 'mongodb://localhost:27017/role_acces_chat'

//Middlewares
app.use(expess.json())
app.use(Cors())
app.use(updateLastSeen)
app.use(checkAuth)
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
mongoose.connect(connection_url , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

})

mongoose.connection.on('error', (err: Error) => {
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