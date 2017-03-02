

import React, { Component } from 'react';
import {
	View,
	Text,
	Dimensions,
} from 'react-native';
let Video = require('react-native-video').default;
var {height, width} = Dimensions.get('window');

class VideoDetail extends Component {
	render() {
		let row = this.props.row;
		const videoUrl=row.video;
		console.log(Video);
		return (<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>视频播放</Text>
			</View>
			<View style={styles.videoContains}>
				<Video
					source={{
						uri: videoUrl
					}}                                   
					rate={1.0}                            
					volume={1.0}                          
					muted={false}                         
					paused={false}                        
					resizeMode="cover"                    
					repeat={true}                         
					playInBackground={false}              
					playWhenInactive={false}              
					progressUpdateInterval={250.0}        
					onLoadStart={this.loadStart}          
					onLoad={this.setDuration}             
					onProgress={this.setTime}             
					onEnd={this.onEnd}                    
					onError={this.videoError}             
					onBuffer={this.onBuffer}              
					onTimedMetadata={this.onTimedMetadata}
					style={styles.backgroundVideo} 
				/>
				<Text onPress={ ()=>{
					this.props.navigator.pop()
				} } style={styles.videoTitle}>{ row.title }</Text>
			</View>
		</View>);
	}
}

const styles={
	container:{
		flex:1,
		backgroundColor:'#fff'
	},
	header:{
		backgroundColor:'#d2b48c',
		paddingTop:25,
		paddingBottom:12,
	},
	headerTitle:{
		color:'#fff',
		textAlign:'center',
		fontSize:16,
		fontWeight:'600',
	},
	videoContains:{
		backgroundColor:'#000',
		padding:10,
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	videoTitle:{
		color:'#fff',
		marginTop:10,

	},
	backgroundVideo:{
		width:width,
		height:width*0.75,
	}
}


module.exports = VideoDetail