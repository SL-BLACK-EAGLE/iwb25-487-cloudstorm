import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts} from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import './globals.css';

import { useColorScheme } from '@/hooks/useColorScheme';
import {useEffect, useState} from "react";
import VideoSplashScreen from "@/components/VideoSplashScreen";
import { useRouter } from 'expo-router';
import { AuthProvider } from './components/AuthProvider';

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [fontsLoaded, error] = useFonts({
        "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
        "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
        "Poppins-Regular": require('../assets/fonts/Poppins-Regular.ttf'),
        "Poppins-SemiBold": require('../assets/fonts/Poppins-SemiBold.ttf'),
        "Poppins-Light": require('../assets/fonts/Poppins-Light.ttf'),
        "Manuale-Bold": require('../assets/fonts/Manuale-Bold.ttf'),
        "Manuale-Medium": require('../assets/fonts/Manuale-Medium.ttf'),
        "Manuale-Regular": require('../assets/fonts/Manuale-Regular.ttf'),
        "Manuale-SemiBold": require('../assets/fonts/Manuale-SemiBold.ttf'),
        "Manuale-Light": require('../assets/fonts/Manuale-Light.ttf'),
    });
    const [showVideoSplash, setShowVideoSplash] = useState(true);


    useEffect(() => {
        if(error) throw error;
        if(fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    const handleSplashFinish = () => {
        setShowVideoSplash(false);
        // Navigate to SignIn screen after splash

    };

    if(!fontsLoaded) return null;

    if (showVideoSplash) {
        return (
            <VideoSplashScreen onFinish={handleSplashFinish} />
        );
    }

    return (
        <AuthProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
            </ThemeProvider>
        </AuthProvider>
    );
}
