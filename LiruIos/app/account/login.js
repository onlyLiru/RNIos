import React,{ Component } from 'react';
import {
	View,
	Text,
	TextInput,
	AlertIOS,
	Image,
} from 'react-native';
import Button from 'react-native-button';
import { CountDownText } from '../common/counter.js';
const Xhr= require('../common/request.js');

class Login extends Component {
	constructor(props) {
		super(props);
		this.state={
			phone:'',
			code:'',
			isReceivedCode:false
		}
	}
	render() {
		return (<View style={styles.container}>
			<View style={styles.titleBox}>
				<View style={styles.logo}>
					<Image 
						source={{
							uri:'http://img.fancyedu.com/sys/ic/operation/1488958273316_timg.jpg'
						}}
						style={{
							width:180,
							height:140,
						}}
					/>
				</View>
			</View>
			<View style={{padding:10}}>
				<TextInput
					placeholder="请输入手机号"
					autoFocus={true}
					keyboardType='numeric'
					maxLength={11}
					clearButtonMode='while-editing'
					onChangeText={ (text)=>{
						this.setState({
							phone:text
						});
					} }
					style={[styles.input,styles.phoneInput]}
				/>
						<View style={styles.codeInputBox}>
							<View style={styles.codeInputItem1}>
								<TextInput
									placeholder="请输入验证码"
									maxLength={11}
									autoCorrect={false}
									clearButtonMode='while-editing'
									autoCapitalize='none'
									onChangeText={ (text)=>{
										this.setState({
											code:text
										});
									} }
									style={[styles.input,styles.codeInput]}
								/>
							</View>
							<View  style={ styles.codeInputItem2 }>
								{
									this.state.isReceivedCode ? 
										<CountDownText
								            countType='seconds'
								            auto={true}
								            afterEnd={() => {
								            	this.setState({
								            		isReceivedCode:false
								            	});
								            }}
								            timeLeft={60}
								            step={-1}
								            startText='获取验证码'
								            endText='重新获取验证码'
								            intervalText={(sec) => sec + '秒重新获取'}
								        />
									: <Text></Text>
								}
							</View>
						</View>
				{
					this.state.isReceivedCode ? 
						<Button
					        containerStyle={{
					        	padding:10, 
					        	height:35, 
					        	overflow:'hidden', 
					        	backgroundColor: '#f60'
					        }}
							style={{
								fontSize: 16, 
								color: '#fff'
							}}
					        onPress={ this._login.bind(this) }>
					        登 录
					    </Button>
					: 
						<Button
					        containerStyle={{
					        	padding:10, 
					        	height:35, 
					        	overflow:'hidden', 
					        	backgroundColor: '#f60',
					        }}
							style={{
								fontSize: 16, 
								color: '#fff'
							}}
					        onPress={ this._getCode.bind(this) }>
					        获取验证码
					    </Button>
				}
			</View>
		</View>)
	}
	_getCode() {
		const self=this;
		if(!this.state.phone){
			AlertIOS.alert('请输入手机号!');
			return;
		}
		Xhr.post({
			url:'http://rap.taobao.org/mockjsdata/14526/api/getCode',
			data:{
				phone:self.state.phone
			}
		})
		.then((data)=>{
			// self.setState({
			// 	code:data.data.code
			// });
		})
		.catch((err)=>{
			console.log(err);
		});
		this.setState({
			isReceivedCode:true,
		});
	}
	_login() {
		const self=this;
		const phone = this.state.phone;
		const code = this.state.code;
		const param ={
			phone:phone,
			code:code,
		}
		if(!phone || !code){
			AlertIOS.alert('用户名或验证码不能为空!');
			return;
		};
		Xhr.post({
			url:'http://rap.taobao.org/mockjsdata/14526/api/login',
			params:param
		})
		.then((data)=>{
			if(data.success) {
				self.props.afterLogin(data.data);
			}
		})
		.catch((err)=>{
			console.log(err);
		});
	}
};

const styles= {
	container:{
		flex:1,
		// backgroundColor:'#eee'
	},
	titleBox:{
		paddingTop:45,
		paddingBottom:32,
		// backgroundColor:'#f60',
		// borderBottomWidth:1,
		// borderBottomColor:'#ccc',
		// marginBottom:20,
	},
	logo:{
		flexDirection:'row',
		justifyContent:'center',
		
	},
	titleText:{
		textAlign:'center',
		fontWeight:'600',
		fontSize:18,
		// backgroundColor:'#f00'
	},
	phoneInput:{
		marginBottom:10,
	},
	input:{
		backgroundColor:'#fff',
		padding:5,
		height:36,
		borderRadius:2,
		fontSize:14,
	},
	codeInputBox:{
		flexDirection:'row',
		justifyContent:'space-between',
		marginBottom:15,
		paddingTop:10,
		borderTopWidth:1,
		borderTopColor:'#f2f2f2'
	},
	codeInputItem1:{
		flex:2,
		marginRight:10,
	},
	codeInputItem2:{
		flex:1,
		paddingTop:10
	},
	codeInput:{
		// height:40,
		// backgroundColor:'#f00'
	},
	countDown:{
		lineHeight:40,
	}
}

module.exports = { Login };