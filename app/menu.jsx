import { StyleSheet, Appearance, Platform, SafeAreaView, ScrollView, FlatList, View, Text, Image } from "react-native";

import { Colors } from '@/constants/Colors';
import { MENU_ITEMS } from '@/constants/MenuItems';
import MENU_IMAGES from '@/constants/MenuImages';

export default function MenuScreen() {
    const colorScheme = Appearance.getColorScheme()

    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const styles = createStyles(theme, colorScheme)

    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

    const separatorComp = <View style={styles.separator} />

    //const headerComp = <Text>Top of List</Text>
    const footerComp = <Text style={{ color: theme.text }}>End of Menu</Text>

    return (
        <Container>

            <FlatList
                data={MENU_ITEMS}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={separatorComp}
                //ListHeaderComponent={headerComp}
                ListFooterComponent={footerComp}
                ListFooterComponentStyle={styles.footerComp}
                ListEmptyComponent={<Text>No items</Text>}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <View style={styles.menuTextRow}>
                            <Text style={[styles.menuItemTitle, styles.menuItemText]}>{item.title}</Text>
                            <Text style={styles.menuItemText}>{item.description}</Text>
                        </View>
                        <Image
                            source={MENU_IMAGES[item.id - 1]}
                            style={styles.menuImage}
                        />
                    </View>
                )}
            />

        </Container>
    )
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        contentContainer: {
            paddingTop: 10,
            paddingBottom: 20,
            paddingHorizontal: 12,
            backgroundColor: theme.background,
        },
        separator: {
            height: 1,
            backgroundColor: colorScheme === 'dark' ? 'papayawhip' : "#000",
            width: '50%',
            maxWidth: 300,
            marginHorizontal: 'auto',
            marginBottom: 10,
        },
        footerComp: {
            marginHorizontal: 'auto',
        },
        row: {
            flexDirection: 'row',
            width: '100%',
            maxWidth: 600,
            height: 100,
            marginBottom: 10,
            borderStyle: 'solid',
            borderColor: colorScheme === 'dark' ? 'papayawhip' : '#000',
            borderWidth: 1,
            borderRadius: 20,
            overflow: 'hidden',
            marginHorizontal: 'auto',
        },
        menuTextRow: {
            width: '65%',
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 5,
            flexGrow: 1,
        },
        menuItemTitle: {
            fontSize: 18,
            textDecorationLine: 'underline',
        },
        menuItemText: {
            color: theme.text,
        },
        menuImage: {
            width: 100,
            height: 100,
        }
    })
}




/* 
═══════════════════════════════════════════════════════════════════════
📘 RÉCAPITULATIF DES CONCEPTS UTILISÉS DANS CE FICHIER
═══════════════════════════════════════════════════════════════════════

1. 🌗 Appearance.getColorScheme()
────────────────────────────────────
Permet de détecter le thème système (clair ou sombre).
Utile pour adapter les couleurs de l'application automatiquement selon
les préférences utilisateur.

→ Ex : 
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

───────────────────────────────────────────────────────────────────────

2. 🎨 Thèmes dynamiques
────────────────────────────────────
Les styles (couleurs, arrière-plans, textes) sont adaptés en fonction du
thème détecté via `createStyles(theme, colorScheme)`.

Cela permet :
✔ une meilleure accessibilité
✔ un look cohérent
✔ une app qui suit les préférences système

───────────────────────────────────────────────────────────────────────

3. 📦 FlatList
────────────────────────────────────
Composant optimisé pour afficher des listes longues avec performance.
Contrairement à ScrollView, FlatList ne charge en mémoire que les éléments visibles.

Props utilisées ici :
- `data`: le tableau de données (MENU_ITEMS)
- `renderItem`: rend chaque élément
- `keyExtractor`: génère une clé unique par item
- `ItemSeparatorComponent`: composant entre les éléments
- `ListFooterComponent`: composant affiché en bas de la liste
- `ListEmptyComponent`: message affiché si la liste est vide

───────────────────────────────────────────────────────────────────────

4. 📱 SafeAreaView & ScrollView
────────────────────────────────────
→ SafeAreaView est utilisé sur mobile pour éviter les zones sensibles
(encoche, barre de statut, etc.)

→ ScrollView est utilisé à la place sur le web car SafeAreaView
n’a pas d’effet ou fonctionne mal sur navigateur.

───────────────────────────────────────────────────────────────────────

5. 🧵 Styles dynamiques avec StyleSheet.create()
────────────────────────────────────
La fonction `createStyles()` permet de générer des styles dynamiques.
On y utilise à la fois `theme` (objets de couleur) et `colorScheme` pour
appliquer différentes règles selon le mode clair/sombre.

───────────────────────────────────────────────────────────────────────

6. 🎨 Quelques props importantes utilisées
────────────────────────────────────
- `marginHorizontal: 'auto'` : permet de centrer horizontalement sur le web
- `overflow: 'hidden'` : arrondit les coins sans que l’image déborde
- `flexDirection: 'row'` : affiche les éléments horizontalement
- `borderRadius` : arrondit les bords
- `resizeMode: 'cover'` (dans Image) : recadre l’image pour couvrir tout le conteneur

═══════════════════════════════════════════════════════════════════════
*/
