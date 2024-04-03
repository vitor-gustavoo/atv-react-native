import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const EpisodeCard = ({ episode }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <Text style={styles.name}>{episode.name}</Text>
        <Text>Air Date: {episode.air_date}</Text>
        <Text>Episode: {episode.episode}</Text>
      </View>
    </View>
  );
};

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchEpisodes();
  }, [page]);

  const fetchEpisodes = () => {
    fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setEpisodes(data.results);
        setTotalPages(data.info.pages);
        scrollToTop();
      })
      .catch(error => console.error('Erro ao buscar episódios:', error));
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
      <Text style={styles.pageTitle}>Episódios</Text>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {episodes.map(episode => (
          <EpisodeCard key={episode.id} episode={episode} />
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
  },
  cardBody: {},
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

export default EpisodesPage;
