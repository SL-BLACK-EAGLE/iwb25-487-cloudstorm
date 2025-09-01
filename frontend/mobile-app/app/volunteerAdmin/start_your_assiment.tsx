import React from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { MapPin, Clock, User, Phone } from "lucide-react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"

const shadow = {
    shadowColor: "#8CB9ED",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
}

const StartYourAssignment = () => {
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
                            alignSelf: "center",
                        }}
                    />
                </View>

                <View className="absolute left-0 right-0 top-0 mt-4 px-4 pt-6">
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                        onPress={() => router.back()}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Ionicons name="chevron-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View className="absolute left-0 right-0 mt-6 items-center">
                        <Text className="text-white text-base font-semibold">Start Your Assignment</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 -mt-4" showsVerticalScrollIndicator={false}>
                <View className="mb-6">
                    <Text className="text-gray-700 text-lg font-medium mb-3 text-center">Current Status</Text>

                    <View className="items-center">
                        <LinearGradient
                            colors={["#F6AD55", "#F59E0B"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                width: "78%",
                                borderRadius: 24,
                                paddingVertical: 50,
                                paddingHorizontal: 24,
                                ...shadow,
                            }}
                        >
                            <Text className="text-white text-xl font-bold text-center">Accepted</Text>
                        </LinearGradient>
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity={0.9}
                    className="rounded-xl overflow-hidden mb-6 self-center"
                    style={[shadow, { width: "78%" }]}
                >
                    <LinearGradient
                        colors={["#60A5FA", "#3B82F6"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ paddingVertical: 14, borderRadius: 12 }}
                    >
                        <Text className="text-white text-lg font-semibold text-center">Start Now</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View className="mb-6 px-2">
                    <Text className="text-gray-900 text-base font-semibold text-center">
                        Start Your Assignment Right Now
                    </Text>
                    <Text className="text-gray-600 text-center mt-1">Review your assignment details</Text>
                </View>

                <Text className="text-gray-900 text-lg font-semibold mb-3">Emergency Food Distribution</Text>

                <LinearGradient
                    colors={["#10B981", "#06B6D4"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 18,
                        padding: 16,
                        marginBottom: 16,
                        ...shadow,
                    }}
                >
                    <View style={{ gap: 10 }}>
                        <View className="flex-row items-center">
                            <MapPin size={16} color="white" style={{ marginRight: 8 }} />
                            <Text className="text-white font-medium">City Centre Community Hall</Text>
                        </View>

                        <View className="flex-row items-center">
                            <Clock size={16} color="white" style={{ marginRight: 8 }} />
                            <Text className="text-white">Today, 2:00 PM - 6:00 PM</Text>
                        </View>

                        <View className="flex-row items-center">
                            <User size={16} color="white" style={{ marginRight: 8 }} />
                            <Text className="text-white">
                                <Text className="font-medium">Contact: </Text>Sarah Johnson
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <Phone size={16} color="white" style={{ marginRight: 8 }} />
                            <Text className="text-white">+94 1234 5678</Text>
                        </View>
                    </View>
                </LinearGradient>

                <TouchableOpacity
                    activeOpacity={0.9}
                    className="rounded-xl overflow-hidden mb-10"
                    style={[shadow]}
                >
                    <LinearGradient
                        colors={["#22D3EE", "#06B6D4"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ paddingVertical: 14, borderRadius: 12 }}
                    >
                        <Text className="text-white text-lg font-semibold text-center">Cancel</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default StartYourAssignment
