/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';

const WORK = 'WorkSans-Bold';
const LORA = 'Lora-Regular';
const LORA_BOLD = 'Lora-Bold';
const INPUT = 'InputSerif-Regular';
const INPUT_ITALIC = 'InputSerif-Italic';

const RANDOM_WORD_URL = 'https://wordsapiv1.p.mashape.com/words/?random=true'
const API_KEY = 'BFm3aqOEOcmshI8pk3fEdGiOWYLup1F3VQ1jsnTevzbFXFVzm8'

class InfoRow extends Component {
  render() {
    return (
      <View style={styles.infoRow}>
        <Text style={styles.infoRowHeaderText}>{this.props.headerText.toUpperCase()}</Text>
        <Text style={styles.infoRowBodyText}>{this.props.bodyText}</Text>
      </View>
    );
  }
}

export default class dailyWord extends Component {
  constructor() {
    super();
    this.state = {
      date: moment(new Date()).format('MM/DD/YYYY'),
      headerColor: null,
      word: null,
      definition: null,
      partOfSpeech: null,
      synonyms: null,
      typeOf: null,
      pronunciation: null,
    }
  }

  componentDidMount() {
    this.fetchRandomWord().done();
  }

  async fetchRandomWord() {
    const response = await fetch(RANDOM_WORD_URL, { method : 'GET', headers : {'X-Mashape-Key' : API_KEY, 'Accept' : 'application/json'}});
    const json = await response.json();
    const keys = Object.keys(json);
    const results = keys.includes("results[0]") ? json.results[0] : null;
    const word = json.word;

    this.setState({
      word: word,
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.headerBar, {backgroundColor: this.state.headerColor}]}>
          <Text style={styles.headerBarText}>Daily Word</Text>
          <Text style={styles.headerBarText}>{this.state.date}</Text>
        </View>

        <View style={styles.partOfSpeech}>
          <Text style={styles.partOfSpeechText}>{this.state.partOfSpeech}</Text>
        </View>

        <View style={styles.wordOfTheDay}>
          <Text style={styles.wordOfTheDayWord}>{this.state.word}</Text>
          <Text style={styles.wordOfTheDayPronunciation}>{this.state.pronunciation}</Text>
        </View>

        {for (var key of Object.keys(json.results[0])) {
          return <InfoRow headerText=key bodyText=json.results[0][key] />
        }}



        <InfoRow
          headerText="Type Of"
          bodyText={this.state.typeOf} />

        <View style={styles.infoRow}>
          <Text style={styles.infoRowHeaderText}>{"Synonyms".toUpperCase()}</Text>
          <Text style={styles.infoRowBodyText}>{this.state.synonyms}</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
  },
  headerBarText: {
    fontFamily: INPUT,
    fontSize: 12,
    opacity: 0.8,
  },
  partOfSpeech: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -15,
  },
  partOfSpeechText: {
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: INPUT,
    fontSize: 14,
    height: 30,
    lineHeight: 30,
    paddingHorizontal: 10,
  },
  wordOfTheDay: {
    marginBottom: 10,
    marginHorizontal: 30,
    marginTop: 30,
  },
  wordOfTheDayWord: {
    fontFamily: LORA_BOLD,
    fontSize: 40,
    textAlign: 'center',
  },
  wordOfTheDayPronunciation: {
    color: '#999',
    fontFamily: LORA,
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  dividers: {
    borderBottomWidth: 2,
    borderColor: '#000',
    borderStyle: 'solid',
    flex: 1,
    flexDirection: 'row',
    marginLeft: 30,
    paddingRight: 30,
  },
  divider: {
    borderColor: '#000',
    borderStyle: 'solid',
    flex: 1,
    height: 25,
  },
  dividerLeft: {
    borderRightWidth: 1,
  },
  dividerRight: {
    borderLeftWidth: 1,
  },
  infoRow: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    marginLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    paddingBottom: 30,
  },
  infoRowHeaderText: {
    fontFamily: WORK,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 10,
  },
  infoRowBodyText: {
    fontFamily: LORA,
    fontSize: 16,
    lineHeight: 28,
  },
});

AppRegistry.registerComponent('dailyWord', () => dailyWord);
