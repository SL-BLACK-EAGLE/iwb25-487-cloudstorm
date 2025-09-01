import React from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

const HousingApplications = () => {
    // Change this to "Approved" / "Pending" / "Rejected"
    const status: "Approved" | "Pending" | "Rejected" = "Approved"

    const isApproved = status === "Approved"

    const statusGradient =
        status === "Approved"
            ? ["#22C55E", "#10B981"]
            : status === "Rejected"
                ? ["#EF4444", "#F43F5E"]
                : ["#FBBF24", "#F59E0B"]

    const cardGradient = isApproved ? ["#34D399", "#10B981"] : ["#FDBA74", "#FB923C"]

    const shadow = {
        shadowColor: "#8CB9ED",
        shadowOpacity: 0.25,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
    } as const

    const pillShadow = {
        shadowColor: "#8CB9ED",
        shadowOpacity: 0.35,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 14,
    } as const;

    return (
        <ScrollView className="flex-1" style={{ backgroundColor: "#EAF6FF" }}>
            {/* Wave header (optional) */}
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
                        <Text className="text-white text-base font-semibold">Housing Applications</Text>
                    </View>
                </View>
            </View>

            <View className="px-6 py-8">
                {/* Current Status */}
                <View className="mb-8">
                    <Text className="text-gray-800 text-lg font-medium mb-4 text-center">Current Status</Text>

                    <View style={{ alignItems: "center", marginVertical: 8 }}>
                        <LinearGradient
                            colors={statusGradient as [string, string]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[
                                {
                                    borderRadius: 18,
                                    paddingVertical: 40,
                                    paddingHorizontal: 28,
                                    minWidth: 220,
                                    alignSelf: "center",
                                },
                                pillShadow,
                            ]}
                        >
                            <Text className="text-white text-3xl font-bold text-center">{status}</Text>
                        </LinearGradient>
                    </View>
                </View>

                {/* Shelter details card */}
                <Text className="text-gray-800 text-lg font-medium mb-4 text-center">Lincoln High Shelter</Text>

                <View style={[{ borderRadius: 16, overflow: "hidden" }, shadow]}>
                    <LinearGradient
                        colors={cardGradient as [string, string]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ padding: 16, alignItems: "center" }}
                    >
                        <View className="mb-3">
                            <Text className="text-black font-semibold">
                                Move-in: <Text className="font-normal">Tomorrow 10 AM</Text>
                            </Text>
                        </View>
                        <View className="mb-3">
                            <Text className="text-black font-semibold">
                                Address: <Text className="font-normal">1247 Riverside Pk</Text>
                            </Text>
                        </View>
                        <View className="mb-3">
                            <Text className="text-black font-semibold">
                                Contact: <Text className="font-normal">Agent Davis</Text>
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <Ionicons name="call" size={18} color="#111827" style={{ marginRight: 6 }} />
                            <Text className="text-black font-medium">(555) 234-5678</Text>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </ScrollView>
    )
}

export default HousingApplications
