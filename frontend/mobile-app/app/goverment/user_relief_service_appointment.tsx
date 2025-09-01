import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const shadowCard = {
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
};

const UserReliefServiceAppointment = () => {
    const request = {
        service: "Water Supply",
        name: "Hasindu Gunathilka",
        mobile: "0701449808",
        priority: "",
        status: "Submitted",
        date: "2005/10/05",
        description: "",
    };

    return (
        <View className="flex-1" style={{ backgroundColor: "#EAF6FF" }}>
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
                        <Text className="text-white text-base font-semibold">User Relief Service Appointment</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={["#FF7A7A", "#FFA857", "#FFE177"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 18,
                        padding: 14,
                        borderWidth: 1,
                        borderColor: "#E6E6E6",
                        marginBottom: 16,
                        ...shadowCard,
                    }}
                >
                    <View style={{ position: "absolute", top: 52, left: 22, width: 110, height: 36, backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 12 }} />
                    <View style={{ position: "absolute", bottom: 52, right: 22, width: 120, height: 38, backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 12 }} />

                    <View style={{ alignSelf: "flex-start", backgroundColor: "red", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12, marginBottom: 8 }}>
                        <Text className="text-white font-semibold"> {request.service} </Text>
                    </View>

                    <Text className="text-black text-sm mb-1">
                        <Text className="font-semibold">Your name :</Text> {request.name}
                    </Text>
                    <Text className="text-black text-sm mb-1">
                        <Text className="font-semibold">Mobile :</Text> {request.mobile}
                    </Text>
                    <Text className="text-black text-sm mb-1">
                        <Text className="font-semibold">priority :</Text> {request.priority || ""}
                    </Text>
                    <Text className="text-black text-sm mb-1">
                        <Text className="font-semibold">status :</Text> {request.status || ""}
                    </Text>
                    <Text className="text-black text-sm mb-1">
                        <Text className="font-semibold">Date :</Text> {request.date}
                    </Text>
                    <Text className="text-black text-sm mb-3">
                        <Text className="font-semibold">description :</Text> {request.description}
                    </Text>

                    {/* Actions row */}
                    <View className="flex-row items-center justify-between mt-2">
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => router.push('/goverment/more_details_of_relief_appointment')}
                            className="rounded-xl overflow-hidden"
                        >
                            <LinearGradient
                                colors={["#73E0FF", "#3B82F6"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ paddingVertical: 10, paddingHorizontal: 18, borderRadius: 12 }}
                            >
                                <Text className="text-white font-semibold">View More</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={{ backgroundColor: "white", paddingVertical: 10, paddingHorizontal: 18, borderRadius: 12 }}>
                            <Text style={{ color: "#6B7280", fontWeight: "600" }}>Submitted</Text>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </View>
    );
};

export default UserReliefServiceAppointment;
