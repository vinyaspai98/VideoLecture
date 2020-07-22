/* eslint-disable no-invalid-this */
/* eslint-disable no-confusing-arrow */
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Collapse from '@material-ui/core/Collapse';
// import DeleteIcon from '@material-ui/icons/Delete';

// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    Typography
} from '@material-ui/core';

const styles = (theme) => ({
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
    gridDiv: {
        margin: 20,
    },
    listButton: {
        margin: 30,
        color: 'green',
    },
    icon: {
        marginTop: 200,
        color: 'green',
        // marginBottom: 30,
        fontSize: 60,
        //   marginLeft: 150,
    },
});

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
var count = 1;
const getId = () => {
      count+=1;
    return "id"+toString(count);
}
class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            likeNum : [34,12,45,100,45,30,20,10,12,23,43,75,15,33,22,14,9],
          like: [],
          load: false,
          data: [],
          fileName: [],       
      }
      }


  componentDidMount(){
    let data1=[];
    let fileName=[];
    var likeVal =[];
    var likeNum1 =[];
    listRef.listAll().then(function(res) {
        
        res.items.forEach(function(itemRef) {
          console.log(itemRef)
          console.log(itemRef.location.path.replace('Video/','') )
          var name = itemRef.location.path.replace('Video/','').replace('.mp4','')
        //   console.log(itemRef.getDownloadURL())
        fileName.push(name);
          itemRef.getDownloadURL().then(function(url){
              console.log(url)
              data1.push(url)
            //   likeNum1.push(Math.floor((Math.random() * 60) + 1))
              likeVal.push(false);
          })
        });
      }).catch(function(error) {
      });
    
    
    
    this.setState({
        data: data1,
        fileName: fileName,
        like : likeVal,
        // likeNum: likeNum1,
    })

    this.forceUpdate();
  }

  handleList = () => {
    this.forceUpdate();
  }
  
  handleLike = (i) => {
    
      console.log(i);
      console.log(Cookies.get('user'));
      

      console.log(this.state);
      this.state.like[i] = true;
      this.state.likeNum[i] = this.state.likeNum[i]+1
      this.forceUpdate();
      
      
    
  }
  handleUnLike = (i) => {
    
      console.log(i);
      this.state.like[i] = false;
      this.state.likeNum[i] = this.state.likeNum[i]-1
      this.forceUpdate();
      
    
  }

  


  getListItem() {
    
    //   const data = this.state.data;
      const { classes } = this.props;
      return (
        <div className={classes.root}>
        
        <Grid container spacing={3}>
        {
            this.state.data.map((item,index) => {
               return(
                <Grid item xs={5} className={classes.gridDiv} key={item} >
                <video className="video-container video-container-overlay" width='450'  autoPlay="" loop="" muted="" data-reactid=".0.1.0.0" controls>
                    <source type="video/mp4" data-reactid=".0.1.0.0.0" src={item}  />
                </video>
                <Typography variant='h5'>{this.state.fileName[index]}</Typography>
                <Typography variant='caption'>{this.state.likeNum[index]} Likes</Typography>
                <br></br>
                {
                    this.state.like[index]?
                    <Button style={{backgroundColor: '#e01039',}} onClick={() => this.handleUnLike(index)}>Unlike</Button>
                    :<Button style={{backgroundColor: '#0aa31e',}} onClick={() => this.handleLike(index)}>Like</Button>
                
                }
                </Grid>
               )
            })
        }
        
        </Grid>
        </div>
      )
  }

  render() {
      const data = this.state.data;
      const { classes } = this.props;
      return (
          <div>
              <center><Button className={classes.listButton} onClick={this.handleList}> Get List Of Videos</Button></center>
              {this.getListItem()}
              
          </div>
      )
  }
}

List.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(List);
