import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';
import { Formik } from 'formik';
import * as Yup from 'yup';

const feedbackValidationSchema = Yup.object().shape({
  feedback: Yup.string().required('Feedback is required'),
});



const FeedbackScreen = () => {
    const handleSubmit = async (values) => {
        try {
          const response = await apiService.submitFeedback(values);
          if (response.success) {
            Alert.alert('Success', 'Feedback submitted successfully!');
            values.feedback = ''; // Clear the form
          } else {
            Alert.alert('Error', 'Failed to submit feedback.'); // Or a more specific error
          }
        } catch (error) {
          console.error('Feedback submission error:', error);
          Alert.alert('Error', 'Failed to submit feedback.');
        }
      };

  return (
    <View style={styles.container}>
      <Header title="Feedback" />


      <Formik
        initialValues={{ feedback: ''}}
        onSubmit={handleSubmit}
        validationSchema={feedbackValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched
        }) => (
          <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Enter your feedback"
                onChangeText={handleChange('feedback')}
                onBlur={handleBlur('feedback')}
                value={values.feedback}
                multiline
              />
              {touched.feedback && errors.feedback && <Text style={styles.errorText}>{errors.feedback}</Text>}

              <Button title="Submit Feedback" onPress={handleSubmit}/>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  form: {
    marginTop: 20
  },
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      height: 100,
      textAlignVertical: 'top',
  },
  errorText: {
      color: 'red',
      marginBottom: 5,
  }
});


export default FeedbackScreen;