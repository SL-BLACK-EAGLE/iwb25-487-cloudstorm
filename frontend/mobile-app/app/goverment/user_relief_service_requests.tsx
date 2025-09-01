import React from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import {router} from "expo-router";
import { Ionicons } from "@expo/vector-icons"


const shadow = {
    shadowColor: "#8CB9ED",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
}

const Row = ({ k, v }: { k: string; v: string }) => (
    <View className="flex-row mb-2">
        <Text className="text-white/90 font-semibold w-36 text-right">
            {k}
        </Text>
        <Text className="text-white/80 mx-2">:</Text>
        <Text className="text-white/95 flex-1">{v}</Text>
    </View>

)

const UserReliefServiceRequests = () => {
    return (
        <View className="flex-1 bg-slate-100">
            <View className="relative">
                <View style={{  height: 100,  overflow: "hidden" }}>
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
                        <Text className="text-white text-base font-semibold">User Relief Service Requests</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-6 pt-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                <View className="rounded-2xl overflow-hidden mb-4" style={shadow}>
                    <LinearGradient
                        colors={["#22D3EE", "#06B6D4"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ padding: 16 }}
                    >
                        <LinearGradient
                            colors={["rgba(255,255,255,0.18)", "transparent"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{ position: "absolute", left: 0, right: 0, top: 0, height: 28 }}
                        />

                        <View className="flex-row justify-between items-center mb-3">
                            <View className="bg-red-500 px-2 py-2 rounded-3xl">
                                <Text className="text-white text-xs font-bold">Water Supply</Text>
                            </View>
                            <Text className="text-white/90 text-xs">2 hours ago</Text>
                        </View>

                        <Row k="Your name:" v="Hasindu Gunathilka" />
                        <Row k="Mobile:" v="0701449808" />
                        <Row k="Category:" v="Water Supply" />
                        <Row k="Urgency level:" v="High" />
                        <Row k="Date:" v="2005/10/05" />
                        <Row k="Description:" v="Water supply" />

                        <View className="flex-row gap-3 mt-5">
                            <TouchableOpacity
                                onPress={() => router.push('/goverment/more_details_of_relief_request')}
                                activeOpacity={0.9}
                                className="flex-1 rounded-lg overflow-hidden"
                                style={shadow}
                            >
                                <LinearGradient
                                    colors={["#60A5FA", "#3B82F6"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{ paddingVertical: 10 }}
                                >
                                    <Text className="text-white text-center font-semibold">View More</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <View className="flex-1 rounded-lg overflow-hidden" style={shadow}>
                                <LinearGradient
                                    colors={["#93C5FD", "#3B82F6"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{ paddingVertical: 10 }}
                                >
                                    <Text className="text-white text-center font-semibold">Submitted</Text>
                                </LinearGradient>
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                <View className="h-10" />
            </ScrollView>
        </View>
    )
}

export default UserReliefServiceRequests
