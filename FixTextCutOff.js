import React from 'react';
 
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: 'Droid Sans',
  },
});

export default function fixOppoTextCutOff() {
  const oldRender = Text.render;
  Text.render = function render(...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.defaultFontFamily, origin.props.style],
    });
  };
}