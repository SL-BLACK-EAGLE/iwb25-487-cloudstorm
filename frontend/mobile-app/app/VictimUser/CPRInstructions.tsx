import {View, Text, TouchableOpacity, ScrollView, Image} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import {router} from "expo-router";
import React from "react";

const CPRInstructions = () => {
    return (
        <View className="flex-1 bg-gray-100">
            {/* Header */}
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
                        <Text className="text-white text-base font-semibold">CPR Instructions</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
                {/* Step 1 */}
                <View className="mb-6">
                    <Text className="text-black text-lg font-semibold mb-3">Step 1 :</Text>
                    <View className="bg-red-500 rounded-2xl p-6 shadow-lg">
                        <Text className="text-white text-lg font-bold mb-2">CHECK RESPONSE</Text>
                        <Text className="text-white text-base leading-relaxed">
                            Tap shoulders firmly{"\n"}
                            Shout "Are you OK?"
                        </Text>
                    </View>
                </View>

                {/* Step 2 */}
                <View className="mb-8">
                    <Text className="text-black text-lg font-semibold mb-3">Step 2 :</Text>
                    <View className="bg-green-500 rounded-2xl p-6 shadow-lg">
                        {/* If no response section */}
                        <View className="mb-6">
                            <Text className="text-black text-base font-bold mb-3">If no response :</Text>
                            <View className="space-y-1">
                                <Text className="text-black text-base">• Check for breathing</Text>
                                <Text className="text-black text-base">• Look for chest movement</Text>
                                <Text className="text-black text-base">• Listen for breath sounds</Text>
                            </View>
                        </View>

                        {/* If not breathing section */}
                        <View>
                            <Text className="text-black text-base font-bold mb-2">If not breathing :</Text>
                            <Text className="text-black text-base font-bold">• IMMEDIATELY start CPR</Text>
                        </View>
                    </View>
                </View>

                {/* Watch Video Demo Button */}
                <TouchableOpacity className="bg-blue-500 rounded-2xl py-4 px-6 shadow-lg">
                    <Text className="text-white text-center text-lg font-semibold">WATCH VIDEO DEMO</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default CPRInstructions
