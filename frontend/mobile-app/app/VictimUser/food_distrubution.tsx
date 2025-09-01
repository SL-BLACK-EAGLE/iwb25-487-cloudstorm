"use client"

import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const cardShadow = {
    shadowColor: "#8CB9ED",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
} as const;

type Center = {
    id: number;
    name: string;
    distance: string;
    location?: string;
    status: string;
    capacity?: string;
    parking: string;
    pets: string;
    gradient: readonly [string, string];
};

const FoodDistribution = () => {
    const [searchText, setSearchText] = useState("");

    const distributionCenters: Center[] = [
        {
            id: 1,
            name: "Red Cross Water Truck",
            distance: "0.3 mi",
            location: "Lincoln Park",
            status: "Available: 9AM-5PM",
            parking: "Parking Available",
            pets: "Pets Welcome",
            gradient: ["#22C55E", "#10B981"] as const,
        },
        {
            id: 2,
            name: "Ragama Church",
            distance: "0.8 mi",
            status: "OPEN",
            capacity: "Capacity: 147/200",
            parking: "Parking Available",
            pets: "Pets Welcome",
            gradient: ["#22C55E", "#10B981"] as const,
        },
        {
            id: 3,
            name: "Lincoln High School",
            distance: "0.8 mi",
            status: "OPEN",
            capacity: "Capacity: 147/200",
            parking: "Parking Available",
            pets: "Pets Welcome",
            gradient: ["#22C55E", "#10B981"] as const,
        },
    ];

    const filtered = useMemo(() => {
        const q = searchText.trim().toLowerCase();
        if (!q) return distributionCenters;
        return distributionCenters.filter((c) =>
            `${c.name} ${c.location ?? ""}`.toLowerCase().includes(q)
        );
    }, [searchText]);

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
                        <Text className="text-white text-base font-semibold">Food Distribution</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    className="bg-white rounded-xl p-4 mb-3 flex-row items-center"
                    style={{ shadowColor: "#8CB9ED", shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4 }}
                >
                    <Ionicons name="location" size={18} color="#6B7280" />
                    <Text className="text-gray-700 text-base ml-2">My Location : Open Map</Text>
                </TouchableOpacity>

                <View
                    className="bg-white rounded-xl p-3 mb-6 flex-row items-center"
                    style={{ shadowColor: "#8CB9ED", shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4 }}
                >
                    <Ionicons name="search" size={18} color="#9CA3AF" />
                    <TextInput
                        className="flex-1 text-gray-700 text-base ml-2"
                        placeholder="Search Places"
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="search"
                    />
                    {searchText.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchText("")}>
                            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                        </TouchableOpacity>
                    )}
                </View>

                {filtered.map((c) => {
                    const meta = [c.distance, c.location].filter(Boolean).join(" • ");
                    return (
                        <TouchableOpacity key={c.id} activeOpacity={0.9} className="rounded-2xl overflow-hidden mb-4" style={cardShadow}>
                            <LinearGradient colors={c.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ padding: 16 }}>
                                <LinearGradient
                                    colors={["rgba(255,255,255,0.18)", "transparent"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ position: "absolute", top: 0, left: 0, right: 0, height: 24 }}
                                />
                                <Text className="text-white text-lg font-semibold mb-1">{c.name}</Text>
                                {!!meta && <Text className="text-white/90 text-sm mb-1">{meta}</Text>}
                                <Text className="text-white/95 text-sm mb-1">{c.status}</Text>
                                {c.capacity ? <Text className="text-white/95 text-sm mb-1">{c.capacity}</Text> : null}
                                <Text className="text-white/95 text-sm mb-1">{c.parking}</Text>
                                <Text className="text-white/95 text-sm">{c.pets}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    );
                })}

                {filtered.length === 0 && (
                    <View className="bg-white rounded-xl p-6 items-center" style={{ shadowColor: "#8CB9ED", shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4 }}>
                        <Text className="text-gray-600">No sources match your search.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default FoodDistribution;
