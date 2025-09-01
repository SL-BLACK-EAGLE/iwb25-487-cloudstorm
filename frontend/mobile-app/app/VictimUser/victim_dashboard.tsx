import React from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"

const shadow = {
    shadowColor: "#8CB9ED",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
}

const Tile = ({
                  colors,
                  icon,
                  title,
                  subtitle,
                  onPress,
              }: {
    colors: string[]
    icon: keyof typeof Ionicons.glyphMap
    title: string
    subtitle: string
    onPress?: () => void
}) => (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} className="rounded-2xl overflow-hidden mb-4" style={shadow}>
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 16 }}
        >
            <LinearGradient
                colors={["rgba(255,255,255,0.18)", "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ position: "absolute", top: 0, left: 0, right: 0, height: 28 }}
            />
            <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-2xl bg-white/25 items-center justify-center mr-4">
                    <Ionicons name={icon} size={24} color="#fff" />
                </View>
                <View className="flex-1">
                    <Text className="text-white text-base font-extrabold tracking-wide">{title}</Text>
                    <Text className="text-white/85 text-xs mt-1">{subtitle}</Text>
                </View>
            </View>
        </LinearGradient>
    </TouchableOpacity>
)

const VictimDashboard = () => {
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
                        <Text className="text-white text-base font-semibold">Victim Dashboard</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 -mt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
                <View className="bg-white rounded-2xl py-6 mb-6 items-center mt-10" style={shadow}>
                    <Text className="text-lg font-semibold text-gray-900 mb-1">Emergency Hub</Text>
                    <Text className="text-gray-600 mb-4">Get help when you need it most</Text>
                    <TouchableOpacity activeOpacity={0.9} className="rounded-xl overflow-hidden self-center">
                        <LinearGradient
                            colors={["#60A5FA", "#2563EB"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 }}
                        >
                            <Text className="text-white font-bold tracking-wide">CALL 119 NOW</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <Text className="text-gray-900 text-base font-semibold mb-3">What type of help do you need?</Text>

                <Tile
                    colors={["#3B82F6", "#2563EB"]}
                    icon="heart"
                    title="MEDICAL EMERGENCY"
                    subtitle="Life-threatening situation"
                    onPress={() => router.push('/VictimUser/medical_emergency')}
                />

                <Tile
                    colors={["#10B981", "#06B6D4"]}
                    icon="home"
                    title="SHELTER & HOUSING"
                    subtitle="Safe place to stay"
                    onPress={() => router.push('/VictimUser/shelter_housing')}
                />

                <Tile
                    colors={["#F59E0B", "#F97316"]}
                    icon="water"
                    title="FOOD & WATER"
                    subtitle="Basic necessities"
                    onPress={() => router.push('/VictimUser/food_water_access')}
                />
            </ScrollView>
        </View>
    )
}

export default VictimDashboard
