import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const tileShadow = {
    shadowColor: "#8CB9ED",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
} as const;

type Card = {
    id: number;
    title1: string;
    title2?: string;
    subtitle?: string;
    gradient: readonly [string, string];
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
};

const CARDS: Card[] = [
    {
        id: 1,
        title1: "FIND CLEAN",
        title2: "WATER",
        subtitle: "Drinking/Cooking",
        gradient: ["#FF6B6B", "#FF8A4D"] as const,
        icon: "water",
        onPress: () => router.push('/VictimUser/clean_water_sources'),
    },
    {
        id: 2,
        title1: "EMERGENCY FOOD",
        subtitle: "Shelters/Distribution",
        gradient: ["#FFC746", "#F59E0B"] as const,
        icon: "fast-food",
        onPress: () => router.push("/VictimUser/food_distrubution"),
    },
    {
        id: 3,
        title1: "SUPPLY REQUEST",
        subtitle: "Home delivery",
        gradient: ["#22C55E", "#10B981"] as const,
        icon: "bus",
        onPress: () => router.push("/VictimUser/emergancy_supply_request"),
    },
    {
        id: 4,
        title1: "Your Requests",
        gradient: ["#60A5FA", "#3B82F6"] as const,
        icon: "paper-plane",
        onPress: () => router.push("/VictimUser/your_requset_screen"),
    },
];

const FoodWaterAccess = () => {
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
                        <Text className="text-white text-base font-semibold">Food & Water Access</Text>
                    </View>
                </View>
            </View>

            <View className="flex-1 px-6 pt-6">
                <View className="flex-row flex-wrap justify-between">
                    {CARDS.map((c) => (
                        <TouchableOpacity
                            key={c.id}
                            activeOpacity={0.9}
                            onPress={c.onPress}
                            className="w-[48%] mb-6"
                        >
                            <View className="rounded-2xl overflow-hidden mb-3" style={tileShadow}>
                                <LinearGradient
                                    colors={c.gradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ height: 130, alignItems: "center", justifyContent: "center" }}
                                >
                                    <LinearGradient
                                        colors={["rgba(255,255,255,0.18)", "transparent"]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 26 }}
                                    />
                                    <Ionicons name={c.icon} size={80} color="#fff" />
                                </LinearGradient>
                            </View>

                            <Text className="text-black font-bold text-center text-[13px] leading-4">
                                {c.title1}
                                {c.title2 ? `\n${c.title2}` : ""}
                            </Text>
                            {c.subtitle ? (
                                <Text className="text-gray-600 text-center text-xs mt-1">{c.subtitle}</Text>
                            ) : null}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default FoodWaterAccess;
