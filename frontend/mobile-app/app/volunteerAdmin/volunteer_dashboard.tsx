import React from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"

const shadow = {
    shadowColor: "#8CB9ED",
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
}

const StatCard = ({
                      value,
                      label,
                      colors,
                  }: {
    value: string
    label: string
    colors: string[]
}) => (
    <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
            {
                borderRadius: 20,
                paddingVertical: 18,
                paddingHorizontal: 20,
                width: 150,
                alignItems: "center",
            },
            shadow,
        ]}
    >
        <Text className="text-white text-4xl font-extrabold">{value}</Text>
        <Text className="text-white/95 mt-2 font-medium">{label}</Text>
    </LinearGradient>
)

const VolunteerDashboard: React.FC = () => {
    return (
        <View className="flex-1 bg-[#E8F5FB]">
            {/* Header */}
            <View className="relative">
                <View style={{  height: 100,  overflow: "hidden" }}>
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
                            alignSelf: "center",
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
                        <Text className="text-white text-base font-semibold">Volunteer Dashboard</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-6"
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                <View
                    className="rounded-2xl px-4 py-4 mb-4 flex-row items-center justify-between"
                    style={[shadow, { backgroundColor: "#DCEFFF" }]}
                >
                    <View>
                        <Text className="text-gray-600">Welcome back</Text>
                        <Text className="text-gray-900 font-semibold">Daniru Dahamneth</Text>
                    </View>
                    <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
                        <Ionicons name="person" size={20} color="#0EA5E9" />
                    </View>
                </View>

                <View className="mb-5 mt-4">
                    <TouchableOpacity
                        activeOpacity={0.9}
                        className="rounded-xl"
                        style={shadow}
                    >
                        <View className="rounded-xl px-4 py-3 items-center justify-center" style={{ backgroundColor: "#DC2626" }}>
                            <Text className="text-white font-bold tracking-wide">EMERGENCY MODE ACTIVE</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-center mt-4 gap-4">
                    <StatCard value="12" label="Hours This Week" colors={["#10B981", "#059669"]} />
                    <StatCard value="95%" label="Match Score" colors={["#60A5FA", "#3B82F6"]} />
                </View>

                <Text className="text-gray-700 mt-4">Urgent Tasks Near You</Text>

                <View className="gap-3 mt-4">
                    {[1, 2].map(i => (
                        <View
                            key={i}
                            className="bg-white rounded-2xl px-4 py-4 border border-gray-100"
                            style={shadow}
                        >
                            <Text className="text-gray-900 font-semibold">Medical Supply Delivery</Text>
                            <Text className="text-gray-600 text-sm mt-1">Downtown Community Center</Text>
                        </View>
                    ))}
                </View>

                <View className="gap-3 mt-4">
                    <TouchableOpacity activeOpacity={0.9} className="rounded-xl overflow-hidden" style={shadow}>
                        <LinearGradient colors={["#60A5FA", "#3B82F6"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ paddingVertical: 14 }}>
                            <Text className="text-white text-center font-semibold">View All Available Tasks</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.9} className="rounded-xl overflow-hidden" style={shadow}>
                        <LinearGradient colors={["#93C5FD", "#60A5FA"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ paddingVertical: 14 }}>
                            <Text className="text-white text-center font-semibold">Saved Tasks</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.9} className="rounded-xl overflow-hidden" style={shadow}>
                        <LinearGradient colors={["#3B82F6", "#2563EB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ paddingVertical: 14 }}>
                            <Text className="text-white text-center font-semibold">Your Tasks</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    )
}

export default VolunteerDashboard
