import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
} from 'react-native';
var {height, width} = Dimensions.get('window');

class Account extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		}
	}
	render() {
		return (<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>账户页面</Text>
			</View>
			<View>
				<Image 
					source={{
						uri:'http://img.fancyedu.com/sys/ic/operation/1487148709564_di.png'
					}}
					style={{
						flexDirection:'row',
						justifyContent:'center',
						alignItems:'center',
						width:width,
						height:width * 0.5,
						backgroundColor:'transparent',
					}}
				>
					<View>
						<Image
							source={
								{
									uri:'http://img.fancyedu.com/sys/ic/operation/1463364943989_defaul.png'
								}
							}
							style={{
								width:width*0.24,
								height:width * 0.24,
								borderWidth:1,
								borderColor:'#fff',
								borderRadius:width*0.3 / 2,
								marginBottom:10,
							}}
						/>
						<Text style={{
							color:'#fff',
							fontSize:12,
							textAlign:'center',
						}}>戳这里上传头像</Text>
					</View>
				</Image>
			</View>
		</View>);
	}
}

const styles={
	container:{
		flex:1,
	},
	header:{
		backgroundColor:'#fff',
		paddingTop:25,
		paddingBottom:12,
	},
	headerTitle:{
		color:'#444',
		textAlign:'center',
		fontSize:14,
		fontWeight:'600'
	}
}


module.exports = { Account }