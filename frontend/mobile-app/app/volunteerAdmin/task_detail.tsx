import React from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"

const shadow = {
    shadowColor: "#8CB9ED",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
}

const Row = ({
                 icon,
                 label,
                 value,
             }: {
    icon: keyof typeof Ionicons.glyphMap
    label: string
    value: string
}) => (
    <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Ionicons name={icon} size={16} color="#fff" style={{ marginTop: 2, marginRight: 8 }} />
        <Text style={{ color: "#fff", fontWeight: "700", width: 90 }}>{label}</Text>
        <Text style={{ color: "#fff", flex: 1 }}>{value}</Text>
    </View>
)

const TaskDetails: React.FC = () => {
    return (
        <View className="flex-1" style={{ backgroundColor: "#E8F5FB" }}>
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
                        <Text className="text-white text-base font-semibold">Task Details</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 mt-4" showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 12, marginBottom: 16 }}>
                    <View
                        className="rounded-xl px-4 py-3"
                        style={[shadow, { backgroundColor: "#DC2626", alignItems: "center" }]}
                    >
                        <Text className="text-white font-semibold">Emergency Food Distribution</Text>
                        <Text className="text-white font-semibold mt-2">URGENT</Text>
                    </View>
                </View>

                <LinearGradient
                    colors={["#60A5FA", "#3B82F6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[{ borderRadius: 16, padding: 16, marginBottom: 18 }, shadow]}
                >
                    <Row icon="location-outline" label="Location:" value="Downtown Community Center" />
                    <Row
                        icon="document-text-outline"
                        label="Description:"
                        value="Emergency food distribution programs provide food assistance to individuals and families facing food insecurity, often in times of crisis or disaster."
                    />
                    <Row icon="calendar-outline" label="Date:" value="Today, Dec 15, 2024" />
                    <Row icon="time-outline" label="Duration:" value="4 hours (2 PM – 6 PM)" />
                    <Row icon="people-outline" label="Volunteers:" value="8/15 assigned" />
                    <Row icon="medkit-outline" label="Skills:" value="Food handling, Communication" />
                </LinearGradient>

                <Text className="text-gray-800 text-base font-semibold mb-3">Contact Person</Text>
                <LinearGradient
                    colors={["#34D399", "#059669"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="self-center mb-6"
                    style={[shadow, { borderRadius: 16, padding: 16, width: "60%", maxWidth: 420 }]}
                >
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="person-circle-outline" size={22} color="#fff" />
                        <Text className="text-white text-base font-semibold ml-2">Sara Johnson</Text>
                    </View>

                    <View className="flex-row items-center mb-1">
                        <Ionicons name="call-outline" size={16} color="#fff" />
                        <Text className="text-white ml-2">+94 1234 5678</Text>
                    </View>

                    <View className="flex-row items-center">
                        <Ionicons name="mail-outline" size={16} color="#fff" />
                        <Text className="text-white ml-2">sara.johnson@email.com</Text>
                    </View>
                </LinearGradient>

                <Text className="text-gray-800 text-base font-semibold mb-3">Safety Requirements</Text>
                <LinearGradient
                    colors={["#818CF8", "#3B82F6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="self-center mb-6"
                    style={[{ borderRadius: 16, padding: 16, marginBottom: 20, width: "90%" }, shadow]}
                >
                    {[
                        "Wear closed-toe shoes",
                        "Bring face mask",
                        "Food handling certification preferred",
                    ].map((t) => (
                        <View key={t} className="flex-row items-center mb-2">
                            <Ionicons name="ellipse" size={7} color="#fff" style={{ marginRight: 8 }} />
                            <Text className="text-white">{t}</Text>
                        </View>
                    ))}
                </LinearGradient>

                <View style={{ marginBottom: 28 }}>
                    <TouchableOpacity activeOpacity={0.9} className="rounded-xl overflow-hidden mb-3" style={shadow}>
                        <LinearGradient
                            colors={["#60A5FA", "#3B82F6"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ paddingVertical: 14 }}
                        >
                            <Text className="text-white text-center text-base font-semibold">
                                Accept Assignment
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.9} className="rounded-xl overflow-hidden" style={shadow}>
                        <LinearGradient
                            colors={["#14B8A6", "#0EA5E9"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ paddingVertical: 14 }}
                        >
                            <Text className="text-white text-center text-base font-semibold">Save for Later</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default TaskDetails
