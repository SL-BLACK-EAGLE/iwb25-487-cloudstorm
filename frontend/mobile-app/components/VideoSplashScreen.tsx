import React, {useEffect, useRef} from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import {ResizeMode, Video} from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';

interface VideoSplashScreenProps {
    onFinish: () => void;
}

const {width, height} = Dimensions.get('window');

export default function VideoSplashScreen({onFinish}: VideoSplashScreenProps) {
    const video = useRef<Video>(null);

    useEffect(() => {
        // Hide the default splash screen when component mounts
        SplashScreen.hideAsync();
        // Hide status bar for full immersion
        StatusBar.setHidden(true, 'none');

        return () => {
            // Keep status bar hidden when component unmounts
            StatusBar.setHidden(true, 'none');
        };
    }, []);

    const handlePlaybackStatusUpdate = (status: any) => {
        if (status.didJustFinish) {
            onFinish();
        }
    };

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={require('../assets/videos/splashscreen_animation.mp4')}
                shouldPlay
                isLooping={false}
                resizeMode={ResizeMode.COVER}
                onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        zIndex: 9999,
    },
    video: { position: 'absolute', top: -150, left: -150, width: width + 300, height: height + 300, zIndex: 10000, },
});
