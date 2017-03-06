import Icon from 'react-native-vector-icons/Ionicons';
import React,{ Component } from 'react';
import Button from 'react-native-button';
import {
	ScrollView,
	ListView,
	Text,
	View,
	Image,
	Dimensions,
	TextInput,
	ActivityIndicator,
	TouchableOpacity,
	AlertIOS,
	Modal,
	TouchableHighlight,
} from 'react-native';
import Xhr from '../common/request.js';
let {height, width} = Dimensions.get('window');

let LISTDATA=[];
class CommentList extends Component {
	constructor (props){
		super(props);
		const ds=new ListView.DataSource({
			rowHasChanged: (r1,r2) => r1 !== r2
		});
		this.state={
			data:this.props.data,
			dataSource:ds.cloneWithRows(LISTDATA),
			isLoading:false,
			hasNoData:false,
			modalVisible:false,

			textContent:'',
		}
	}
	_renderRow(d) {
		return (
			<View>
				<View style={styles.commentBox}>
					<Image 
						source={{uri:d.portrait}}
						style={styles.portrait}
					/>
					<View style={styles.comentMain}>
						<View style={styles.commentHead}>
							<Text style={styles.commentNickname}>{d.nickname}</Text>
							<Text style={styles.commentTime}>{d.date}</Text>
						</View>
						<View style={styles.commentContentBox}>
							<Text style={styles.commentContent}>{d.content}</Text>
						</View>
					</View>
				</View>
			</View>
		);
	}
	_setFooter() {
		let footerHtml = <ActivityIndicator style={{height: 80}} />;
		
		return(<View>{ footerHtml }</View>);
	}
	_setHeader() {
		return (<View style={styles.listHeader}>
			<TouchableOpacity onPress={this._setModalVisible.bind(this)}>
				<Text style={styles.input}>
					敢不敢评论一下...
				</Text>
			</TouchableOpacity>
			<Text style={styles.listHeaderTitle}>精彩评论:</Text>
		</View>);
	}
	render() {
		const self=this;
		const data=this.state.data;
		return (<View>
			<ListView
	          dataSource={this.state.dataSource}
	          renderRow={this._renderRow.bind(this)}
	          onEndReached={ this._fetchMoreData.bind(this) }
	          onEndReachedThreshold={ 20 }
	          renderFooter={ this._setFooter.bind(this) }
	          renderHeader={ this._setHeader.bind(this) }
	          automaticallyAdjustContentInsets={false}
		      enableEmptySections={ true }
		      style={{marginBottom:30}}
	        />
	        <Modal
	          animationType={"slide"}
	          transparent={false}
	          visible={ this.state.modalVisible }
	          >
		        <View style={modalStyle.modalBox}>
		        	<View style={modalStyle.closeModalIconBox}>
		        		<Icon 
		        			name="ios-close-outline" 
		        			style={ modalStyle.closeModalIcon } 
		        			onPress={ () => {
		        				this._setModalVisible(false)
		        			} }
		        		/>
		        	</View>
		        	<TextInput
		        		multiline={true}
		        		placeholder="说几句吧..."
		        		defaultValue={this.state.textContent}
		        		onChangeText={(text)=>{ 
		        			this.setState({
		        				textContent:text
		        			})
		        		}}
		        		style={modalStyle.input}
		        	/>
		        	<Button
				        containerStyle={{
				        	padding:10, 
				        	height:35, 
				        	overflow:'hidden', 
				        	borderRadius:4, 
				        	backgroundColor: '#f60'
				        }}
    					style={{
    						fontSize: 16, 
    						color: '#fff'
    					}}
				        onPress={ this._submit.bind(this) }>
				        提交
				    </Button>
		      	</View>
	        </Modal>
        </View>);
	}
	componentDidMount() {
		this._getComments()
	}
	_getComments() {
		const self=this;
		/*如果正在加载中,就不要重复发请求*/
		this.setState({
			isLoading:true,
		});
		Xhr.get({
			url:'http://rap.taobao.org/mockjs/14526/api/getComments',
			params:{
				accessToken:'asdf'
			}
		})
		.then((data)=>{
			if(data && data.success){
				if(data.data && data.data.length>0){
					LISTDATA = LISTDATA.concat(data.data);
					self.setState({
						dataSource:self.state.dataSource.cloneWithRows(LISTDATA),
						isLoading:false,
					});
				}else{
					self.setState({
						hasNoData:true,
					});
				}
			}
		})
		.catch((error)=>{
			console.log(error);
		});
	}
	_fetchMoreData() {
		if(this.state.isLoading){
			return;
		};
		this._getComments();
	}
	_setModalVisible(visible) {
		this.setState({
			modalVisible:visible
		});
	}
	_submit() {
		const self=this;
		let text=this.state.textContent;
		if(!text){
			AlertIOS.alert('评论内容不能为空...');
			return;
		};
		self.setState({
			isSending:true,
		});
		Xhr.post({
			url:'http://rap.taobao.org/mockjsdata/14526/api/comment',
			params:{
				content:this.state.textContent,
				videoId:this.state.data.id,
			}
		})
		.then((data)=>{
			if(data && data.success){
				let newData=data.data;
				newData[0].content=self.state.textContent;
				LISTDATA=(data.data).concat(LISTDATA);
				self.setState({
					dataSource:self.state.dataSource.cloneWithRows(LISTDATA),
					isSending:false,
					modalVisible:false,
					textContent:'',
				});
			}
		});
	}
};

const modalStyle={
	modalBox:{
		flex:1,
		paddingTop:45,
		padding:20,
	},
	closeModalIconBox:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		marginBottom:20,
	},
	closeModalIcon:{
		fontSize:30,
	},
	input:{
		borderWidth:1,
		borderColor:'#f2f2f2',
		height:80,
		padding:10,
		fontSize:14,
		marginBottom:20,
	}
};

const styles={
	commentBox:{
		flex:1,
		flexDirection:'row',
		padding:10,
		marginBottom:10,
	},
	portrait:{
		width:60,
		height:60,
		marginRight:10,
		marginBottom:10,
		borderRadius:30,
	},
	comentMain:{
		flex:1,
		borderBottomWidth:1,
		borderBottomColor:'#f2f2f2',
		paddingBottom:10,
	},
	commentHead:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		marginBottom:10,
	},
	commentContentBox:{

	},
	commentContent:{
		fontSize:14,
		lineHeight:16,
	},
	commentNickname:{
		color:'#999',
		fontSize:14,
	},
	commentTime:{
		color:'#999',
		fontSize:14,
	},
	listHeader:{
		padding:10,
	},
	input:{
		padding:6,
		height:50,
		fontSize:12,
		borderWidth:1,
		borderColor:'#f2f2f2',
		color:'#999',
		borderRadius:4,
		marginBottom:10,
		flexDirection:'row',
		alignItems:'flex-start',
		justifyContent:'flex-start',
	},
	listHeaderTitle:{
		color:'#666',
		fontSize:14,
	}
}

module.exports= CommentList;
