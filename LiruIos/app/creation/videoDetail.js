
import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
	View,
	Text,
	Dimensions,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
let Video = require('react-native-video').default;
var {height, width} = Dimensions.get('window');

const  CommentList = require('./comment.js');

class VideoDetail extends Component {
	constructor(props) {
		super(props);
		this.state={
			data:this.props.row,
			isLoading:true,
			isPlaying:false,
			paused:false,
			progressBarWidth:2,
		}
	}
	render() {
		let data = this.state.data;
		let videoUrl=data.video;
		let title=data.title;
		let thumb=data.thumb;
		return (<View style={styles.container}>
					<View style={styles.header}>
						<TouchableOpacity onPress={this._pop.bind(this)} style={styles.backBox}>
							<Icon name="ios-arrow-back" style={styles.backIcon} />
							<Text style={styles.backText}>返回</Text>
						</TouchableOpacity>
						<Text style={styles.headerTitle}>
							视频播放
						</Text>
					</View>
					<View style={styles.videoContains}>
						<Video
							source={{
								uri: videoUrl
							}}
							ref='myVideo'
							rate={1.0} // 0暂停,1播放
							volume={1.0} //声音的放大倍数1-5
							muted={false} //是否静音
							paused={this.state.paused} //是否直接播放
							resizeMode="cover" // 视频拉伸方式cover,contain
							repeat={false}  //是否重复播放
							playInBackground={false}
							playWhenInactive={false}
							progressUpdateInterval={250.0}
							onLoadStart={this._loadStart.bind(this)} //开始加载
							onLoad={this._onLoad.bind(this)} //播放中会不断调用
							onProgress={this._onProgress.bind(this)} //每隔250毫秒调用一次
							onEnd={this._onEnd.bind(this)} //播放结束
							onError={this._onError.bind(this)} //视频出错
							onBuffer={this._onBuffer} //
							onTimedMetadata={this._onTimedMetadata} //
							style={styles.backgroundVideo} //
						/>
						{
							this.state.isLoading ? <ActivityIndicator style={styles.loading} /> : null
						}
						{
							(!this.state.isLoading && !this.state.isPlaying)
							? <Icon onPress={this._replay.bind(this)} style={styles.play} name="ios-play" size={35} color="#fff" /> : null
						}
						{
							(!this.state.isLoading && this.state.isPlaying)
							?   <TouchableOpacity onPress={this._paused.bind(this)} style={styles.pausedTouch}>
									{ this.state.paused 
										?
											<Icon onPress={this._play.bind(this)} style={styles.playCenter} name="ios-play" size={35} color="#fff" />
										:
											<Text></Text>
									}
								</TouchableOpacity>
							: null
						}
						<View style={styles.progressBox}>
							<View style={[styles.progressBar,{ width:this.state.progressBarWidth }]}></View>
						</View>
					</View>
					<Text style={styles.videoTitle}>{ title }</Text>
					<CommentList data={ data } />
				</View>
		);
	}

	_pop() {
		this.props.navigator.pop();
	}

	_loadStart() {
		console.log('_loadStart');
	}
	_onLoad() {
		this.setState({
			isLoading:false,
			isPlaying:true,
		});
		console.log('_onLoad');
	}
	_onProgress(data) {
		let {
			playableDuration,
			currentTime,
		} = data;
		this.setState({
			progressBarWidth:Number((currentTime / playableDuration * width).toFixed(2))
		});
	}
	_paused() {
		this.setState({
			paused:!this.state.paused,
		});
	}
	_play(){
		this.setState({
			paused:!this.state.paused,
		});
	}
	_onEnd() {
		this.setState({
			isPlaying:false,
		})
	}
	_onError() {
		console.log('onError');
	}
	_replay() {
		this.refs.myVideo.seek(0);
		this.setState({
			isPlaying:true,
		});
	}
}

const styles={
	container:{
		flex:1,	
	},
	header:{
		paddingTop:25,
		paddingBottom:12,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		width:width,
		backgroundColor:'#fff'
	},
	backBox:{
		position:'absolute',
		left:12,
		top:25,
		width:50,
		height:50,
		flexDirection:'row',
	},
	headerTitle:{
		color:'#333'
	},
	backText:{
		color:'#666'
	},
	backIcon:{
		fontSize:20,
		marginRight:5,
		position:'relative',
		top:-2,
		color:'#666',
	},
	videoContains:{
		backgroundColor:'#000',
	},
	
	backgroundVideo:{
		width:width,
		height:width*0.56,
	},
	loading:{
		width:80,
		height:80,
		position:'absolute',
		left:width/2 - 40,
		top:width*0.75 /2 - 70
	},
	progressBox:{
		width:width,
		height:2,
		backgroundColor:'#000'
	},
	progressBar:{
		width:2,
		height:2,
		backgroundColor:'#f60'
	},
	videoTitle:{
		padding:10
	},
	play:{
		position:'absolute',
		right:14,
		bottom:14,
		width:46,
		height:46,
		paddingLeft:18,
		paddingTop:4,
		borderRadius:23,
		borderWidth:1,
		borderColor:'#fff',
		color:'#ed7b66',
		backgroundColor:'transparent',
	},
	playCenter:{
		position:'absolute',
		left:width/2 - 23,
		top:width*0.75 / 2 -60,
		width:46,
		height:46,
		paddingLeft:18,
		paddingTop:4,
		borderRadius:23,
		borderWidth:1,
		borderColor:'#fff',
		color:'#ed7b66',
		backgroundColor:'transparent',
	},
	pausedTouch:{
		width:width,
		height:width*0.56,
		position:'absolute',
		left:0,
		top:0,
	},
}


module.exports = VideoDetail