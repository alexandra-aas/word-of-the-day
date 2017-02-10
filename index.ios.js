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

const RANDOM_WORD_URL = 'http://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=45a7e1f5f7730ce4d00090a23ae0d59558c2ae7b726623886';
const BASE_URL = 'http://api.wordnik.com/v4/word.json/';
const API_KEY = 'api_key=45a7e1f5f7730ce4d00090a23ae0d59558c2ae7b726623886';
const PRONUNCIATION_URL = '/pronunciations?useCanonical=false&typeFormat=ahd&limit=1&' + API_KEY;

/**
    if (partOfSpeech == 'adjective' ) {
      color = '#EA8259';
    } else if (partOfSpeech == 'adverb') {
      color = '#4B989D';
    } else if (partOfSpeech == 'noun') {
      color = '#9FAC4C';
    } else if (partOfSpeech == 'verb') {
      color = '#997A9D';
    } else {
      color = '#CCA558';
    }
**/


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
      word: null,
      note: null,
      definition: null,
      partOfSpeech: null,
      example: null,
      date: moment(new Date()).format('MM/DD/YYYY'),
      color: null,
      pronunciation: null,
    }
  }

  componentDidMount() {
    this.fetchRandomWord().done();
  }

  async fetchRandomWord() {
    const randomWordResponse = await fetch(RANDOM_WORD_URL);
    const randomWordJson = await randomWordResponse.json();
    const word = randomWordJson.word;

    const pronunciationResponse = await fetch(BASE_URL + word + PRONUNCIATION_URL);
    const pronunciationJson = await pronunciationResponse.json();
    const pronunciation = pronunciationJson[0].raw;

    this.setState({
      word: word,
      pronunciation: pronunciation || null,
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.headerBar, {backgroundColor: this.state.color}]}>
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

        <InfoRow
          headerText="Definition"
          bodyText={this.state.definition} />

        <InfoRow
          headerText="Note"
          bodyText={this.state.note} />

        <InfoRow
          headerText="Example"
          bodyText={this.state.example} />
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
