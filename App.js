

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import CharacterCard from './Personagens';
import EpisodeCard from './Episodios';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>WIKI - Rick and Morty</Text>
    </View>
  );
};


const Footer = ({ currentPage, onChangePage }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => onChangePage('Personagens')} style={[styles.footerItem, currentPage === 'Personagens' && styles.selectedFooterItem]}>
        <Ionicons name="people" size={24} color={currentPage === 'Personagens' ? '#3498db' : '#888'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onChangePage('Episódios')} style={[styles.footerItem, currentPage === 'Episódios' && styles.selectedFooterItem]}>
        <Ionicons name="film" size={24} color={currentPage === 'Episódios' ? '#3498db' : '#888'} />
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('Personagens');

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <View style={styles.container}>
      <Header />
      {currentPage === 'Personagens' && (
        <View style={styles.content}>
          <CharacterCard/>
        </View>
      )}
      {currentPage === 'Episódios' && (
        <View style={styles.content}>
          <EpisodeCard/>
        </View>
      )}
      <Footer currentPage={currentPage} onChangePage={handlePageChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f2f2f2',
  },
  footerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  selectedFooterItem: {
    backgroundColor: '#fff',
  },
});

export default App;



