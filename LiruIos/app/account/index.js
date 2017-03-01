import React, { Component } from 'react';
import {
	View,
	Text,
} from 'react-native';

class Account extends Component {
	render() {
		return (<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>账户页面</Text>
			</View>
		</View>);
	}
}

const styles={
	container:{
		flex:1,
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
		fontWeight:'600'
	}
}


module.exports = { Account }