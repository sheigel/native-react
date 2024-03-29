'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json'

var AwesomeProject = React.createClass({
   getInitialState: function () {
      return {
         dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
         }),
         loaded: false,
      }
   },
   componentDidMount: function(){
      console.log('componentDidMount')
      this.fetchData();
   },
   fetchData: function () {
      fetch(REQUEST_URL)
         .then((response) => response.json())
         .then((responseData) => {
            console.log('response received')
            this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
               loaded: true,
            })
         })
         .done()
   },
  render: function() {
     if(!this.state.loaded){
        return this.renderLoadingView()
     }
     return (
        <ListView
           dataSource={this.state.dataSource}
           renderRow={this.renderMovie}
           style={styles.listView}
           />
     )
  },
  renderLoadingView:function () {
     return(
        <View style={styles.container}>
           <Text>
             Loading movies...
           </Text>
        </View>
     )
  },
  renderMovie: function (movie) {
    return (
      <View style={styles.container}>
         <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail}/>
         <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
         </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail:{
     width: 53,
     height:81
 },
 rightContainer:{
    flex:1,
},
listView:{
   paddingTop:20,
   backgroundColor: '#F5FCFF',
},
title:{
   fontSize: 20,
   marginBottom: 8,
   textAlign: 'center',
},
year:{
   textAlign: 'center'
}
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
