import React from "react";
import {View, Text, TouchableOpacity, ScrollView, Image, useWindowDimensions} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {router} from "expo-router";

const shadow = {
    shadowColor: "#8CB9ED",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
    elevation: 8,
};

const AssignmentMatch: React.FC = () => {
    const insets = useSafeAreaInsets();
    const {width} = useWindowDimensions();
    const big = Math.min(Math.max(width * 0.22, 48), 80);

    const bars = [
        {label: "Skill Match", pct: 95, colors: ["#34D5DC", "#0EA5A8"], icon: "construct-outline" as const},
        {label: "Availability", pct: 85, colors: ["#FBBF24", "#F59E0B"], icon: "calendar-outline" as const},
        {label: "Proximity", pct: 85, colors: ["#FB923C", "#F97316"], icon: "pin-outline" as const},
        {label: "Reliability", pct: 95, colors: ["#34D399", "#10B981"], icon: "star-outline" as const},
    ];

    return (
        <View className="flex-1" style={{backgroundColor: "#EAF6FF"}}>
            {/* Header */}
            <View
                className="relative"
                style={{height: 500, paddingTop: (insets?.top ?? 0) + 8, overflow: "hidden"}}
            >

                <Image
                    source={require("../../assets/images/top_bg.png")}
                    resizeMode="cover"
                    style={{
                        position: "absolute",
                        right: -10,
                        top: 0,
                    }}
                />

                <View className="flex-row items-center" style={{paddingHorizontal: 16, marginTop: -15}}>
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                        hitSlop={{top: 0, bottom: 8, left: 8, right: 8}}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={24} color="#fff"/>
                    </TouchableOpacity>
                </View>

                <View
                    pointerEvents="none"
                    className="items-center"
                    style={{position: "absolute", left: 0, right: 0, top: (insets?.top ?? 0) - 15}}
                >
                    <Text className="text-white text-lg font-semibold">Assignment Match</Text>
                </View>
            </View>

            <ScrollView
                style={{ position: "absolute", top: 150, left: 0, right: 0, bottom: 0 }}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                <View
                    className="items-center mb-6"
                >
                    <Text
                        allowFontScaling={false}
                        style={{
                            fontSize: big,
                            lineHeight: big * 1.02,
                            fontWeight: "900",
                            color: "#111827",
                            letterSpacing: -1,
                            marginBottom: 4,
                        }}
                    >
                        97%
                    </Text>

                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "700",
                            color: "#111827",
                            marginBottom: 4,
                        }}
                    >
                        Perfect Match!
                    </Text>

                    <Text
                        style={{
                            fontSize: 13.5,
                            color: "#6B7280",
                            textAlign: "center",
                        }}
                    >
                        You're highly qualified for this task
                    </Text>
                </View>

                <Text className="text-base font-semibold text-gray-900 mb-4">Match Breakdown</Text>

                <View className="bg-white rounded-2xl p-4 mb-6" style={shadow}>
                    {bars.map((it, i) => (
                        <View
                            key={it.label}
                            style={{
                                backgroundColor: "#F7FAFF",
                                borderColor: "#E6EEF8",
                                borderWidth: 1,
                                borderRadius: 12,
                                padding: 10,
                                marginBottom: i === bars.length - 1 ? 0 : 12,
                            }}
                        >
                            <View className="flex-row items-center justify-between" style={{marginBottom: 6}}>
                                <View className="flex-row items-center">
                                    <View
                                        style={{
                                            width: 22,
                                            height: 22,
                                            borderRadius: 11,
                                            backgroundColor: "#F3F4F6",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: 6,
                                        }}
                                    >
                                        <Ionicons name={it.icon} size={13} color="#374151"/>
                                    </View>
                                    <Text className="text-gray-700 font-medium">{it.label}</Text>
                                </View>
                                <Text className="text-gray-900 font-semibold">{it.pct}%</Text>
                            </View>

                            <View
                                style={{
                                    width: "100%",
                                    height: 10,
                                    backgroundColor: "#E9EEF6",
                                    borderRadius: 999,
                                    overflow: "hidden",
                                }}
                            >
                                <LinearGradient
                                    colors={it.colors}
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    style={{width: `${it.pct}%`, height: "100%", borderRadius: 999}}
                                />
                            </View>
                        </View>
                    ))}
                </View>

                <LinearGradient
                    colors={["#1FD87A", "#0FBF8C"]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={[{borderRadius: 16, padding: 14, marginBottom: 16}, shadow]}
                >
                    <LinearGradient
                        colors={["rgba(255,255,255,0.18)", "transparent"]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            height: 28,
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                        }}
                    />
                    <View className="flex-row items-center">
                        <View className="flex-1">
                            <Text
                                style={{
                                    color: "#0a2e25",
                                    fontSize: 16,
                                    fontWeight: "700",
                                    textDecorationLine: "underline",
                                    marginBottom: 6,
                                }}
                            >
                                Travel Details:
                            </Text>
                            <Text style={{color: "#0a2e25"}}>Distance: 2.1 km</Text>
                            <Text style={{color: "#0a2e25", marginTop: 4}}>Estimated time: 8 minutes</Text>
                            <Text style={{color: "#0a2e25", marginTop: 4}}>Transport: Own vehicle</Text>
                        </View>
                        <View style={{width: 92, alignItems: "flex-end"}}>
                            <View className="w-16 h-16 rounded-full items-center justify-center"
                                  style={{backgroundColor: "rgba(255,255,255,0.25)"}}>
                                <Ionicons name="walk-outline" size={30} color="#fff"/>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                <View className="pb-10">
                    <TouchableOpacity activeOpacity={0.9} className="rounded-2xl overflow-hidden mb-3" style={shadow}>
                        <LinearGradient
                            colors={["#60A5FA", "#3B82F6"]}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={{paddingVertical: 14}}
                        >
                            <Text className="text-white text-center text-base font-semibold">Confirm Assignment</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.9} className="rounded-2xl overflow-hidden" style={shadow}>
                        <LinearGradient
                            colors={["#22D3EE", "#06B6D4"]}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={{paddingVertical: 14}}
                        >
                            <Text className="text-white text-center text-base font-semibold">View Other
                                Assignment</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
};

export default AssignmentMatch;
