import React, { useEffect, useRef, } from 'react';

import { useField } from '@unform/core';

import { TextInput, Text } from 'react-native';
import styles from './styles';

type InputProps = {
  name: string,
  masks: string[],
  customStyle: {}
}

const textInput = ({ name, masks, customStyle, ...props }: InputProps | any) => {

  const inputRef = useRef<any>(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    inputRef.current && (inputRef.current.value = defaultValue)
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      // path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
      },
      getValue: (ref) => ref.value
    });
  }, [fieldName, registerField]);

  return (
    <>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        ref={inputRef}
        defaultValue={defaultValue}
        keyboardAppearance="dark"
        style={{ ...styles.input, ...customStyle }}
        onChangeText={(v) => inputRef.current.value = v}
        {...props}
      />
    </>
  )

}

export default textInput;
