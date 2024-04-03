import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CharacterCard = ({ character }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.characterImage} />
      <View style={styles.cardBody}>
        <Text style={styles.name}>{character.name}</Text>
        <Text>Status: {character.status}</Text>
        <Text>Species: {character.species}</Text>
        <Text>Type: {character.type}</Text>
        <Text>Gender: {character.gender}</Text>
        <Text>Origin: {character.origin.name}</Text>
        <Text>Location: {character.location.name}</Text>
      </View>
    </View>
  );
};

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const fetchCharacters = () => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results);
        setTotalPages(data.info.pages);
        scrollToTop();
      })
      .catch(error => console.error('Erro ao buscar personagens:', error));
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Personagens</Text>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {characters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        <TouchableOpacity onPress={handlePreviousPage}>
          <AntDesign name="leftcircleo" size={24} color="blue" />
        </TouchableOpacity>
        <Text style={styles.pageIndicator}>{page}/{totalPages}</Text>
        <TouchableOpacity onPress={handleNextPage}>
          <AntDesign name="rightcircleo" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '90%',
    flexDirection: 'row',
  },
  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cardBody: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  pageIndicator: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default CharactersPage;
