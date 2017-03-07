import React, { Component } from 'react';
import {
	View,
	Text,
	AsyncStorage,
} from 'react-native';
import Storage from 'react-native-storage';
var storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是写到另一个文件里，这里require引入
  // 或是在任何时候，直接对storage.sync进行赋值修改
  sync: ()=>{
  	console.log('sync');
  }
});
global.storage = storage;

class Account extends Component {
	constructor(props) {
		super(props);
		this.state={
			age:0
		}
	}
	render() {
		// storage.save({
		//     key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
		//     rawData: { 
		//       age:this.state.age
		//     },
		// });
		// storage.load({
		//     key: 'loginState',
		//     autoSync: true,
		//     syncInBackground: true,
		// }).then(ret => {
		//     console.log(ret);
		//     let age=ret.age+1;
		//     storage.save({
		//         key: 'loginState',
		//         rawData: { 
		//           age:age
		//         },
		//     });
		//     // this.setState({
		//     // 	age:age
		//     // });
		// }).catch(err => {
		//     console.log(err.message);
		// });
		return (<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>账户页面</Text>
			</View>
			<View><Text>我今年已经{ this.state.age }岁了!!</Text></View>
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