import {View, Text, TouchableOpacity, ScrollView, Image} from "react-native"
import {Ionicons} from "@expo/vector-icons"
import {router} from "expo-router";
import React from "react";
import {LinearGradient} from "expo-linear-gradient";
import Svg, { Line, Polyline, Polygon, Text as SvgText } from "react-native-svg"

const VolunteerAdminDashboard = () => {
    return (
        <ScrollView className="flex-1 bg-blue-50">
            <View className="relative">
                <View style={{height: 100, overflow: "hidden"}}>
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
                        <Ionicons name="chevron-back" size={24} color="white"/>
                    </TouchableOpacity>
                    <View className="absolute left-0 right-0 mt-6 items-center">
                        <Text className="text-white text-base font-semibold">Volunteer Admin Dashboard</Text>
                    </View>
                </View>
            </View>

            <View className="px-6 pt-6">
                <View className="flex-row justify-between mb-8">
                    <View>
                        <View
                            className="w-20 h-20 rounded-full bg-white items-center justify-center"
                            style={{
                                shadowColor: "#8CB9ED",
                                shadowOpacity: 0.7,
                                shadowRadius: 12,
                                shadowOffset: { width: 0, height: 6 },
                                elevation: 10,
                            }}
                        >
                            <Text className="text-2xl font-bold text-black">247</Text>
                        </View>
                        <Text className="text-xs text-gray-600 text-center mt-1">Active{"\n"}Volunteers</Text>
                    </View>

                    <View>
                        <View
                            className="w-20 h-20 rounded-full bg-white items-center justify-center"
                            style={{
                                shadowColor: "#8CB9ED",
                                shadowOpacity: 0.7,
                                shadowRadius: 12,
                                shadowOffset: { width: 0, height: 6 },
                                elevation: 10,
                            }}
                        >
                            <Text className="text-2xl font-bold text-black">156</Text>
                        </View>
                        <Text className="text-xs text-gray-600 text-center mt-1">Tasks Completed{"\n"}Today</Text>
                    </View>

                    <View>
                        <View
                            className="w-20 h-20 rounded-full bg-white items-center justify-center"
                            style={{
                                shadowColor: "#8CB9ED",
                                shadowOpacity: 0.7,
                                shadowRadius: 12,
                                shadowOffset: { width: 0, height: 6 },
                                elevation: 10,
                            }}
                        >
                            <Text className="text-2xl font-bold text-black">24</Text>
                        </View>
                        <Text className="text-xs text-gray-600 text-center mt-1">Urgent Tasks{"\n"}Pending</Text>
                    </View>
                </View>


                <Text className="text-gray-800 font-semibold mb-4">Volunteers enrollment progress</Text>

                <View className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
                    <LineChart />
                </View>

                <View style={{ gap: 14 }}>
                    <TouchableOpacity
                        onPress={() => router.push('/volunteerAdmin/add_new_task')}
                        activeOpacity={0.85}
                        className="rounded-2xl overflow-hidden"
                        style={{
                            shadowColor: "#000",
                            shadowOpacity: 0.12,
                            shadowRadius: 8,
                            shadowOffset: { width: 0, height: 4 },
                            elevation: 4,
                        }}
                    >
                        <LinearGradient
                            colors={["#FF7A7A", "#FF7A00"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}
                        >
                            <Text className="text-white text-center font-semibold text-lg">Add New Task</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/volunteerAdmin/available')}
                        activeOpacity={0.85}
                        className="rounded-2xl overflow-hidden"
                        style={{
                            shadowColor: "#000",
                            shadowOpacity: 0.12,
                            shadowRadius: 8,
                            shadowOffset: { width: 0, height: 4 },
                            elevation: 4,
                        }}
                    >
                        <LinearGradient
                            colors={["#6AA5FF", "#7A4DFF"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}
                        >
                            <Text className="text-white text-center font-semibold text-lg">Manage Task</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/volunteerAdmin/assign_task')}
                        activeOpacity={0.85}
                        className="rounded-2xl overflow-hidden"
                        style={{
                            shadowColor: "#000",
                            shadowOpacity: 0.12,
                            shadowRadius: 8,
                            shadowOffset: { width: 0, height: 4 },
                            elevation: 4,
                        }}
                    >
                        <LinearGradient
                            colors={["#22C55E", "#06B6D4"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}
                        >
                            <Text className="text-white text-center font-semibold text-lg">
                                Assign Task to Volunteers
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/volunteerAdmin/admin_notification')}
                        activeOpacity={0.85}
                        className="rounded-2xl overflow-hidden mb-8"
                        style={{
                            shadowColor: "#000",
                            shadowOpacity: 0.12,
                            shadowRadius: 8,
                            shadowOffset: { width: 0, height: 4 },
                            elevation: 4,
                        }}
                    >
                        <LinearGradient
                            colors={["#FACC15", "#F97316"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}
                        >
                            <Text className="text-white text-center font-semibold text-lg">Admin Notifications</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const LineChart: React.FC = () => {
    const data = [20, 30, 55, 70, 35, 65]
    const years = [2020, 2021, 2022, 2023, 2024, 2025]

    const W = 280, H = 180
    const pad = { l: 36, r: 12, t: 16, b: 30 }
    const cw = W - pad.l - pad.r
    const ch = H - pad.t - pad.b
    const maxY = 80

    const points = data
        .map((v, i) => {
            const x = pad.l + (i * cw) / (data.length - 1)
            const y = pad.t + (ch - (v / maxY) * ch)
            return `${x},${y}`
        })
        .join(" ")

    const baseY = pad.t + ch
    const endX = pad.l + cw

    return (
        <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
            <Line x1={pad.l} y1={baseY} x2={endX + 6} y2={baseY} stroke="#111" strokeWidth={1.5} />
            <Line x1={pad.l} y1={baseY} x2={pad.l} y2={pad.t - 6} stroke="#111" strokeWidth={1.5} />
            <Polygon points={`${endX + 6},${baseY} ${endX + 1},${baseY - 3} ${endX + 1},${baseY + 3}`} fill="#111" />
            <Polygon points={`${pad.l},${pad.t - 6} ${pad.l - 3},${pad.t - 1} ${pad.l + 3},${pad.t - 1}`} fill="#111" />

            {[0,10,20,30,40,50,60,70,80].map((p) => {
                const y = pad.t + (ch - (p / maxY) * ch)
                return (
                    <React.Fragment key={p}>
                        <Line x1={pad.l - 3} y1={y} x2={pad.l} y2={y} stroke="#111" strokeWidth={1} />
                        <SvgText x={pad.l - 6} y={y + 3} fontSize="8" fill="#111" textAnchor="end">
                            {p}%
                        </SvgText>
                    </React.Fragment>
                )
            })}

            {years.map((y, i) => {
                const x = pad.l + (i * cw) / (years.length - 1)
                return (
                    <SvgText key={y} x={x} y={baseY + 12} fontSize="8" fill="#111" textAnchor="middle">
                        {y}
                    </SvgText>
                )
            })}

            <SvgText x={pad.l - 18} y={pad.t - 8} fontSize="10" fill="#111">
                Accurate
            </SvgText>

            <Polyline
                points={points}
                fill="none"
                stroke="#111"
                strokeWidth={1.5}
            />
        </Svg>
    )
}

export default VolunteerAdminDashboard
