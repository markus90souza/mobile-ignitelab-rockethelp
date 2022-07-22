import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Register } from '../screens/Register';
import { Details } from '../screens/Details';

const {  Group, Navigator, Screen } = createNativeStackNavigator()

const AppRoutes = () => {

  return (
    <Navigator>
      <Group screenOptions={{ headerShown: false }}>
        <Screen name={'home'} component={Home} />
        <Screen name={'new'} component={Register} />
        <Screen name={'details'} component={Details} />
      </Group>
    </Navigator>
  )
}

export { AppRoutes }