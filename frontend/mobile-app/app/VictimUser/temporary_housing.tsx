"use client"

import React, { useMemo, useState } from "react"
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"

const shadow = {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
} as const

const DEFAULT_AREA = "Within 20 miles"

const TemporaryHousing = () => {
    const [preferredArea, setPreferredArea] = useState(DEFAULT_AREA)
    const [selectedHousingType, setSelectedHousingType] = useState<string>("")
    const [searchText, setSearchText] = useState("")
    const [showAreaDropdown, setShowAreaDropdown] = useState(false)

    const areaOptions = ["Within 20 miles", "Within 10 miles", "Within 5 miles", "Within 50 miles"]
    const housingTypes = ["Temporary apartments", "Host family placement", "Other"]

    const housingOptions = [
        {
            id: 1,
            title: "Temp Apartment",
            location: "Oak Street Complex",
            available: "3 days",
            duration: "3 months",
            price: "$850/month",
            distance: "2 mi",
            type: "Temporary apartments",
            gradient: ["#34D399", "#10B981"] as [string, string],
        },
        {
            id: 2,
            title: "Host Family",
            location: "Maple Grove",
            available: "Today",
            duration: "1 month",
            price: "Free (screening required)",
            distance: "4.5 mi",
            type: "Host family placement",
            gradient: ["#60A5FA", "#3B82F6"] as [string, string],
        },
        {
            id: 3,
            title: "Community Rooms",
            location: "Riverside Center",
            available: "2 days",
            duration: "6 weeks",
            price: "$150/week",
            distance: "1.7 mi",
            type: "Temporary apartments",
            gradient: ["#FBBF24", "#F59E0B"] as [string, string],
        },
    ]

    const filtered = useMemo(() => {
        const q = searchText.trim().toLowerCase()
        return housingOptions.filter(h => {
            const matchesType = !selectedHousingType || h.type === selectedHousingType
            const matchesSearch =
                q.length === 0 ||
                h.title.toLowerCase().includes(q) ||
                h.location.toLowerCase().includes(q)
            return matchesType && matchesSearch
        })
    }, [searchText, selectedHousingType])

    const handleReset = () => {
        setPreferredArea(DEFAULT_AREA)
        setSelectedHousingType("")
        setSearchText("")
        setShowAreaDropdown(false)
    }

    return (
        <View className="flex-1 bg-blue-50">
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

            <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
                <View className="mb-4">
                    <Text className="text-gray-700 text-sm font-medium mb-2">Preferred Area</Text>
                    <TouchableOpacity
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center"
                        onPress={() => setShowAreaDropdown(!showAreaDropdown)}
                        style={shadow}
                    >
                        <Text className="text-gray-700">{preferredArea}</Text>
                        <Ionicons name="chevron-down" size={18} color="#6B7280" />
                    </TouchableOpacity>

                    {showAreaDropdown && (
                        <View className="bg-white border border-gray-200 rounded-lg mt-1" style={shadow}>
                            {areaOptions.map(opt => (
                                <TouchableOpacity
                                    key={opt}
                                    className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                                    onPress={() => {
                                        setPreferredArea(opt)
                                        setShowAreaDropdown(false)
                                    }}
                                >
                                    <Text className="text-gray-700">{opt}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <View className="mb-2 flex-row items-center justify-between">
                    <Text className="text-gray-700 text-sm font-medium">Housing Type</Text>
                    <TouchableOpacity
                        onPress={handleReset}
                        className="flex-row items-center px-3 py-1 rounded-full bg-white border border-gray-200"
                        style={shadow}
                    >
                        <Ionicons name="refresh" size={14} color="#2563EB" />
                        <Text className="text-blue-600 text-xs font-semibold ml-1">Reset</Text>
                    </TouchableOpacity>
                </View>

                <View className="mb-4">
                    <View className="flex-row flex-wrap gap-4">
                        {["Temporary apartments", "Host family placement", "Other"].map(type => {
                            const active = selectedHousingType === type
                            return (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => setSelectedHousingType(type)}
                                    className={`px-4 py-2 rounded-full border ${
                                        active ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
                                    }`}
                                    style={shadow}
                                >
                                    <Text className={`text-sm ${active ? "text-white" : "text-gray-700"}`}>{type}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                <Text className="text-center text-gray-500 text-sm mb-4">Or</Text>

                <View className="bg-white rounded-lg px-4 py-3 flex-row items-center mb-6" style={shadow}>
                    <Ionicons name="search" size={18} color="#2563EB" />
                    <TextInput
                        className="flex-1 ml-2 text-gray-700"
                        placeholder="Search places"
                        placeholderTextColor="#9CA3AF"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                <Text className="text-gray-700 font-semibold text-sm mb-4">AVAILABLE OPTIONS</Text>

                <View className="gap-4 pb-8">
                    {filtered.map(option => (
                        <LinearGradient
                            key={option.id}
                            colors={option.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{ borderRadius: 16 }}
                        >
                            <View className="rounded-2xl p-4 flex-row justify-between items-center">
                                <View className="flex-1 pr-3">
                                    <Text className="text-white font-semibold text-base mb-1">{option.title}</Text>
                                    <Text className="text-white/90 text-sm mb-1">{option.location}</Text>
                                    <Text className="text-white/90 text-sm mb-1">Available: {option.available}</Text>
                                    <Text className="text-white/90 text-sm mb-1">Duration: {option.duration}</Text>
                                    <Text className="text-white/90 text-sm mb-1">{option.price}</Text>
                                    <Text className="text-white/90 text-sm">Distance: {option.distance}</Text>
                                </View>

                                <View
                                    className="rounded-xl items-center justify-center"
                                    style={{ width: 48, height: 48, backgroundColor: "rgba(255,255,255,0.25)" }}
                                >
                                    <Ionicons name="home" size={24} color="#fff" />
                                </View>
                            </View>
                        </LinearGradient>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default TemporaryHousing
