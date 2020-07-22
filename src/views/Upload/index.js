import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    Typography
} from '@material-ui/core';

const firebaseConfig = {
    apiKey: "AIzaSyDepvrT4hJrBkkafiEZoXSK56p2K0wvZfw",
    authDomain: "airbus-727f8.firebaseapp.com",
    databaseURL: "https://airbus-727f8.firebaseio.com",
    projectId: "airbus-727f8",
    storageBucket: "airbus-727f8.appspot.com",
    messagingSenderId: "286162080078",
    appId: "1:286162080078:web:a5b77a1e74d96a179d4e1f"
};

var firebase = require('firebase');
var app = firebase.initializeApp(firebaseConfig);

//   app.storage().ref()

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%'
    },
    button: {
        marginTop: 30,
    },
    bar: {
        marginTop: 5,
        width: '65%',
        marginBottom: 40,

    },
    status: {
        marginTop: 200,
        width: '65%',
    },
    icon: {
        marginTop: 200,
        color: 'green',
        // marginBottom: 30,
        fontSize: 60,
        //   marginLeft: 150,
    },

}));

const Upload = props => {
    const { history } = props;

    const classes = useStyles();

    const [statsVal, changeStats] = useState(0);

    const uploadFile = e => {
        console.log(e.target.files[0]);
        var file = e.target.files[0];

        var storageRef = app.storage().ref('Video/' + file.name);
        var task = storageRef.put(file);

        task.on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(percentage);
                changeStats(percentage);

            }
        )
    }

    return (
        <div className={classes.root}>
            <center>
                {
                    statsVal !== 100 ?
                        <div>
                            <Typography variant='h5'
                                className={classes.status}
                            >Upload Status</Typography>
                            <LinearProgress
                                className={classes.bar}
                                variant="determinate" value={statsVal} />
                        </div>
                        :
                        <div>
                            <CheckCircleIcon className={classes.icon} />
                            <Typography variant='h5'>Done</Typography>
                        </div>
                }

            </center>
            <center>
                <Button
                    variant="contained"
                    component="label"
                    className={classes.button}

                >
                    Upload File
                    <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={uploadFile}
                    />
                </Button>

            </center>
        </div>
    );
};

Upload.propTypes = {
    history: PropTypes.object
};

export default withRouter(Upload);
