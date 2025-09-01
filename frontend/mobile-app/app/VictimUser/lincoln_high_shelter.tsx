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
} as const

const Row = ({ k, v }: { k: string; v: string }) => (
    <View className="flex-row mb-2">
        <Text className="text-white/90 w-28">{k}</Text>
        <Text className="text-white/60 mx-2">:</Text>
        <Text className="text-white font-medium flex-1">{v}</Text>
    </View>
)

const LincolnHighShelter = () => {
    return (
        <View className="flex-1" style={{ backgroundColor: "#EAF6FF" }}>
            {/* Header (wave) */}
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
                        <Text className="text-white text-base font-semibold">Lincoln High Shelter</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
                {/* Place Details */}
                <View className="rounded-2xl overflow-hidden mb-6" style={shadow}>
                    <LinearGradient
                        colors={["#34d399", "#10b981"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ padding: 16 }}
                    >
                        <Text className="text-white text-lg font-semibold mb-4">Place Details</Text>
                        <Row k="Place" v="Lincoln High Shelter" />
                        <Row k="Mileage" v="0.8 mi" />
                        <Row k="Parking" v="Available" />
                        <Row k="Pets" v="Welcome" />
                        <Row k="Meals" v="Available" />
                    </LinearGradient>
                </View>

                {/* Images */}
                <Text className="text-gray-800 text-base font-semibold mb-3">Images</Text>
                <View className="flex-row justify-between mb-8">
                    {[1, 2, 3].map((i) => (
                        <View
                            key={i}
                            className="w-20 h-20 bg-white rounded-xl items-center justify-center"
                            style={{
                                borderWidth: 2,
                                borderColor: "#E5E7EB",
                                shadowColor: "#000",
                                shadowOpacity: 0.1,
                                shadowRadius: 8,
                                shadowOffset: { width: 0, height: 4 },
                                elevation: 5,
                            }}
                        >
                            <Ionicons name="image-outline" size={26} color="#6B7280" />
                        </View>
                    ))}
                </View>

                {/* Location + Meals */}
                <View className="flex-row mb-8">
                    <View className="flex-1 mr-3">
                        <Text className="text-gray-800 text-base font-semibold mb-2">View Location</Text>
                        <View className="w-14 h-14 rounded-full items-center justify-center" style={{ backgroundColor: "#EF4444" }}>
                            <Ionicons name="location" size={26} color="#fff" />
                        </View>
                    </View>
                    <View className="flex-1 ml-3">
                        <Text className="text-gray-800 text-base font-semibold mb-2">Meal Schedule</Text>
                        <Text className="text-gray-700 mb-1">• Dinner: 6:00 PM</Text>
                        <Text className="text-gray-700 mb-1">• Breakfast: 7:00 AM</Text>
                        <Text className="text-gray-700">• Lunch: 12:00 PM</Text>
                    </View>
                </View>

                {/* Facilities */}
                <View className="rounded-2xl overflow-hidden mb-8" style={shadow}>
                    <LinearGradient
                        colors={["#fbbf24", "#f59e0b"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ padding: 16 }}
                    >
                        <Text className="text-white text-lg font-semibold mb-3">Facilities</Text>
                        <Text className="text-white mb-1">• Restrooms: Hallway B</Text>
                        <Text className="text-white mb-1">• Showers: 6AM–10PM</Text>
                        <Text className="text-white mb-1">• Laundry: 2nd Floor</Text>
                        <Text className="text-white">• Charging Station: Available</Text>
                    </LinearGradient>
                </View>

                {/* Actions */}
                <TouchableOpacity
                    activeOpacity={0.9}
                    className="rounded-xl py-3 px-4 mb-4 items-center"
                    style={{ backgroundColor: "#ec4899", ...shadow }}
                >
                    <Text className="text-white font-semibold">Contact Us : 0710632050</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/VictimUser/lincoln_high_shelter_request_form")}
                    activeOpacity={0.9}
                    className="rounded-xl overflow-hidden mb-10"
                    style={shadow}
                >
                    <LinearGradient
                        colors={["#60A5FA", "#3B82F6"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ paddingVertical: 12 }}
                    >
                        <Text className="text-white text-center text-base font-semibold">Apply Now</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default LincolnHighShelter
