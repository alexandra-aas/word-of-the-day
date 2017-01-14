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

const URL = 'http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=45a7e1f5f7730ce4d00090a23ae0d59558c2ae7b726623886';

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
      date: null,
      color: null,
      pronunciation: null,
    }
  }

  componentDidMount() {
    this.fetchData().done();
  }

  async fetchData() {
    const response = await fetch(URL);
    const json = await response.json();
    const word = json.word;
    const note = json.note;
    const definition = json.definitions[0].text;
    const partOfSpeech = json.definitions[0].partOfSpeech;
    const example = json.examples[0].text;
    var color;

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
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.headerBar, {backgroundColor: this.state.color}]}>
          <Text style={styles.headerBarText}>Daily Word</Text>
          <Text style={styles.headerBarText}>{moment(new Date()).format('MM/DD/YYYY')}</Text>
        </View>

        <View style={styles.partOfSpeech}>
          <Text style={styles.partOfSpeechText}>{this.state.partOfSpeech}</Text>
        </View>

        <View style={styles.wordOfTheDay}>
          <Text style={styles.wordOfTheDayWord}>{this.state.word}</Text>
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
