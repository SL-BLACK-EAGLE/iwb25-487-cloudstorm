"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native"
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";

const EmergencySupplyRequest = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        streetAddress: "",
        city: "",
        adults: "3",
        children: "5",
        infants: "2",
        elderly: "2",
    })

    const [priorityLevel, setPriorityLevel] = useState("CRITICAL")

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        console.log("Emergency supply request submitted:", { ...formData, priorityLevel })
    }

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
                        <Text className="text-white text-base font-semibold">Emergency Supply Request</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
                {/* Household Information */}
                <Text className="text-gray-800 text-lg font-semibold mb-4">HOUSEHOLD INFORMATION</Text>

                {/* Contact Person */}
                <Text className="text-gray-700 text-base font-medium mb-2">Contact Person:</Text>
                <TextInput
                    className="bg-white border border-blue-200 rounded-lg px-4 py-3 mb-4 text-gray-700"
                    placeholder="Full Name..."
                    value={formData.fullName}
                    onChangeText={(value) => handleInputChange("fullName", value)}
                />

                <TextInput
                    className="bg-white border border-blue-200 rounded-lg px-4 py-3 mb-4 text-gray-700"
                    placeholder="Phone Number..."
                    value={formData.phoneNumber}
                    onChangeText={(value) => handleInputChange("phoneNumber", value)}
                    keyboardType="phone-pad"
                />

                {/* Address */}
                <Text className="text-gray-700 text-base font-medium mb-2">Address:</Text>
                <TextInput
                    className="bg-white border border-blue-200 rounded-lg px-4 py-3 mb-4 text-gray-700"
                    placeholder="Street Address..."
                    value={formData.streetAddress}
                    onChangeText={(value) => handleInputChange("streetAddress", value)}
                />

                <TextInput
                    className="bg-white border border-blue-200 rounded-lg px-4 py-3 mb-6 text-gray-700"
                    placeholder="City"
                    value={formData.city}
                    onChangeText={(value) => handleInputChange("city", value)}
                />

                {/* Household Size */}
                <Text className="text-gray-700 text-base font-medium mb-4">Household Size:</Text>

                <View className="gap-4 mb-6">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-gray-700 text-base">Adults:</Text>
                        <TextInput
                            className="bg-white border border-blue-200 rounded-lg px-3 py-2 w-16 text-center text-gray-700"
                            value={formData.adults}
                            onChangeText={(value) => handleInputChange("adults", value)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View className="flex-row items-center justify-between">
                        <Text className="text-gray-700 text-base">Children:</Text>
                        <TextInput
                            className="bg-white border border-blue-200 rounded-lg px-3 py-2 w-16 text-center text-gray-700"
                            value={formData.children}
                            onChangeText={(value) => handleInputChange("children", value)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View className="flex-row items-center justify-between">
                        <Text className="text-gray-700 text-base">Infants:</Text>
                        <TextInput
                            className="bg-white border border-blue-200 rounded-lg px-3 py-2 w-16 text-center text-gray-700"
                            value={formData.infants}
                            onChangeText={(value) => handleInputChange("infants", value)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View className="flex-row items-center justify-between">
                        <Text className="text-gray-700 text-base">Elderly:</Text>
                        <TextInput
                            className="bg-white border border-blue-200 rounded-lg px-3 py-2 w-16 text-center text-gray-700"
                            value={formData.elderly}
                            onChangeText={(value) => handleInputChange("elderly", value)}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                {/* Priority Level */}
                <View className="bg-green-500 rounded-lg p-4 mb-6">
                    <Text className="text-white text-base font-semibold mb-3">Priority Level:</Text>

                    <TouchableOpacity className="flex-row items-center mb-2" onPress={() => setPriorityLevel("CRITICAL")}>
                        <View
                            className={`w-4 h-4 rounded-full border-2 border-white mr-3 ${priorityLevel === "CRITICAL" ? "bg-white" : ""}`}
                        />
                        <Text className="text-white text-sm font-medium">CRITICAL - No food/water</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center mb-2" onPress={() => setPriorityLevel("URGENT")}>
                        <View
                            className={`w-4 h-4 rounded-full border-2 border-white mr-3 ${priorityLevel === "URGENT" ? "bg-white" : ""}`}
                        />
                        <Text className="text-white text-sm font-medium">URGENT - &lt;24hrs supplies</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center" onPress={() => setPriorityLevel("MODERATE")}>
                        <View
                            className={`w-4 h-4 rounded-full border-2 border-white mr-3 ${priorityLevel === "MODERATE" ? "bg-white" : ""}`}
                        />
                        <Text className="text-white text-sm font-medium">MODERATE - 1-2 day supply</Text>
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <TouchableOpacity className="bg-blue-500 rounded-lg py-4 mb-8" onPress={handleSubmit}>
                    <Text className="text-white text-center text-lg font-semibold">Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default EmergencySupplyRequest
