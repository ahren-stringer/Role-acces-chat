import './Auth.module.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 340,
        margin: '40px auto 0'
    },
    // bullet: {
    //     display: 'inline-block',
    //     margin: '0 2px',
    //     transform: 'scale(0.8)',
    // },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    input: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    }
}));

function Auth() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Вход
                </Typography>
            </CardContent>
            <CardActions>
                <form className={classes.input} noValidate autoComplete="off">
                    <div>
                        <TextField
                            //error
                            id="standard-error-helper-text"
                            //label="Error"
                            label='E-mail'
                        //helperText="Incorrect entry."
                        />
                    </div>
                    <div>
                        <TextField
                            //error
                            id="standard-error-helper-text"
                            //label="Error"
                            label='Пароль'
                            type='password'
                        //helperText="Incorrect entry."
                        />
                    </div>
                    <div style={{margin: '22px 0 10px 8px'}}>
                        <Button variant="contained" style={{marginRight: '8px'}}>Войти</Button>
                        <Button variant="contained">
                            <NavLink to='/register'></NavLink>
                            Зарегистрироваться
                            </Button>
                    </div>
                </form>
            </CardActions>
        </Card>
    )
}

export default Auth;