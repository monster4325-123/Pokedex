import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PokemonPage() {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchPokemon();
  }, []);

  async function fetchPokemon() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    setPokemon(data);

    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();

    const flavor = speciesData.flavor_text_entries.find(
      (f: any) => f.language.name === "en"
    );

    setDescription(flavor?.flavor_text || "");
  }

  if (!pokemon) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: pokemon.sprites.other["official-artwork"].front_default,
          }}
          style={styles.image}
        />

        <Text style={styles.name}>{pokemon.name}</Text>

        <Text style={styles.type}>
          {pokemon.types.map((t: any) => t.type.name).join(", ")}
        </Text>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>HP</Text>
            <Text style={styles.statValue}>{pokemon.stats[0].base_stat}</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statLabel}>Attack</Text>
            <Text style={styles.statValue}>{pokemon.stats[1].base_stat}</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statLabel}>Defense</Text>
            <Text style={styles.statValue}>{pokemon.stats[2].base_stat}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: 60,
  },

  card: {
    backgroundColor: "#111",
    margin: 20,
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
  },

  image: {
    width: 220,
    height: 220,
    marginBottom: 10,
  },

  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff2d95",
    textTransform: "capitalize",
  },

  type: {
    color: "#fff",
    marginTop: 6,
    fontSize: 16,
    textTransform: "capitalize",
  },

  description: {
    color: "#ccc",
    marginTop: 15,
    textAlign: "center",
    lineHeight: 20,
  },

  statsContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "100%",
  },

  stat: {
    backgroundColor: "#1b1b1b",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },

  statLabel: {
    color: "#888",
    fontSize: 12,
  },

  statValue: {
    color: "#ff2d95",
    fontSize: 18,
    fontWeight: "bold",
  },
});