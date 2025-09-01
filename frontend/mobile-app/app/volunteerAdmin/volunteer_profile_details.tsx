"use client"

import React, { useState } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Platform,
    Pressable,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import DateTimePickerModal from "react-native-modal-datetime-picker";

const VolunteerProfileDetails: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "Rashmika",
        lastName: "Gunathilaka",
        mobile: "0701448908",
        gender: "male",
        dateOfBirth: "2002/10/05",
        language: "English",
    })

    const [skills, setSkills] = useState(["Emergency Response", "Heavy Lifting"])
    const [showGenderDropdown, setShowGenderDropdown] = useState(false)
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)

    const [dobPickerOpen, setDobPickerOpen] = useState(false)

    const genderOptions = ["male", "female", "other"]
    const languageOptions = ["English", "Sinhala", "Tamil"]

    const handleInputChange = (field: keyof typeof formData, value: string) =>
        setFormData(prev => ({ ...prev, [field]: value }))

    const removeSkill = (skillToRemove: string) =>
        setSkills(prev => prev.filter(skill => skill !== skillToRemove))

    const formatDate = (d: Date) => {
        const yy = d.getFullYear()
        const mm = String(d.getMonth() + 1).padStart(2, "0")
        const dd = String(d.getDate()).padStart(2, "0")
        return `${yy}/${mm}/${dd}`
    }

    return (
        <View className="flex-1 bg-[#E8F5FB]">
            <View className="relative">
                <View className="h-48 mt-2 mx-2 relative">
                    <Image
                        source={require("../../assets/images/blue-glasses.png")}
                        className="w-full"
                        resizeMode="cover"
                    />

                    <View className="absolute left-0 right-0 top-0 px-4 pt-6 mt-4">
                        <TouchableOpacity
                            className="w-10 h-10 rounded-full bg-black/30 items-center justify-center"
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="chevron-back" size={22} color="#fff" />
                        </TouchableOpacity>

                        <View className="absolute left-0 right-0 items-center mt-8">
                            <Text className="text-white text-xl font-semibold">Volunteer Profile Details</Text>
                        </View>
                    </View>
                </View>

                <View className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                    <View className="w-24 h-24 bg-white rounded-full items-center justify-center shadow-lg">
                        <View className="w-20 h-20 rounded-full items-center justify-center overflow-hidden">
                            <Image
                                source={require("../../assets/images/profile-avator.png")}
                                className="w-20 h-20 rounded-full"
                                resizeMode="cover"
                            />
                        </View>
                    </View>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-6"
                contentContainerStyle={{ paddingTop: 56, paddingBottom: 28 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginBottom: 24, marginTop:10 }}>
                    <View className="flex-row" style={{ marginBottom: 12 }}>
                        <View className="flex-1" style={{ marginRight: 8 }}>
                            <Text className="text-gray-700 text-sm mb-2">First name:</Text>
                            <TextInput
                                value={formData.firstName}
                                onChangeText={v => handleInputChange("firstName", v)}
                                className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800"
                                placeholder="First name"
                            />
                        </View>
                        <View className="flex-1" style={{ marginLeft: 8 }}>
                            <Text className="text-gray-700 text-sm mb-2">Last name:</Text>
                            <TextInput
                                value={formData.lastName}
                                onChangeText={v => handleInputChange("lastName", v)}
                                className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800"
                                placeholder="Last name"
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text className="text-gray-700 text-sm mb-2">Mobile:</Text>
                        <TextInput
                            value={formData.mobile}
                            onChangeText={v => handleInputChange("mobile", v)}
                            className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800"
                            placeholder="Mobile number"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text className="text-gray-700 text-sm mb-2">Gender:</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowGenderDropdown(s => !s)
                                setShowLanguageDropdown(false)
                            }}
                            className="bg-white border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                        >
                            <Text className="text-gray-800 capitalize">{formData.gender}</Text>
                            <Ionicons name="chevron-down" size={20} color="#666" />
                        </TouchableOpacity>
                        {showGenderDropdown && (
                            <View className="bg-white border border-blue-200 rounded-lg mt-2 overflow-hidden">
                                {genderOptions.map(option => (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => {
                                            handleInputChange("gender", option)
                                            setShowGenderDropdown(false)
                                        }}
                                        className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                                    >
                                        <Text className="text-gray-800 capitalize">{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text className="text-gray-700 text-sm mb-2">Date of Birth:</Text>
                        <Pressable
                            onPress={() => setDobPickerOpen(true)}
                            className="bg-white border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                        >
                            <Text className="text-gray-800">{formData.dateOfBirth || "YYYY/MM/DD"}</Text>
                            <Ionicons name="calendar-outline" size={20} color="#666" />
                        </Pressable>
                    </View>

                    <View>
                        <Text className="text-gray-700 text-sm mb-2">Language:</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowLanguageDropdown(s => !s)
                                setShowGenderDropdown(false)
                            }}
                            className="bg-white border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                        >
                            <Text className="text-gray-800">{formData.language}</Text>
                            <Ionicons name="chevron-down" size={20} color="#666" />
                        </TouchableOpacity>
                        {showLanguageDropdown && (
                            <View className="bg-white border border-blue-200 rounded-lg mt-2 overflow-hidden">
                                {languageOptions.map(option => (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => {
                                            handleInputChange("language", option)
                                            setShowLanguageDropdown(false)
                                        }}
                                        className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                                    >
                                        <Text className="text-gray-800">{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>

                <View style={{ marginBottom: 24 }}>
                    <Text className="text-gray-800 text-lg font-semibold mb-3">Verification Process</Text>
                    <View className="flex-row">
                        <View className="flex-1" style={{ marginRight: 8 }}>
                            <View className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 items-center justify-center h-24">
                                <Ionicons name="image-outline" size={32} color="#666" />
                            </View>
                            <Text className="text-center text-gray-600 text-sm mt-2">Front side</Text>
                        </View>
                        <View className="flex-1" style={{ marginLeft: 8 }}>
                            <View className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 items-center justify-center h-24">
                                <Ionicons name="image-outline" size={32} color="#666" />
                            </View>
                            <Text className="text-center text-gray-600 text-sm mt-2">Back side</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: 24 }}>
                    <Text className="text-gray-800 text-lg font-semibold mb-3">Skills &amp; Expertise</Text>
                    <View className="flex-row flex-wrap" style={{ gap: 8 }}>
                        {skills.map(skill => (
                            <View
                                key={skill}
                                className="px-4 py-2 rounded-full flex-row items-center"
                                style={{ backgroundColor: skill === "Emergency Response" ? "#EF4444" : "#3B82F6" }}
                            >
                                <Text className="text-white text-sm font-medium mr-2">{skill}</Text>
                                <TouchableOpacity onPress={() => removeSkill(skill)}>
                                    <Ionicons name="close" size={16} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={{ marginBottom: 24 }}>
                    <Text className="text-gray-800 text-lg font-semibold mb-3">Transportation</Text>
                    <View className="bg-white rounded-lg p-4 border border-blue-200">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                            <Text className="text-gray-800 font-medium ml-2">Own Vehicle Available</Text>
                        </View>
                        <Text className="text-gray-600 text-sm">Capacity: 4</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 28 }}>
                    <Text className="text-gray-800 text-lg font-semibold mb-3">Certifications &amp; Training</Text>
                    <View className="bg-blue-500 rounded-lg px-4 py-2 self-start">
                        <Text className="text-white text-sm font-medium">First Aid Certified</Text>
                    </View>
                </View>

                <TouchableOpacity className="bg-blue-500 rounded-lg py-4 items-center mb-8">
                    <Text className="text-white text-lg font-semibold">Fill Your Profile</Text>
                </TouchableOpacity>
            </ScrollView>

            <DateTimePickerModal
                isVisible={dobPickerOpen}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onConfirm={(date) => {
                    handleInputChange("dateOfBirth", formatDate(date))
                    setDobPickerOpen(false)
                }}
                onCancel={() => setDobPickerOpen(false)}
            />
        </View>
    )
}

export default VolunteerProfileDetails
