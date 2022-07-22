import { NativeBaseProvider , StatusBar} from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { THEME } from './styles/theme';
import { Loading } from './components/Loading';
import { Routes } from './routes';

const App = () => {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      {
        !fontsLoaded ? <Loading /> :  <Routes /> 
      }
    
    </NativeBaseProvider>
  );
}

export { App }


