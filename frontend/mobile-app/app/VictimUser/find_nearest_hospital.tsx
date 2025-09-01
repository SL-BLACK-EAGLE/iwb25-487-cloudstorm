import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const shadow = {
    shadowColor: "#8CB9ED",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
} as const;

const FindNearestHospital = () => {
    const [location, setLocation] = useState("My Location : Open Map and Pin Location");

    const hospitals = [
        {
            id: 1,
            name: "Ragama Hospital",
            route: "Via Highway 17 North",
            distance: "4.2 mi",
            time: "6 minutes",
            gradient: ["#10B981", "#06B6D4"] as const, // green → teal
            phone: "0112345678",
        },
        {
            id: 2,
            name: "Colombo Hospital",
            route: "Via Highway 17 North",
            distance: "4.2 mi",
            time: "6 minutes",
            gradient: ["#F59E0B", "#F97316"] as const, // orange → amber
            phone: "0119876543",
        },
    ];

    const callNumber = (num: string) => Linking.openURL(`tel:${num}`);

    return (
        <View className="flex-1" style={{ backgroundColor: "#EAF6FF" }}>
            <View className="relative">
                <View style={{ height: 100, overflow: "hidden" }}>
                    <Image
                        source={require("../../assets/images/donation_type_top_bg.png")}
                        resizeMode="stretch"
                        style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "110%", height: 100 }}
                    />
                </View>

                <View className="absolute left-0 right-0 top-0 mt-4 px-4 pt-6">
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <View className="absolute left-0 right-0 mt-6 items-center">
                        <Text className="text-white text-base font-semibold">Find Nearest Hospital</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 -mt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
                {/* Location input (pill) */}
                <View className="bg-white rounded-xl px-4 py-3 mb-3" style={shadow}>
                    <View className="flex-row items-center">
                        <Ionicons name="location-outline" size={18} color="#6B7280" />
                        <TextInput
                            value={location}
                            onChangeText={setLocation}
                            className="flex-1 ml-2 text-gray-700"
                            placeholder="My Location : Open Map and Pin Location"
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>
                </View>

                {/* Search button (gradient) */}
                <TouchableOpacity activeOpacity={0.9} className="rounded-xl overflow-hidden mb-6" style={shadow}>
                    <LinearGradient
                        colors={["#60A5FA", "#2563EB"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ paddingVertical: 12, borderRadius: 12 }}
                    >
                        <Text className="text-white text-center text-lg font-semibold">Search Hospital</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View className="gap-4">
                    {hospitals.map((h) => (
                        <View key={h.id} className="rounded-2xl overflow-hidden" style={shadow}>
                            <LinearGradient
                                colors={h.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ padding: 16 }}
                            >
                                <LinearGradient
                                    colors={["rgba(255,255,255,0.16)", "transparent"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ position: "absolute", top: 0, left: 0, right: 0, height: 24 }}
                                />

                                <View className="flex-row items-center justify-between">
                                    <View className="flex-1 pr-3">
                                        <Text className="text-white text-lg font-extrabold mb-1">{h.name}</Text>
                                        <Text className="text-white/95 text-sm mb-1">{h.route}</Text>
                                        <Text className="text-white/95 text-sm mb-1">{h.distance}</Text>
                                        <Text className="text-white/95 text-sm">{h.time}</Text>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => callNumber(h.phone)}
                                        activeOpacity={0.8}
                                        className="w-12 h-12 rounded-2xl bg-white items-center justify-center"
                                        style={{
                                            shadowColor: "#000",
                                            shadowOpacity: 0.15,
                                            shadowRadius: 6,
                                            shadowOffset: { width: 0, height: 3 },
                                            elevation: 5,
                                        }}
                                    >
                                        <Ionicons name="call" size={22} color="#2563EB" />
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default FindNearestHospital;
