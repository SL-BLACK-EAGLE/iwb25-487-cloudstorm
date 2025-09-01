"use client";

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MapView, { Marker, MapPressEvent, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

function PinLocationScreen() {
    const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();

    const [region, setRegion] = useState<Region>({
        latitude: 6.9271,
        longitude: 79.8612,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    const [picked, setPicked] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === "granted") {
                const loc = await Location.getCurrentPositionAsync({});
                setRegion(r => ({
                    ...r,
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                }));
            }
        })();
    }, []);

    function onMapPress(e: MapPressEvent) {
        setPicked(e.nativeEvent.coordinate);
    }

    function confirm() {
        const coord = picked ?? { latitude: region.latitude, longitude: region.longitude };
        const params = { lat: String(coord.latitude), lng: String(coord.longitude) };

        if (returnTo) {
            router.replace({ pathname: '/VictimUser/nearest_evacuation_center', params });
        } else {
            router.back();
        }
    }

    return (
        <View className="flex-1 bg-blue-50">
            {/* wave header */}
            <View className="relative">
                <View style={{ height: 100, overflow: "hidden" }}>
                    <Image
                        source={require("../../assets/images/donation_type_top_bg.png")}
                        resizeMode="stretch"
                        style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "110%", height: 100 }}
                    />
                </View>

                <View className="absolute left-0 right-0 top-0 mt-4 px-4 pt-6">
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center" onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <View className="absolute left-0 right-0 mt-6 items-center">
                        <Text className="text-white text-base font-semibold">Pin Your Location</Text>
                    </View>
                </View>
            </View>

            <View className="flex-1 px-4 pt-4">
                <View className="rounded-2xl overflow-hidden bg-white">
                    <MapView
                        style={{ height: 380 }}
                        initialRegion={region}
                        region={region}
                        onRegionChangeComplete={setRegion}
                        onPress={onMapPress}
                    >
                        {picked && <Marker coordinate={picked} />}
                    </MapView>
                </View>

                <View className="flex-row gap-4 mt-4">
                    <TouchableOpacity className="flex-1 bg-blue-500 rounded-xl py-3" onPress={confirm}>
                        <Text className="text-white text-center font-semibold">Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-gray-300 rounded-xl py-3" onPress={() => router.back()}>
                        <Text className="text-gray-800 text-center font-semibold">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default PinLocationScreen;
