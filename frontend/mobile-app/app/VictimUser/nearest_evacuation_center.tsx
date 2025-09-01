import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

type Center = {
    id: number;
    name: string;
    distance: string;
    status: string;
    capacity: string;
    parking: string;
    pets: string;
};

const ALL_CENTERS: Center[] = [
    { id: 1, name: "Lincoln High School", distance: "0.8 mi", status: "OPEN", capacity: "147/200", parking: "Available", pets: "Welcome" },
    { id: 2, name: "Ragama Church",        distance: "1.2 mi", status: "OPEN", capacity: "220/300", parking: "Available", pets: "Welcome" },
    { id: 3, name: "City Sports Complex",   distance: "2.5 mi", status: "OPEN", capacity: "560/800", parking: "Limited",  pets: "Service animals" },
];

const NearestEvacuationCenter = () => {
    const { lat, lng } = useLocalSearchParams<{ lat?: string; lng?: string }>();
    const [searchText, setSearchText] = useState("");

    const pinned = useMemo(() => (lat && lng ? { lat: Number(lat), lng: Number(lng) } : null), [lat, lng]);

    const centers = useMemo(
        () =>
            ALL_CENTERS.filter(
                c =>
                    c.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    c.status.toLowerCase().includes(searchText.toLowerCase())
            ),
        [searchText]
    );

    useEffect(() => {
        if (pinned?.lat && pinned?.lng) {
        }
    }, [pinned?.lat, pinned?.lng]);

    return (
        <View className="flex-1 bg-gray-100">
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
                        <Text className="text-white text-base font-semibold">Nearest Evacuation Center</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 pt-6">
                <TouchableOpacity
                    className="bg-blue-100 rounded-lg p-4 mb-2 flex-row items-center"
                    onPress={() =>
                        router.push({
                            pathname: "/VictimUser/pin_location",
                            params: { returnTo: "/VictimUser/nearest_evacuation_center" },
                        })
                    }
                >
                    <Text className="text-gray-600 mr-2">📍</Text>
                    <Text className="text-gray-700 flex-1">
                        {pinned ? `Pinned: ${pinned.lat.toFixed(5)}, ${pinned.lng.toFixed(5)}` : "My Location : Open Map"}
                    </Text>
                    <Ionicons name="map" size={20} color="#374151" />
                </TouchableOpacity>

                <Text className="text-center text-gray-500 my-2">Or</Text>

                <View className="bg-blue-100 rounded-lg p-4 mb-6 flex-row items-center">
                    <Text className="text-gray-600 mr-2">🔍</Text>
                    <TextInput
                        className="flex-1 text-gray-700"
                        placeholder="Search Places"
                        placeholderTextColor="#6B7280"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                {centers.map(center => (
                    <TouchableOpacity key={center.id} className="bg-green-500 rounded-xl p-4 mb-4 shadow-sm">
                        <Text className="text-white text-lg font-semibold mb-1">{center.name}</Text>
                        <Text className="text-white text-sm mb-1">
                            {center.distance} • {center.status}
                        </Text>
                        <Text className="text-white text-sm mb-1">Capacity: {center.capacity}</Text>
                        <Text className="text-white text-sm mb-1">Parking: {center.parking}</Text>
                        <Text className="text-white text-sm">Pets: {center.pets}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default NearestEvacuationCenter;
