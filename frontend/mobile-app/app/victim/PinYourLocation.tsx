import React, { useState, useEffect, useMemo } from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ImageBackground,
    Pressable,
    Dimensions,
    TouchableOpacity,
    Alert,
    Linking,
} from "react-native";
import { useRouter } from "expo-router";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const A = {
    header: require("../../assets/images/header-wave.png"),
    back: require("../../assets/icons/Chevron_Left.png"),
    pin: require("../../assets/icons/Location.png"),
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function PinYourLocation() {
    const router = useRouter();

    // Location states
    const [region, setRegion] = useState({
        latitude: 28.6139, // Delhi coordinates as default
        longitude: 77.2090,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [selectedLocation, setSelectedLocation] = useState({
        latitude: 28.6139,
        longitude: 77.2090,
    });
    const [locationPermission, setLocationPermission] = useState(false);
    const [currentAddress, setCurrentAddress] = useState("");

    // Keep header wave exact same aspect ratio
    const headerAR = useMemo(() => {
        const src = Image.resolveAssetSource(A.header);
        return src.width / src.height;
    }, []);

    useEffect(() => {
        checkLocationPermission();
    }, []);

    const checkLocationPermission = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Location permission is required to show your current location',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Settings', onPress: () => Linking.openSettings() }
                    ]
                );
                return;
            }

            setLocationPermission(true);
            getCurrentLocation();
        } catch (error) {
            console.log('Error checking location permission:', error);
        }
    };

    const getCurrentLocation = async () => {
        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            const newRegion = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            };

            setRegion(newRegion);
            setSelectedLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            // Get address from coordinates
            getAddressFromCoordinates(location.coords.latitude, location.coords.longitude);
        } catch (error) {
            console.log('Error getting current location:', error);
            Alert.alert('Error', 'Unable to get current location');
        }
    };

    const getAddressFromCoordinates = async (latitude: any, longitude: any) => {
        try {
            const addressResponse = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            if (addressResponse.length > 0) {
                const address = addressResponse[0];
                const fullAddress = `${address.street || ''} ${address.city || ''} ${address.region || ''} ${address.country || ''}`.trim();
                setCurrentAddress(fullAddress);
            }
        } catch (error) {
            console.log('Error getting address:', error);
        }
    };

    const handleMapPress = (event: any) => {
        const coordinate = event.nativeEvent.coordinate;
        setSelectedLocation(coordinate);
        getAddressFromCoordinates(coordinate.latitude, coordinate.longitude);
    };

    const handleConfirm = async () => {
        if (selectedLocation) {
            try {
                // Save the selected location to AsyncStorage
                const locationData = {
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                    address: currentAddress,
                };

                await AsyncStorage.setItem('selectedLocation', JSON.stringify(locationData));

                // Navigate back
                router.back();
            } catch (error) {
                console.log('Error saving location:', error);
                Alert.alert('Error', 'Failed to save location');
            }
        } else {
            Alert.alert('Error', 'Please select a location on the map');
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F3F5F7]">
            {/* ===== Header ===== */}
            <ImageBackground
                source={A.header}
                resizeMode="cover"
                className="mt-[45px]"
                style={{
                    width: SCREEN_WIDTH,
                    aspectRatio: headerAR,
                    borderBottomLeftRadius: 28,
                    borderBottomRightRadius: 28,
                }}
            >
                <View
                    style={{
                        paddingTop: 20,
                        paddingBottom: 14,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Pressable
                        onPress={() => router.back()}
                        className="absolute left-4 top-4 h-10 w-10 items-center justify-center"
                        hitSlop={10}
                    >
                        <Image
                            source={A.back}
                            style={{ width: 22, height: 22, tintColor: "#FFFFFF" }}
                        />
                    </Pressable>

                    <Text className="text-white text-[16px] font-semibold">
                        Pin Your Location
                    </Text>
                </View>
            </ImageBackground>

            {/* ===== Map View ===== */}
            <View className="flex-1 m-6 rounded-2xl overflow-hidden">
                <MapView
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    region={region}
                    onPress={handleMapPress}
                    showsUserLocation={locationPermission}
                    showsMyLocationButton={false}
                    showsCompass={false}
                    toolbarEnabled={false}
                    mapType="standard"
                >
                    {selectedLocation && (
                        <Marker
                            coordinate={selectedLocation}
                            draggable
                            onDragEnd={(event) => {
                                const coordinate = event.nativeEvent.coordinate;
                                setSelectedLocation(coordinate);
                                getAddressFromCoordinates(coordinate.latitude, coordinate.longitude);
                            }}
                        >
                            <View className="items-center">
                                <Image
                                    source={A.pin}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        tintColor: '#FF6B6B',
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
                        </Marker>
                    )}
                </MapView>

                {/* Current Location Button */}
                <Pressable
                    onPress={getCurrentLocation}
                    className="absolute top-4 right-4 bg-white rounded-xl p-3"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <Image
                        source={A.pin}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: '#3072BF',
                        }}
                    />
                </Pressable>
            </View>

            {/* Address Display */}
            {currentAddress ? (
                <View className="mx-6 mb-4 bg-white p-4 rounded-xl">
                    <Text className="text-[12px] font-medium text-gray-500 mb-1">
                        Selected Location:
                    </Text>
                    <Text className="text-[14px] text-gray-800" numberOfLines={2}>
                        {currentAddress}
                    </Text>
                </View>
            ) : null}

            {/* Bottom Buttons */}
            <View className="flex-row mx-6 mb-8 space-x-4 gap-32">
                <TouchableOpacity
                    onPress={handleCancel}
                    className="flex-1 bg-[#12AAD5] py-4 rounded-2xl  "
                    style={{
                        shadowColor: "#3072BF",
                        shadowOffset: {width: 0, height: 4},
                        shadowOpacity: 0.2,
                        shadowRadius: 8,
                        elevation: 4,
                    }}
                >
                    <Text className="text-white text-[16px] font-semibold text-center">
                        Cancel
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleConfirm}
                    className="flex-1 bg-[#3072BF] py-4 rounded-2xl"
                    style={{
                        shadowColor: "#3072BF",
                        shadowOffset: {width: 0, height: 8},
                        shadowOpacity: 0.3,
                        shadowRadius: 16,
                        elevation: 8,
                    }}
                >
                    <Text className="text-white text-[16px] font-semibold text-center">
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
