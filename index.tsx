import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface Pokemon {
  name: string;
  id: number;
}

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await res.json();

    const formatted = data.results.map((p: any) => ({
      name: p.name,
      id: Number(p.url.split("/")[6])
    }));

    setPokemons(formatted);
  }

  const filtered = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>

      <TextInput
        placeholder="Search Pokémon..."
        placeholderTextColor="#aaa"
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filters}>
        {["grass","fire","water","ground"].map(type => (
          <TouchableOpacity key={type} style={styles.filterBtn}>
            <Text style={styles.filterText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.map((pokemon) => (
        <Link
          key={pokemon.name}
          href={{ pathname: "/pokemon", params: { id: pokemon.id } }}
          asChild
        >
          <TouchableOpacity style={styles.card}>
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
              }}
              style={styles.image}
            />

            <Text style={styles.name}>{pokemon.name}</Text>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#000",
    paddingTop:40
  },

  title:{
    color:"#ff2d95",
    fontSize:36,
    fontWeight:"bold",
    textAlign:"center"
  },

  search:{
    backgroundColor:"#111",
    margin:16,
    padding:14,
    borderRadius:12,
    color:"white"
  },

  filters:{
    flexDirection:"row",
    justifyContent:"center",
    marginBottom:10
  },

  filterBtn:{
    backgroundColor:"#ff2d95",
    paddingVertical:6,
    paddingHorizontal:14,
    borderRadius:20,
    margin:4
  },

  filterText:{
    color:"white"
  },

  card:{
    backgroundColor:"#111",
    marginHorizontal:16,
    marginBottom:16,
    padding:20,
    borderRadius:20,
    alignItems:"center"
  },

  image:{
    width:140,
    height:140
  },

  name:{
    color:"white",
    fontSize:22,
    marginTop:10,
    textTransform:"capitalize"
  }
});