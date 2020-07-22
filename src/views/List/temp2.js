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
    apiKey: "AIzaSyB1KBSoc22JbuzK1QG6dPi9pwja3HT5j6k",
    authDomain: "airbus-caec9.firebaseapp.com",
    databaseURL: "https://airbus-caec9.firebaseio.com",
    projectId: "airbus-caec9",
    storageBucket: "airbus-caec9.appspot.com",
    messagingSenderId: "989386969928",
    appId: "1:989386969928:web:137e3d03159856fcae597d",
    measurementId: "G-B5YN1HK0N6"
};
var firebase = require('firebase');
// var app2 = firebase.initializeApp(firebaseConfig);
var listRef = firebase.storage().ref('Video');
const data=[];
const fileName=[];
listRef.listAll().then(function(res) {
    // res.prefixes.forEach(function(folderRef) {

    //   console.log(folderRef)
    // });
    res.items.forEach(function(itemRef) {
        console.log(itemRef)
        console.log(itemRef.location.path.replace('Video/','') )
        var name = itemRef.location.path.replace('Video/','').replace('.mp4','')
    //   console.log(itemRef.getDownloadURL())
    fileName.push(name);
        itemRef.getDownloadURL().then(function(url){
            console.log(url)
            data.push(url)
        })
    });
    }).catch(function(error) {
    // Uh-oh, an error occurred!
    });

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

const List = props => {
    const { history } = props;

    const classes = useStyles();

    const [statsVal, changeStats] = useState(0);

    const handleLike = (i) => {
        console.log(data);
        
        // console.log(e.target.files[0]);
        // var file = e.target.files[0];

        // var storageRef = app.storage().ref('Video/' + file.name);
        // var task = storageRef.put(file);

        // task.on('state_changed',
        //     function progress(snapshot) {
        //         var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log(percentage);
        //         changeStats(percentage);

        //     }
        // )
    }

    return (
        <div className={classes.root}>
        heyyyy
        <Grid container spacing={3}>
        <Grid item xs={5} className={classes.gridDiv} >
        <video className="video-container video-container-overlay" width='450'  autoPlay="" loop="" muted="" data-reactid=".0.1.0.0" controls>
            <source type="video/mp4" data-reactid=".0.1.0.0.0" src=""  />
        </video>
        <Typography variant='h5'>Lol</Typography>
        <Button style={{backgroundColor: '#0aa31e',}} onClick={(index) => handleLike(index)}>Like</Button>
        <Button style={{backgroundColor: '#e01039',}}>Like</Button>
        </Grid>
        
    
        </Grid>
        {
            data.map((item,index) => {

                console.log('item log   ');
                console.log(item);
                
            return(
            <h3 key={index+10}>hii</h3>
            )
            })
        }
        </div>
    );
};

List.propTypes = {
    history: PropTypes.object
};

export default withRouter(List);
