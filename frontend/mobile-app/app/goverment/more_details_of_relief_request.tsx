import React, { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import * as ImagePicker from "expo-image-picker"

const shadow = {
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
}

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <View style={{ marginBottom: 16 }}>
        <LinearGradient
            colors={["#7CB2FF", "#2D7CF5"]} // blue → deeper blue
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
                borderRadius: 16,
                padding: 14,
                borderWidth: 1,
                borderColor: "#C7E0FF",
                ...shadow,
            }}
        >
            {/* soft highlight rectangle like the mock */}
            <View
                style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    width: "48%",
                    height: 96,
                    borderRadius: 12,
                    backgroundColor: "rgba(255,255,255,0.08)",
                }}
            />
            <Text className="text-white text-base font-semibold mb-3">{title}</Text>
            {children}
        </LinearGradient>
    </View>
)

const Row: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
    <View className="flex-row items-start mb-2">
        <View className="w-2 h-2 rounded-full bg-white mr-2 mt-1" />
        <Text className="text-white text-sm mr-1">{label}</Text>
        {value ? <Text className="text-white text-sm flex-1">{value}</Text> : null}
    </View>
)


const MoreDetailsOfReliefRequest = () => {
    const [docImageUri, setDocImageUri] = useState<string | null>(null)

    const pickDocumentImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") return
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        })
        if (!result.canceled) setDocImageUri(result.assets[0].uri)
    }

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
                        <Text className="text-white text-base font-semibold">More details Of Relief Request</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
                {/* Your Document */}
                <View className="mb-6">
                    <Text className="text-gray-800 text-base font-medium mb-3">• Your Document :</Text>

                    <TouchableOpacity
                        onPress={pickDocumentImage}
                        activeOpacity={0.85}
                        className="w-24 h-24 rounded-lg overflow-hidden items-center justify-center"
                        style={{ borderWidth: 2, borderColor: "#D1D5DB", backgroundColor: "#fff", ...shadow }}
                    >
                        {docImageUri ? (
                            <Image source={{ uri: docImageUri }} resizeMode="cover" style={{ width: "100%", height: "100%" }} />
                        ) : (
                            <View className="items-center justify-center">
                                <Ionicons name="image-outline" size={26} color="#666" />
                                <Text className="text-[10px] text-gray-500 mt-1">Tap to add</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Request Water Supply */}
                <Card title="Request Water Supply">
                    <Row label="Name :" value="Hasindu Gunathilaka" />
                    <Row label="Mobile :" value="0115588754" />
                    <Row label="Address :" value="23/49, Westernpark, Kalagedihena" />
                    <Row label="Department :" value="Water Supply Department" />
                    <Row label="Urgency Level :" value="CRITICAL" />
                    <Row label="Date :" value="2025/08/04" />
                    <Row label="Note :" value="" />
                </Card>

                {/* AI Analysis data */}
                <Card title="AI Analysis data">
                    <Row label="Confidence Score :" />
                    <Row label="Damage Categories :" />
                    <Row label="Estimated Cost :" />
                    <Row label="Priority :" />
                    <Row label="Status :" />
                    <Row label="Assigned Volunteers :" />
                    <Row label="Estimated Completion Time :" />
                    <View className="mt-2" />
                    <Row label="Created At :" />
                    <Row label="Updated At :" />
                </Card>

                {/* Need an appointment */}
                <TouchableOpacity onPress={() => router.push('/goverment/relief_service_appointment')} activeOpacity={0.9} className="rounded-xl overflow-hidden mb-10" style={shadow}>
                    <LinearGradient
                        colors={["#4F9BFF", "#2563EB"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ paddingVertical: 14, borderRadius: 12 }}
                    >
                        <Text className="text-white text-center text-base font-semibold">Need an appointment</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default MoreDetailsOfReliefRequest
