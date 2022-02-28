import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Modal,
} from "react-native";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const [modalVisible, setModalVisible] = useState(false);

  const poster_url = "https://image.tmdb.org/t/p/w500";
  const results = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=bf091621962bdf5c30339e874a2a0c1a&language=en-US&page=1";

    const response = await fetch(url);
    const responseJson = (await response.json()).results as Movie[];
    setMovies(responseJson);
  };

  useEffect(() => {
    results();
  }, []);

  const openPopup = async (id: number) => {
    var url =
      "https://api.themoviedb.org/3/movie/{id}?api_key=bf091621962bdf5c30339e874a2a0c1a&language=en-US".replace(
        "{id}",
        id.toString()
      );
    const response = await fetch(url);
    const responseJson = (await response.json()) as Movie;

    setSelectedMovie(responseJson);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Angel Ruiz 27/02/2022</Text>
      <ScrollView style={styles.movieList}>
        {movies.map((movie: Movie) => {
          return (
            <TouchableHighlight
              key={movie.id}
              onPress={() => openPopup(movie.id)}
            >
              <View style={styles.movie}>
                <View style={styles.row}>
                  <Image
                    style={styles.tinyImg}
                    source={{ uri: poster_url + movie.poster_path }}
                  />
                  <Text style={styles.heading}>{movie.title}</Text>
                </View>
                <Text style={styles.rating}>{movie.vote_average + "/10"}</Text>
              </View>
            </TouchableHighlight>
          );
        })}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <Image
            style={styles.bigImg}
            source={{ uri: poster_url + selectedMovie.poster_path }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040303",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  title: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 20,
  },
  movieList: {
    flex: 1,
  },
  movie: {
    flex: 1,
    width: "150%",
    marginBottom: 10,
    height: 70,
    backgroundColor: "#461111",
  },
  heading: {
    color: "#FFEDED",
    fontSize: 18,
    fontWeight: "700",
    justifyContent: "flex-start",
    paddingLeft: 5,
    paddingTop: 5,
  },
  rating: {
    justifyContent: "flex-start",
    flex: 1,
    color: "#B3541E",
    marginLeft: "56%",
  },
  tinyImg: {
    width: 50,
    height: 50,
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
  },
  bigImg: {
    width: "100%",
    height: "40%",
    alignSelf: "flex-start",
  },
  paragraph: {},
});
