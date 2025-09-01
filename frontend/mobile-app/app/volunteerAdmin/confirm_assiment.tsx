"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ConfirmAssignment = () => {
    const [transportMethod, setTransportMethod] = useState("own")
    const [specialNotes, setSpecialNotes] = useState("")

    return (
        <View className="flex-1 bg-gray-100">
            <View className="bg-gradient-to-br from-blue-400 to-cyan-500 pt-12 pb-8 px-6 rounded-b-[40px] relative">
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity className="mr-4">
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-semibold">Assignment Confirmation</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 -mt-4">
                <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
                    <View className="items-center mb-6">
                        <View className="w-16 h-16 bg-green-500 rounded-full items-center justify-center mb-4">
                            <Ionicons name="checkmark" size={32} color="white" />
                        </View>
                        <Text className="text-2xl font-bold text-gray-800 mb-2">Almost There!</Text>
                        <Text className="text-gray-600 text-center">Review your assignment details</Text>
                    </View>

                    <View className="bg-green-500 rounded-2xl p-4 mb-6">
                        <Text className="text-white text-lg font-bold mb-3">Emergency Food Distribution</Text>
                        <View className="space-y-2">
                            <View className="flex-row items-center">
                                <Ionicons name="location-outline" size={16} color="white" />
                                <Text className="text-white ml-2">City Center Community Hall</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons name="time-outline" size={16} color="white" />
                                <Text className="text-white ml-2">Today, 2:00 PM - 6:00 PM</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons name="person-outline" size={16} color="white" />
                                <Text className="text-white ml-2">Contact: Sarah Johnson</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons name="call-outline" size={16} color="white" />
                                <Text className="text-white ml-2">+94 1234 5678</Text>
                            </View>
                        </View>
                    </View>

                    <View className="mb-6">
                        <Text className="text-gray-800 font-semibold mb-3">Transportation Method</Text>
                        <View className="space-y-3">
                            <TouchableOpacity className="flex-row items-center" onPress={() => setTransportMethod("own")}>
                                <View
                                    className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                                        transportMethod === "own" ? "border-blue-500 bg-blue-500" : "border-gray-400"
                                    }`}
                                >
                                    {transportMethod === "own" && <View className="w-2 h-2 bg-white rounded-full" />}
                                </View>
                                <Text className="text-gray-800">Own Vehicles</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center" onPress={() => setTransportMethod("public")}>
                                <View
                                    className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                                        transportMethod === "public" ? "border-blue-500 bg-blue-500" : "border-gray-400"
                                    }`}
                                >
                                    {transportMethod === "public" && <View className="w-2 h-2 bg-white rounded-full" />}
                                </View>
                                <Text className="text-gray-800">Public Transport</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="mb-6">
                        <Text className="text-gray-800 font-semibold mb-3">Special Notes (Optional)</Text>
                        <TextInput
                            className="border border-gray-300 rounded-xl p-4 text-gray-800 min-h-[100px]"
                            placeholder="Text area for additional information"
                            placeholderTextColor="#9CA3AF"
                            multiline
                            textAlignVertical="top"
                            value={specialNotes}
                            onChangeText={setSpecialNotes}
                        />
                    </View>
                </View>

                <View className="space-y-3 mb-8">
                    <TouchableOpacity className="bg-blue-500 rounded-xl py-4 items-center">
                        <Text className="text-white font-semibold text-lg">Confirm & Accept Assignment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-teal-500 rounded-xl py-4 items-center">
                        <Text className="text-white font-semibold text-lg">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default ConfirmAssignment
