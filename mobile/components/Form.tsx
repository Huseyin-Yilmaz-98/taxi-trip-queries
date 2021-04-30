import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
type Props = {
  submit: () => void;
  children?: React.ReactNode;
  title: string;
  subTitle: string;
  buttonText?: string;
};

const Form = (props: Props) => {
  return (
    <View style={styles.formContainer}>
      <View style={styles.form}>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text style={styles.subTitleText}>{props.subTitle}</Text>
        {props.children}
        <Pressable onPress={props.submit} style={styles.button}>
          <Text style={styles.buttonText}>{props.buttonText || 'List'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#e6dfe4',
    borderRadius: 16,
    width: '100%',
  },
  button: {
    padding: 10,
    backgroundColor: '#6897a7',
    width: 100,
    borderRadius: 16,
    marginTop: 16,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 30,
    color: '#6897a7',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 20,
    color: '#32505a',
    marginBottom: 25,
    textAlign: 'center',
  },
});

export default Form;
