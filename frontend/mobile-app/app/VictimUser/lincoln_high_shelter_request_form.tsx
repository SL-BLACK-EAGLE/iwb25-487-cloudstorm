"use client"

import React, { useState } from "react"
import {View, Text, TextInput, TouchableOpacity, ScrollView, Image} from "react-native"
import {router} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

const LincolnHighShelterRequestForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        nic: "",
        expectedArrivalDate: "",
        adults: "",
        children: "",
        dogs: "",
        cats: "",
        other: "",
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = () => {
        console.log("Form submitted:", formData)
        router.push('/VictimUser/housing_applications')
    }

    return (
        <View className="flex-1 bg-blue-50">
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
                        <Text className="text-white text-base font-semibold">Temporary Housing</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 pt-6">
                <Text className="text-lg font-semibold text-gray-800 mb-6 text-center">Request Form</Text>

                <Text className="text-base font-medium text-gray-800 mb-4">Head of Household</Text>

                <View className="gap-4 mb-6">
                    <TextInput
                        className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChangeText={(value) => handleInputChange("fullName", value)}
                    />

                    <TextInput
                        className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChangeText={(value) => handleInputChange("phoneNumber", value)}
                        keyboardType="phone-pad"
                    />

                    <TextInput
                        className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800"
                        placeholder="NIC"
                        value={formData.nic}
                        onChangeText={(value) => handleInputChange("nic", value)}
                    />

                    <TextInput
                        className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800"
                        placeholder="Expected arrival date"
                        value={formData.expectedArrivalDate}
                        onChangeText={(value) => handleInputChange("expectedArrivalDate", value)}
                    />
                </View>

                <View className="flex-row justify-between mb-8 gap-4">
                    <View className="flex-1 mr-4">
                        <Text className="text-base font-medium text-gray-800 mb-4">Family/Group Size</Text>

                        <View className="gap-4">
                            <View className="flex-row items-center justify-between">
                                <Text className="text-gray-700">Adults:</Text>
                                <TextInput
                                    className="bg-white border border-blue-200 rounded-lg px-3 py-2 w-16 text-center text-gray-800"
                                    value={formData.adults}
                                    onChangeText={(value) => handleInputChange("adults", value)}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View className="flex-row items-center justify-between">
                                <Text className="text-gray-700">Children:</Text>
                                <TextInput
                                    className="bg-white border border-blue-200 rounded-lg px-3 py-2 w-16 text-center text-gray-800"
                                    value={formData.children}
                                    onChangeText={(value) => handleInputChange("children", value)}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </View>

                    <View className="flex-1">
                        <Text className="text-base font-medium text-gray-800 mb-4">Pets</Text>

                        <View className="gap-4">
                            <View className="flex-row items-center justify-between">
                                <Text className="text-gray-700">Dogs:</Text>
                                <TextInput
                                    className="bg-white border border-blue-200 rounded-lg px-3 py-2 w-16 text-center text-gray-800"
                                    value={formData.dogs}
                                    onChangeText={(value) => handleInputChange("dogs", value)}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View className="flex-row items-center justify-between">
                                <Text className="text-gray-700">Cats:</Text>
                                <TextInput
                                    className="bg-white border border-blue-200 rounded-lg px-3 py-2 w-16 text-center text-gray-800"
                                    value={formData.cats}
                                    onChangeText={(value) => handleInputChange("cats", value)}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View className="flex-row items-center justify-between">
                                <Text className="text-gray-700">Other:</Text>
                                <TextInput
                                    className="bg-white border border-blue-200 rounded-lg px-3 py-2 w-16 text-center text-gray-800"
                                    value={formData.other}
                                    onChangeText={(value) => handleInputChange("other", value)}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity className="bg-blue-600 rounded-lg py-4 mb-8" onPress={handleSubmit}>
                    <Text className="text-white text-center text-lg font-semibold">Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default LincolnHighShelterRequestForm
