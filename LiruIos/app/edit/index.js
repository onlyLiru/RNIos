import React, { Component } from 'react';
import {
	View,
	Text,
} from 'react-native';

class Edit extends Component {
	render() {
		return (<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>制作页面</Text>
			</View>
		</View>);
	}
}

const styles={
	container:{
		flex:1
	},
	header:{
		backgroundColor:'#f4a460',
		paddingTop:25,
		paddingBottom:12,
	},
	headerTitle:{
		color:'#fff',
		fontSize:16,
		textAlign:'center',
		fontWeight:'600'
	}
}


module.exports = { Edit }