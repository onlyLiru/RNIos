/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from 'react-native-vector-icons/FontAwesome';

import { Creation } from './app/creation/index.js';
import { Edit } from './app/edit/index.js';
import { Account } from './app/account/index.js';


export default class LiruIos extends Component {
    constructor(props){
      super(props);
      const self=this;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        selectedTab:'list',
      };
    }
    render() {
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
            <Creation />
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

}

AppRegistry.registerComponent('LiruIos', () => LiruIos);
