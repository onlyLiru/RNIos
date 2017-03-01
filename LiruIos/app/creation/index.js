import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from 'react-native-vector-icons/FontAwesome';
import Mock from 'mockjs';
import {
	View,
	Text,
	ListView,
	Image,
	Dimensions,
	ActivityIndicator,
	RefreshControl,
	TouchableHighlight,
} from 'react-native';
import Xhr from '../common/request.js';
var {height, width} = Dimensions.get('window');

let LISTDATA=[];

class Creation extends Component {
	constructor(props) {
		super(props);
		const self=this;
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			isLoading:false,
			isNoMoreData:false,
			isNoData:false,
			isRefreshing:false,
			page:1,
			dataSource: ds.cloneWithRows(LISTDATA)
	    };
	}

	renderRow(rowData) {
		return <TouchableHighlight><View style={styles.item}>
			<Text style={styles.listTitle}>{rowData.title}</Text>
			<Image 
				source={{uri: rowData.thumb }}
				style={styles.thumb}
			>
				<Icon style={styles.play} name="ios-play" size={35} color="#fff" />
			</Image>
			<View style={styles.itemFooter}>
				<View style={styles.handleBox}>
					<Icon name="ios-heart-outline" style={styles.up} />
					<Text style={styles.handleText}>喜欢</Text>
				</View>
				<View style={styles.handleBox}>
					<Icon style={styles.comment} name="ios-chatboxes-outline" />
					<Text style={styles.handleText}>评论</Text>
				</View>
			</View>
		</View></TouchableHighlight>
	}

	render() {
		return (<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>视频列表</Text>
			</View>
			<ListView
	          dataSource={this.state.dataSource}
	          renderRow={this.renderRow}
	          automaticallyAdjustContentInsets={false}
	          onEndReached={ this._fetchMoreData.bind(this) }
	          onEndReachedThreshold={ 20 }
	          renderFooter={ 
	          	()=> {
	          		let footActivity=null;
	          		if(this.state.isNoData){
	          			footActivity=<View><Text style={{textAlign:'center',paddingBottom:20,paddingTop:40,color:'#999'}}>暂无数据</Text></View>;
	          		}else{
		          		if(this.state.isNoMoreData){
		          			footActivity=<View><Text style={{textAlign:'center',paddingBottom:20,color:'#999'}}>没有更多了</Text></View>;
		          		}else{
			          		footActivity= <ActivityIndicator
						        style={{height: 80}}
						    />;
		          		};
	          		}
	          		 
		          	return footActivity
		        } 
		      }
		      enableEmptySections={true}
		      refreshControl={
		          <RefreshControl
		            refreshing={this.state.isRefreshing}
		            onRefresh={this._onRefresh.bind(this)}
		            tintColor="#ff0000"
		            title="拼命加载中..."
		            titleColor="#f60"
		            colors={['#ff0000', '#00ff00', '#0000ff']}
		            progressBackgroundColor="#ffff00"
		          />
		      }
	        />
		</View>);
	}
	componentDidMount(){
		this._fetchData();
	}
	_fetchData(){
		const self=this;
		Xhr.get({
			url:'http://rap.taobao.org/mockjs/14526/api/creations',
			params:{
				accessToken:'111abc',
				name:'liru'
			}
		})
		.then((data) => {
			if(data.success){
				if(self.state.isRefreshing){
					LISTDATA=data.data;
				}else{
					LISTDATA=LISTDATA.concat(data.data);
				};
				if(!data.data.length){
					self.setState({
						isNoData:true,
					});
					return;
				}
				self.setState({
					dataSource:self.state.dataSource.cloneWithRows(LISTDATA),
					isLoading:false,
					isRefreshing:false,
					page:self.state.page+1,
				});
			}
		})
		.catch((error) => {
			console.error(error);
		});
	}
	_fetchMoreData(){
		const self=this;
		this.setState({
			isLoading:true
		});
		if(this.state.isLoading || this.state.isNoMoreData || this.state.isNoData){
			return;
		};
		if(this.state.page>=2){
			this.setState({
				isNoMoreData:true
			});
		}
		this._fetchData();
	}
	_onRefresh() {
		this.setState({
			isRefreshing:true,
		});
		this._fetchData();
	}
	
}

const styles={
	container:{
		flex:1,
		paddingBottom:40,
	},
	header:{
		backgroundColor:'#ee735c',
		paddingTop:25,
		paddingBottom:12,
	},
	headerTitle:{
		textAlign:'center',
		color:'#fff',
		fontSize:16,
		fontWeight:'600',
	},
	item:{
		width:width,
		marginBottom:10,
		backgroundColor:'#fff',
	},
	thumb:{
		width:width,
		height:width/2,
		resizeMode:'cover',
	},
	listTitle:{
		padding:10,
		fontSize:14,
		color:'#333',
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
	itemFooter:{
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
		backgroundColor:'#eee',
		borderBottomWidth:1,
		// borderBottomStyle:'solid',
		borderBottomColor:'#eee',
	},
	handleBox:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		padding:10,
		width:width / 2 - 1,
		backgroundColor:'#fff'
	},
	handleText:{
		fontSize:12,
		color:'#333',
	},
	up:{
		fontSize:22,
		color:'#333',
		marginRight:6,
	},
	comment:{
		fontSize:22,
		color:'#333',
		marginRight:6,
	}
}


module.exports = { Creation }