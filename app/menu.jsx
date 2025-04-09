import {
    StyleSheet,
    Appearance,
    Platform,
    SafeAreaView,
    ScrollView,
    FlatList,
    View,
    Text,
    Image,
  } from "react-native";
  
  import { Colors } from "@/constants/Colors"; // 🎨 Thèmes clairs/sombres
  import { MENU_ITEMS } from "@/constants/MenuItems"; // 📋 Données à afficher
  import MENU_IMAGES from "@/constants/MenuImages"; // 🖼️ Images associées à chaque item
  
  function MenuScreen() {
    // 📱 Détection du mode clair ou sombre automatiquement
    const colorScheme = Appearance.getColorScheme();
  
    // 🎨 Application du thème en fonction du mode détecté
    const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  
    // 🧵 Génération dynamique du style avec les bonnes couleurs
    const styles = createStyles(theme);
  
    // 💡 Container = SafeAreaView sur mobile ou ScrollView sur web
    const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  
    return (
      <Container style={styles.container}>
        <FlatList
          // ✅ Liste de données à afficher (doit être un tableau d'objets)
          data={MENU_ITEMS}
  
          // 🔑 Fonction qui retourne une "clé" unique pour chaque élément (obligatoire pour FlatList)
          keyExtractor={(item) => item.id.toString()}
  
          // 🧱 Ajoute un peu d'espace autour de la liste
          contentContainerStyle={styles.list}
  
          // 🔁 Fonction qui détermine comment chaque item doit s'afficher
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                // 🖼️ Image de l'item, récupérée depuis un tableau d’images
                source={MENU_IMAGES[item.id - 1]}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          )}
        />
      </Container>
    );
  }
  
  // 🧵 Styles dynamiques générés selon le thème
  function createStyles(theme) {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.background,
      },
      list: {
        padding: 16,
      },
      card: {
        marginBottom: 20,
        backgroundColor: theme.card || "#fff",
        borderRadius: 12,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3, // ✅ Ombre sur Android
      },
      image: {
        width: "100%",
        height: 180,
      },
      textContainer: {
        padding: 12,
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.text,
      },
      description: {
        marginTop: 4,
        color: theme.text,
      },
    });
  }
  
  export default MenuScreen;
  
  // 📌 SafeAreaView
// -> Assure que le contenu ne passe pas sous les bords "dangereux" de l'écran 
//    (comme l'encoche sur iPhone, la barre de statut, etc.)
// -> Très utile sur mobile pour éviter que le haut du contenu soit masqué

// 📌 ScrollView
// -> Permet de scroller quand le contenu dépasse la taille de l'écran
// -> Pratique pour de petites listes ou des contenus non répétitifs
// ⚠️ Attention : ScrollView charge *tout* en mémoire (moins performant que FlatList)

// 🧠 Dans ce code :
// - Sur mobile on utilise `SafeAreaView` (on a déjà FlatList pour scroller efficacement)
// - Sur web, on utilise `ScrollView` parce que SafeAreaView est parfois inutile ou mal supporté
