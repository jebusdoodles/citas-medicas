import { Tabs } from 'expo-router';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const displayLabel = route.name === 'index' ? 'Inicio' : 
                               route.name === 'history' ? 'Historial' : label;

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[
                styles.tab,
                isFocused && styles.tabActive
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  isFocused ? styles.tabTextActive : styles.tabTextInactive
                ]}
              >
                {displayLabel}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 44,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: '#cccccc',
    borderRadius: 60,
    padding: 4,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 60,
  },
  tabActive: {
    backgroundColor: '#71C1C4',
  },
  tabText: {
    fontSize: 16,
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tabTextInactive: {
    color: '#767676',
    fontWeight: 'normal',
  },
});

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Inicio', headerShown: false }} 
      />
      <Tabs.Screen 
        name="history" 
        options={{ title: 'Historial', headerShown: false }} 
      />
    </Tabs>
  );
}