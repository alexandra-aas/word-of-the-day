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

const BASE_URL = 'http://api.wordnik.com/v4/'
const BASE_WORD_URL = BASE_URL + 'word.json/';
const BASE_WORDS_URL = BASE_URL + 'words.json/';
const API_KEY = 'api_key=45a7e1f5f7730ce4d00090a23ae0d59558c2ae7b726623886';
const WORD_OF_THE_DAY_URL = BASE_WORDS_URL + 'wordOfTheDay?' + API_KEY;

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
    const wordResponse = await fetch(WORD_OF_THE_DAY_URL);
    const wordJson = await wordResponse.json();
    const word = wordJson.word;

    const pronunciationResponse = await fetch(BASE_WORD_URL + word + '/pronunciations?useCanonical=false&limit=1&' + API_KEY);
    const pronunciationJson = await pronunciationResponse.json();
    const pronunciation = pronunciationJson[0].raw;

    const note = wordJson.note;
    const definition = wordJson.definitions[0].text;
    const partOfSpeech = wordJson.definitions[0].partOfSpeech;
    const example = wordJson.examples[0].text;

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

    this.setState({
      word: word,
      note: note,
      definition: definition,
      partOfSpeech: partOfSpeech,
      example: example,
      color: color,
      pronunciation: pronunciation.replace(/\(|\)/g,''),
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
    fontFamily: INPUT_ITALIC,
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
  },
  infoRow: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    marginLeft: 30,
    paddingRight: 30,
    paddingVertical: 30,
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
