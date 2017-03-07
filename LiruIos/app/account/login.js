import React,{ Component } from 'react';
import {
	View,
	Text,
	TextInput,
} from 'react-native';
import Button from 'react-native-button';
// var CountDown = require('react-native-countdown');

const Login = React.createClass({
	render() {
		return (<View style={styles.container}>
			<View style={styles.titleBox}>
				<Text style={styles.titleText}>登 录</Text>
			</View>
			<View style={{padding:10}}>
				<TextInput
					placeholder="请输入手机号"
					style={[styles.input,styles.phoneInput]}
				/>
				<View style={styles.codeInputBox}>
					<View style={styles.codeInputItem1}>
						<TextInput
							placeholder="请输入验证码"
							style={[styles.input,styles.codeInput]}
						/>
					</View>
					<View  style={styles.codeInputItem2}>
						<Text style={styles.countDown}>倒计时60</Text>
						
					</View>
				</View>
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
			        onPress={ ()=>{ } }>
			        提交
			    </Button>
			</View>
		</View>)
	}
});

const styles= {
	container:{
		flex:1,
		backgroundColor:'#eee'
	},
	titleBox:{
		paddingTop:25,
		paddingBottom:12,
		// backgroundColor:'#ff0',
		// borderBottomWidth:1,
		// borderBottomColor:'#ccc',
		// marginBottom:20,
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
		borderWidth:1,
		borderColor:'#dfdfdf',
		padding:5,
		height:36,
		borderRadius:2,
	},
	codeInputBox:{
		flexDirection:'row',
		justifyContent:'space-between',
		marginBottom:15,
	},
	codeInputItem1:{
		flex:3,
		marginRight:10,
	},
	codeInputItem2:{
		flex:1,
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