import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
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

type Card = {
    id: number;
    title: string;
    subtitle: string;
    gradient: readonly [string, string];
    icon: keyof typeof Ionicons.glyphMap;
};

const CARDS: Card[] = [
    { id: 1, title: "CPR & CHOKING",     subtitle: "No pulse/breathing",  gradient: ["#FF6B6B", "#FF7F50"] as const, icon: "pulse" },
    { id: 2, title: "SEVERE BLEEDING",   subtitle: "Control blood loss",  gradient: ["#FFC44D", "#F59E0B"] as const, icon: "water" },
    { id: 3, title: "FRACTURES & TRAUMA",subtitle: "Broken bones, head",  gradient: ["#22C55E", "#10B981"] as const, icon: "bandage" },
    { id: 4, title: "BURNS & SHOCK",     subtitle: "Heat, electrical, cold", gradient: ["#60A5FA", "#3B82F6"] as const, icon: "flame" },
];

const FirstAidInstructions = () => {
    const handleOpen = (id: number) => {
        switch (id) {
            case 1: router.push("/VictimUser/CPRInstructions"); break;
            case 2: router.push("/VictimUser/severe_bleeding"); break;
            case 3: router.push("/VictimUser/fractures_trauma"); break;
            case 4: router.push("/VictimUser/burns_electrical"); break;
            default: break;
        }
    };

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
                        <Text className="text-white text-base font-semibold">First Aid Instructions</Text>
                    </View>
                </View>
            </View>

            <View className="flex-1 px-6 pt-6 mt-10">
                <View className="flex-row flex-wrap justify-between">
                    {CARDS.map((c) => (
                        <TouchableOpacity
                            key={c.id}
                            activeOpacity={0.9}
                            onPress={() => handleOpen(c.id)}
                            className="rounded-2xl overflow-hidden mb-6"
                            style={[{ width: "47%", minHeight: 150 }, shadow]}
                        >
                            <LinearGradient colors={c.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1, padding: 14 }}>
                                <LinearGradient
                                    colors={["rgba(255,255,255,0.18)", "transparent"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ position: "absolute", top: 0, left: 0, right: 0, height: 26 }}
                                />

                                <View className="items-center mb-3">
                                    <View className="w-12 h-12 rounded-xl bg-white/30 items-center justify-center" style={{ marginTop: 20 }}>
                                        <Ionicons name={c.icon} size={40} color="#fff" />
                                    </View>
                                </View>

                                <View className="flex-1 justify-center">
                                    <Text className="text-white font-extrabold text-[12px] leading-4 mb-1 text-center">{c.title}</Text>
                                    <Text className="text-white/90 text-[11px] text-center">{c.subtitle}</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default FirstAidInstructions;
