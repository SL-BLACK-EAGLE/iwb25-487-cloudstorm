import React from "react";
import { View, Text, TouchableOpacity, ScrollView,Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {router} from "expo-router";

const shadow = {
    shadowColor: "#8CB9ED",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
};

const PillBadge = ({ text }: { text: string }) => (
    <View style={{ position: "relative" }}>
        <View
            style={{
                position: "absolute",
                left: -10,
                top: -8,
                width: 40,
                height: 24,
                borderRadius: 12,
                backgroundColor: "rgba(255,255,255,0.22)",
            }}
        />
        <View
            style={{
                backgroundColor: "red",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
            }}
        >
            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>
                {text}
            </Text>
        </View>
    </View>
);

const ServiceCard = ({
                         tag,
                         time,
                         title,
                         subtitle1,
                         subtitle2,
                         gradient,
                     }: {
    tag: string;
    time: string;
    title: string;
    subtitle1: string;
    subtitle2: string;
    gradient: [string, string];
}) => (
    <View
        style={[
            {
                borderRadius: 18,
                overflow: "hidden",
                marginBottom: 16,
            },
            shadow,
        ]}
    >
        <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 16 }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                }}
            >
                <PillBadge text={tag} />
                <Text style={{ color: "white", fontSize: 12, opacity: 0.95 }}>
                    {time}
                </Text>
            </View>

            <Text
                style={{ color: "#fff", fontWeight: "800", fontSize: 18, marginBottom: 6 }}
            >
                {title}
            </Text>
            <Text style={{ color: "#F0FDFF", fontSize: 13, marginBottom: 2 }}>
                {subtitle1}
            </Text>
            <Text style={{ color: "#E5FAFF", fontSize: 13, marginBottom: 16 }}>
                {subtitle2}
            </Text>

            <View
                style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}
            >
                <TouchableOpacity
                    onPress={() => router.push('/goverment/water_supply')}
                    activeOpacity={0.9}
                    style={{
                        borderRadius: 999,
                        overflow: "hidden",
                        flexBasis: "46%",
                    }}
                >
                    <LinearGradient
                        colors={["#67E8F9", "#22D3EE"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            paddingVertical: 10,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "700" }}>View More</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push('/goverment/request_relief_service')}
                    activeOpacity={0.9}
                    style={{
                        flexBasis: "46%",
                        backgroundColor: "white",
                        paddingVertical: 10,
                        borderRadius: 999,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ color: "#334155", fontWeight: "700" }}>
                        Request Service
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    </View>
);

const ReliefServices = () => {
    return (
        <View className="flex-1" style={{ backgroundColor: "#EAF6FF" }}>
            {/* Header */}
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
                        <Text className="text-white text-base font-semibold">Relief Services</Text>
                    </View>
                </View>
            </View>

            {/* Content */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                <ServiceCard
                    tag="WATER SUPPLY"
                    time="2 hours ago"
                    title="Request Water Supply"
                    subtitle1="Providing water supply for your home"
                    subtitle2="Water Supplies Department"
                    gradient={["#06B6D4", "#22D3EE"]} // cyan → light blue
                />

                <ServiceCard
                    tag="POWER RESTORATION"
                    time="2 hours ago"
                    title="Request Power Supply"
                    subtitle1="Providing power supply for your home"
                    subtitle2="Power Supplies Department"
                    gradient={["#F59E0B", "#FB7185"]}
                />
            </ScrollView>
        </View>
    );
};

export default ReliefServices;
