import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TouchableHighlight} from "react-native-gesture-handler";
import {theme} from "../../theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: theme.colors.backgroundGrey,
        alignItems: 'center',
    },
    scanButtonView: {
        marginTop: 150,
        marginBottom: 30,
    },
    scanButton: {
        height: 100,
        width: 200,
    },
    photoGalleryButton: {
        height: 100,
        width: 200,
    },
});

export class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.scanButtonView}>
                    <TouchableHighlight onPress={() => {}}>
                        <Image
                            style={styles.scanButton}
                            source={require('../../../assets/images/scanButton.png')}
                        />
                    </TouchableHighlight>
                </View>
                <TouchableHighlight onPress={() => {}}>
                    <Image
                        style={styles.photoGalleryButton}
                        source={require('../../../assets/images/photoGalleryButton.png')}
                    />
                </TouchableHighlight>
            </View>
        )
    }
}