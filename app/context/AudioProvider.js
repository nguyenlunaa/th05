import React, { Component, createContext } from 'react'
import { Text, View, Alert } from 'react-native'
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';

export const AudioContext = createContext()
export class AudioProvider extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            audioFiles: [],
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2)
        };
    }

    permissionAllert = () => {
        Alert.alert("Permission Required", "This app need to read audio files!",[{
            text: 'I am ready',
            onPress: () => this.getPermission()
        },{
            text: 'cancle',
            onPress: () => this.permissionAllert()
        }])
    }

    getAudioFiles = async () => {
        const {dataProvider, audioFiles} = this.state
        let media =  await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
        });
        media =  await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
        });
        this.setState({...this.state, dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]), audioFiles: [...audioFiles, ...media.assets]})
    };

    getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync()
        if(permission.granted){
            //we want to get all the radio files
            this.getAudioFiles()
        }

        if(!permission.canAskAgain && !permission.granted){
            this.setState({...this.state, permissionError: true});
        }

        if(!permission.granted && permission.canAskAgain){
            const{status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
            if(status === 'denied' && canAskAgain){
                // we can going to display alert that user must allow this permission to work this app
                this.permissionAllert()
            }
            if(status === 'granted'){
                //we want to get all the radio files
                this.getAudioFiles();
            }

            if(status === 'denied' && !canAskAgain){
                // we want to display some error to the user
                this.setState({...this.state, permissionError: true});
            }
        }
    }

    componentDidMount(){
        this.getPermission()
    }

  render() {
    const {audioFiles, dataProvider, permissionError} = this.state
    if(permissionError) return <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
    }>
        <Text style={{fontSize: 25, textAlign: 'center', color: 'red'}}>It looks like you haven't accept the permission.</Text>
    </View>
    return <AudioContext.Provider value={{ audioFiles, dataProvider  }}>
        {this.props.children}
    </AudioContext.Provider>
  }
}

export default AudioProvider
