import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const shadow = {
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
};

const CardRow = ({ label, value }: { label: string; value?: string }) => (
    <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 8 }}>
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "white", marginTop: 6, marginRight: 10 }} />
        <Text className="text-white text-sm">
            <Text className="font-medium">{label}</Text>
            {value ? ` ${value}` : ""}
        </Text>
    </View>
);

const MoreDetailsOfReliefAppointment = () => {
    return (
        <View className="flex-1" style={{ backgroundColor: "#EAF6FF" }}>
            {/* Header with wave image */}
            <View className="relative">
                <View style={{ height: 100, overflow: "hidden" }}>
                    <Image
                        source={require("../../assets/images/donation_type_top_bg.png")}
                        resizeMode="stretch"
                        style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "110%", height: 100 }}
                    />
                </View>

                {/* Back + centered title */}
                <View className="absolute left-0 right-0 top-0 mt-4 px-4 pt-6">
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <View className="absolute left-0 right-0 mt-6 items-center">
                        <Text className="text-white text-base font-semibold">More details Of Relief Appointment</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
                {/* Your Document */}
                <View className="mb-6">
                    <Text className="text-gray-800 font-medium mb-3">• Your Document</Text>
                    <View
                        className="w-20 h-20 bg-white rounded-xl items-center justify-center"
                        style={{ borderWidth: 2, borderColor: "#8DB8FF", ...shadow }}
                    >
                        <Ionicons name="image-outline" size={28} color="#444" />
                    </View>
                </View>

                {/* Request Water Supply Card */}
                <LinearGradient
                    colors={["#7CB2FF", "#2D7CF5"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 18,
                        padding: 16,
                        borderWidth: 1,
                        borderColor: "#C7E0FF",
                        marginBottom: 16,
                        ...shadow,
                    }}
                >
                    {/* subtle highlight box like the mock */}
                    <View
                        style={{
                            position: "absolute",
                            top: 16,
                            left: 16,
                            width: "52%",
                            height: 100,
                            backgroundColor: "rgba(255,255,255,0.08)",
                            borderRadius: 12,
                        }}
                    />

                    <Text className="text-white text-base font-semibold mb-3">Request Water Supply</Text>

                    <CardRow label="Name:" value="Hasindu Gunathilaka" />
                    <CardRow label="Mobile:" value="0115588754" />
                    <CardRow label="Address:" value="23/49, Westernpark, Kalagedihena" />
                    <CardRow label="Appointment Date:" value="2025/08/04" />
                    <CardRow label="Timeslot:" />
                    <CardRow label="Duration:" />
                    <CardRow label="Status:" />
                    <CardRow label="Booked At:" />
                    <CardRow label="Document Type:" />
                    <CardRow label="Booking Reference:" />
                    <CardRow label="Queue Position:" />
                    <CardRow label="Estimated Wait Time:" />
                </LinearGradient>

                {/* Done button */}
                <TouchableOpacity activeOpacity={0.9} className="rounded-xl overflow-hidden" style={shadow} onPress={() => router.push('/(tabs)')}>
                    <LinearGradient
                        colors={["#4F9BFF", "#2563EB"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ paddingVertical: 12, borderRadius: 12 }}
                    >
                        <Text className="text-white text-center text-base font-semibold">Done</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default MoreDetailsOfReliefAppointment;
