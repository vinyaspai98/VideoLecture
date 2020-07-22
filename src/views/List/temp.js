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

class List extends React.Component {
 

    getData = () =>{
        let data=[];
        let fileName=[];
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

          return data;
    }
  state = {
      open: [],
      load: false,
      data: this.getData(),
      fileName: [],
      
  };

  
    
    //   this.setState(prevState => ({data: [...prevState.data, ...data]}));

      

//   componentDidMount(){
//     let data=[];
//     let fileName=[];
//     listRef.listAll().then(function(res) {
//         // res.prefixes.forEach(function(folderRef) {
    
//         //   console.log(folderRef)
//         // });
//         res.items.forEach(function(itemRef) {
//           console.log(itemRef)
//           console.log(itemRef.location.path.replace('Video/','') )
//           var name = itemRef.location.path.replace('Video/','').replace('.mp4','')
//         //   console.log(itemRef.getDownloadURL())
//         fileName.push(name);
//           itemRef.getDownloadURL().then(function(url){
//               console.log(url)
//               data.push(url)
//           })
//         });
//       }).catch(function(error) {
//         // Uh-oh, an error occurred!
//       });
    
//       this.setState({
//           data:data,
//           fileName:fileName,
          
//       });
//   }

  
  handleLike = (i) => {
      console.log(this.state.data);
      console.log(this.state.fileName);
      
    //   const NewSeeMore = JSON.parse(JSON.stringify(this.state.seeMore));
    //   NewSeeMore[i] = !NewSeeMore[i];
    //   if(NewSeeMore[i] === true) {
    //       NewSeeMore[0] = 'See less...';
    //   } else {
    //       NewSeeMore[0] = 'See more...';
    //   }
    //   this.setState({
    //       seeMore: NewSeeMore,
    //   });
  }

  



  getListItem() {
    
    //   const data = this.state.data;
      const { classes } = this.props;
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
        </div>
      );
  }

  render() {
      const data = this.state.data;
      return (
          <div>
              
              {this.getListItem()}
              {
        this.state.data.map((item,index) => {

            console.log('item log   ');
            console.log(item);
            
        return(
        <h3 key={index+10}>hii</h3>
        )
        })
        
    }
          </div>
      );
  }
}

List.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(withRouter(List));
