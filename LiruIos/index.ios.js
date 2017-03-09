/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'; 

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView, 
  TabBarIOS,
  Image,
  ListView,
  Navigator,
  AlertIOS,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from 'react-native-vector-icons/FontAwesome';
import Storage from 'react-native-storage';

const  Creation = require('./app/creation/index.js');
import { Edit } from './app/edit/index.js';
import { Account } from './app/account/index.js';
import { Login } from './app/account/login.js';


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


export default class LiruIos extends Component {
    constructor(props){
      super(props);
      const self=this;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        selectedTab:'account',
        isLogin:false,
      };
    }
    render() {
      if(!this.state.isLogin){
        return <Login afterLogin={this._afterLogin.bind(this)} />
      }
      return (
        <TabBarIOS 
          tintColor="#a52a2a"
          translucent={true}
        >
          <Icon.TabBarItem
            iconName="ios-videocam-outline"
            selectedIconName="ios-videocam-outline"
            selected={this.state.selectedTab === 'list'}
            onPress={ 
              () => {
                this.setState({
                  selectedTab:'list'
                });
              } 
            }
          >
            <Navigator
              initialRoute={{ 
                name: 'Creation', 
                component: Creation 
              }}
              configureScene={(route) => {
                return Navigator.SceneConfigs.FloatFromRight;
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={ navigator } />
              }}
            />
          </Icon.TabBarItem>
          <Icon.TabBarItem
            iconName="ios-recording-outline"
            selectedIconName="ios-recording-outline"
            selected={this.state.selectedTab === 'edit'}
            onPress={ 
              () => {
                this.setState({
                  selectedTab:'edit'
                });
              } 
            }
          >
            <Edit />
          </Icon.TabBarItem>
          <Icon.TabBarItem
            iconName="ios-more-outline"
            selectedIconName="ios-more-outline"
            selected={this.state.selectedTab === 'account'}
            onPress={ 
              () => {
                this.setState({
                  selectedTab:'account'
                });
              } 
            }
          >
            <Account />
          </Icon.TabBarItem>
        </TabBarIOS>
      );
    }
    componentWillMount() {
      this._getLoginMes();
    }
    _getLoginMes() {
      const self=this;
      storage.load({
          key: 'user',
          autoSync: true,
          syncInBackground: true,
      }).then(ret => {
          // console.log(ret);
          if(ret.accessToken){
            self.setState({
              isLogin:true
            });
          };
      }).catch(err => {
          console.log(err);
      });
    }
    _afterLogin(data) {
      // console.log(data);
      storage.save({
          key: 'user',
          rawData: data,
      });

      this.setState({
        isLogin:true,
      });
    }

}

AppRegistry.registerComponent('LiruIos', () => LiruIos);
