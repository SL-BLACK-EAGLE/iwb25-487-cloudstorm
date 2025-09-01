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

const IconTile = ({
                      colors,
                      icon,
                      label,
                      onPress,
                      showPlus,
                  }: {
    colors: string[];
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress?: () => void;
    showPlus?: boolean;
}) => (
    <View className="items-center">
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} className="rounded-[26px] overflow-hidden" style={shadow}>
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 120, height: 120, borderTopRightRadius: 26, borderTopLeftRadius: 26, borderBottomLeftRadius: 10,  borderBottomRightRadius: 10, padding: 14, justifyContent: "center", alignItems: "center", marginTop: 100 }}
            >
                <LinearGradient
                    colors={["rgba(255,255,255,0.20)", "transparent"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, height: 28 }}
                />
                <Ionicons name={icon} size={44} color="#fff" />
                {showPlus && (
                    <View style={{ position: "absolute", top: 10, right: 10, width: 22, height: 22, borderRadius: 11, backgroundColor: "rgba(255,255,255,0.85)", alignItems: "center", justifyContent: "center" }}>
                        <Ionicons name="add" size={16} color="#ff3b5c" />
                    </View>
                )}
            </LinearGradient>
        </TouchableOpacity>
        <Text className="text-black text-m font-extrabold text-center mt-2 w-[130px]">
            {label}
        </Text>
    </View>
);

const MedicalEmergency = () => {
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
                        <Text className="text-white text-base font-semibold">Medical Emergency</Text>
                    </View>
                </View>
            </View>

            <View className="px-6 pt-4">
                <Text className="text-gray-800 mb-6 text-xl font-semibold mt-2">
                    Life-threatening situation requires immediate help
                </Text>

                <View className="flex-row justify-center gap-4">
                    <IconTile
                        colors={["#FF5B7F", "#FF7B55"]}
                        icon="bed"
                        label={"FIND HOSPITAL\n(Nearest ER)"}
                        showPlus
                        onPress={() => {
                            router.push("/VictimUser/find_nearest_hospital");
                        }}
                    />

                    <IconTile
                        colors={["#FFC13A", "#F59E0B"]}
                        icon="medkit"
                        label={"First Aid\nInstructions"}
                        onPress={() => {
                            router.push("/VictimUser/first_aid_instruction");
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default MedicalEmergency;
