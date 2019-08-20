import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
  },
  text: {
    color: theme.colors.green,
  },
});

export function FailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Dude! Help me to help you! Go back and give me permission to access your
        camera
      </Text>
    </View>
  );
}
