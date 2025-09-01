import React, { useMemo, useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native"
import { router } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

const cardStyle = {
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
} as const

const ImmediateShelter = () => {
    const [searchText, setSearchText] = useState("")

    const shelterLocations = [
        {
            id: 1,
            name: "Lincoln High School",
            distance: "0.8 mi",
            status: "OPEN",
            capacity: "147/200",
            parking: "Parking Available",
            pets: "Pets Welcome",
        },
        {
            id: 2,
            name: "Ragama Church",
            distance: "0.8 mi",
            status: "OPEN",
            capacity: "147/200",
            parking: "Parking Available",
            pets: "Pets Welcome",
        },
        {
            id: 3,
            name: "Lincoln High School",
            distance: "0.8 mi",
            status: "OPEN",
            capacity: "147/200",
            parking: "Parking Available",
            pets: "Pets Welcome",
        },
    ]

    const filteredShelters = useMemo(() => {
        const q = searchText.trim().toLowerCase()
        if (!q) return shelterLocations
        return shelterLocations.filter(
            s =>
                s.name.toLowerCase().includes(q) ||
                s.status.toLowerCase().includes(q) ||
                s.parking.toLowerCase().includes(q) ||
                s.pets.toLowerCase().includes(q)
        )
    }, [searchText])

    return (
        <View className="flex-1 bg-blue-50">
            {/* Header */}
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
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <View className="absolute left-0 right-0 mt-6 items-center">
                        <Text className="text-white text-base font-semibold">Immediate Shelter</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
                <Text className="text-gray-800 text-base mb-8 leading-relaxed">
                    Life-threatening situation requires immediate help
                </Text>

                {/* Search */}
                <View className="bg-blue-100 rounded-xl px-4 py-3 mb-6 flex-row items-center">
                    <Text className="text-blue-600 text-lg mr-3">🔍</Text>
                    <TextInput
                        className="flex-1 text-blue-800 text-base"
                        placeholder="Search Places"
                        placeholderTextColor="#6B7280"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                {/* Results */}
                {filteredShelters.map(shelter => (
                    <TouchableOpacity
                        key={shelter.id}
                        onPress={() => router.push("/VictimUser/lincoln_high_shelter")}
                        className="bg-blue-500 rounded-2xl p-4 mb-4 shadow-lg"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-lg font-bold mb-2">{shelter.name}</Text>
                        <Text className="text-white text-sm mb-1">
                            {shelter.distance} • {shelter.status}
                        </Text>
                        <Text className="text-white text-sm mb-1">Capacity: {shelter.capacity}</Text>
                        <Text className="text-white text-sm mb-1">{shelter.parking}</Text>
                        <Text className="text-white text-sm">{shelter.pets}</Text>
                    </TouchableOpacity>
                ))}

                {filteredShelters.length === 0 && (
                    <View className="bg-white rounded-2xl p-6 mb-6 items-center">
                        <Text className="text-gray-600">No shelters match your search.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default ImmediateShelter
