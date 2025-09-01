import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
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

const requests = [
    { id: 1, type: "EMERGENCY FOOD (Shelters/Distribution)", status: "PENDING" },
    { id: 2, type: "EMERGENCY FOOD (Shelters/Distribution)", status: "PENDING" },
    { id: 3, type: "EMERGENCY FOOD (Shelters/Distribution)", status: "PENDING" },
];

const YourRequestsScreen = () => {
    return (
        <View className="flex-1" style={{ backgroundColor: "#EAF6FF" }}>
            <View className="relative">
                <View style={{ height: 100, overflow: "hidden" }}>
                    <Image
                        source={require("../../assets/images/donation_type_top_bg.png")}
                        resizeMode="stretch"
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: "110%",
                            height: 100,
                        }}
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
                        <Text className="text-white text-base font-semibold">Your Requests</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-4 pt-6"
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                {requests.map((r) => (
                    <View key={r.id} className="rounded-2xl overflow-hidden mb-4" style={shadow}>
                        <LinearGradient
                            colors={["#f11b6a", "#f11a1a"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{ padding: 16 }}
                        >
                            <LinearGradient
                                colors={["rgba(255,255,255,0.18)", "transparent"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ position: "absolute", top: 0, left: 0, right: 0, height: 26 }}
                            />

                            <Text className="text-white font-semibold text-[13px] mb-8">
                                {r.type}
                            </Text>

                            <View className="flex-row items-center">
                                <Text className="text-white/95 font-medium mr-4">Status:</Text>
                                <View className="bg-white/15 px-10 py-2 rounded-xl">
                                    <Text className="text-white font-semibold tracking-wide">{r.status}</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default YourRequestsScreen;
