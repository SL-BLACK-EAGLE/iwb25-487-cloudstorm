import React from "react"
import {View, Text, TouchableOpacity, ScrollView, Image} from "react-native"
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons"
import {LinearGradient} from "expo-linear-gradient"
import {router} from "expo-router"

const shadow = {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
    elevation: 6,
}

const SkillCard = ({
                       title,
                       level,
                       years,
                       colors,
                       icon,
                   }: {
    title: string
    level: string
    years: string
    colors: string[]
    icon: React.ReactNode
}) => (
    <LinearGradient
        colors={colors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[{borderRadius: 18, paddingHorizontal: 14, paddingVertical: 12}, shadow]}
    >
        {/* subtle blobs */}
        <View style={{
            position: "absolute",
            top: -16,
            left: -16,
            width: 72,
            height: 72,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.12)"
        }}/>
        <View style={{
            position: "absolute",
            right: 24,
            top: 44,
            width: 56,
            height: 56,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.12)"
        }}/>

        <Text className="text-white font-semibold text-[13px]">{title}</Text>

        <View className="items-center justify-center py-3">{icon}</View>

        <Text className="text-white text-center font-semibold">{level}</Text>
        <Text className="text-white/95 text-center text-xs mt-1">{years}</Text>
    </LinearGradient>
)

// put near the top with your other helpers
const statShadow = {
    shadowColor: "#8CB9ED",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
}

const StatCard = ({ value, label }: { value: string | number; label: string }) => (
    <View className="items-center" style={{ width: 110 }}>
        <View
            className="w-full h-20 rounded-2xl items-center justify-center mb-2"
            style={[statShadow, { backgroundColor: "#0EA5B1" }]} // teal
        >
            <Text className="text-white text-3xl font-extrabold">{value}</Text>
        </View>
        <Text className="text-gray-900 text-base font-semibold text-center">{label}</Text>
    </View>
)

const VolunteerProfile: React.FC = () => {
    return (
        <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
            <View className="relative">
                <View className="h-48 mt-2 mx-2 relative">
                    <Image
                        source={require("../../assets/images/blue-glasses.png")}
                        className="w-full"
                        resizeMode="cover"
                    />

                    <View className="absolute left-0 right-0 top-0 px-4 pt-6 mt-4">
                        <TouchableOpacity
                            className="w-10 h-10 rounded-full bg-black/30 items-center justify-center"
                            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="chevron-back" size={22} color="#fff"/>
                        </TouchableOpacity>

                        <View className="absolute left-0 right-0 items-center mt-8">
                            <Text className="text-white text-xl font-semibold">Volunteer Profile</Text>
                        </View>
                    </View>
                </View>

                <View className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                    <View className="w-24 h-24 bg-white rounded-full items-center justify-center shadow-lg">
                        <View className="w-20 h-20 rounded-full items-center justify-center overflow-hidden">
                            <Image
                                source={require("../../assets/images/profile-avator.png")}
                                className="w-20 h-20 rounded-full"
                                resizeMode="cover"
                            />
                        </View>
                    </View>
                </View>
            </View>

            <View className="px-6 pt-14 mt-14">
                <View className="items-center mb-6">
                    <Text className="text-xl font-bold text-gray-800 mb-1">Alex Rodriguez</Text>
                    <Text className="text-gray-600 text-sm mb-4">Emergency Response Volunteer</Text>

                    <View className="items-center">
                        <View className="flex-row gap-3 mb-3">
                            <TouchableOpacity
                                className="flex-row items-center px-6 py-2 rounded-2xl"
                                style={[shadow, { backgroundColor: "#0F6F96" }]}
                                activeOpacity={0.85}
                            >
                                <View className="w-5 h-5 rounded-full bg-[#22C55E] items-center justify-center mr-2">
                                    <Ionicons name="checkmark" size={12} color="#fff" />
                                </View>
                                <Text className="text-white font-medium">Active</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="flex-row items-center px-6 py-2 rounded-2xl"
                                style={[shadow, { backgroundColor: "#0F6F96" }]}
                                activeOpacity={0.85}
                            >
                                <View className="w-5 h-5 rounded-full bg-[#22C55E] items-center justify-center mr-2">
                                    <Ionicons name="checkmark" size={12} color="#fff" />
                                </View>
                                <Text className="text-white font-medium">Verified</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            className="self-center flex-row items-center px-6 py-2 rounded-2xl"
                            style={[shadow, { backgroundColor: "#E1534F", minWidth: 220, justifyContent: "center" }]}
                            activeOpacity={0.9}
                        >
                            <Ionicons name="warning-outline" size={18} color="#fff" />
                            <Text className="text-white font-medium ml-2">Emergency Ready</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View className="flex-row justify-between mb-8 px-2">
                    <StatCard value="4.9" label="Rating" />
                    <StatCard value="247" label="Hours Served" />
                    <StatCard value="38" label="Tasks Done" />
                </View>

                <View className="mb-6">
                    <Text className="text-lg font-semibold text-gray-800 mb-4">Skills &amp; Expertise</Text>

                    <View className="flex-row flex-wrap" style={{gap: 12}}>
                        <View style={{width: "48%"}}>
                            <SkillCard
                                title="First Aid"
                                level="Expert Level"
                                years="8 years experience"
                                colors={["#FF6B6B", "#F59E0B"]}
                                icon={<Ionicons name="medical" size={44} color="#fff"/>}
                            />
                        </View>

                        <View style={{width: "48%"}}>
                            <SkillCard
                                title="Emergency Response"
                                level="Advanced Level"
                                years="5 years experience"
                                colors={["#34D399", "#10B981"]}
                                icon={<MaterialCommunityIcons name="hospital-box" size={44} color="#fff"/>}
                            />
                        </View>

                        <View style={{width: "48%"}}>
                            <SkillCard
                                title="Medical Assistance"
                                level="Intermediate Level"
                                years="3 years experience"
                                colors={["#60A5FA", "#7C3AED"]}
                                icon={<MaterialCommunityIcons name="nurse" size={44} color="#fff"/>}
                            />
                        </View>

                        <View style={{width: "48%"}}>
                            <SkillCard
                                title="Logistics"
                                level="Beginner Level"
                                years="1 year experience"
                                colors={["#F59E0B", "#F97316"]}
                                icon={<MaterialCommunityIcons name="truck" size={44} color="#fff"/>}
                            />
                        </View>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-lg font-semibold text-gray-800 mb-3">Transportation</Text>
                    <View className="bg-white p-4 rounded-xl" style={shadow}>
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="checkmark-circle" size={20} color="#10B981"/>
                            <Text className="text-gray-800 font-medium ml-2">Own Vehicle Available</Text>
                        </View>
                        <Text className="text-gray-600 text-sm">Capacity: 4 passengers</Text>
                        <Text className="text-gray-600 text-sm">Distance: 15 km</Text>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-lg font-semibold text-gray-800 mb-3">Languages</Text>
                    <View className="flex-row">
                        <View className="bg-blue-500 px-3 py-1 rounded-full" style={shadow}>
                            <Text className="text-white text-sm">English</Text>
                        </View>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-lg font-semibold text-gray-800 mb-3">Certifications &amp; Training</Text>
                    <View className="flex-row" style={{gap: 8}}>
                        <View className="bg-blue-500 px-4 py-2 rounded-full" style={shadow}>
                            <Text className="text-white text-sm">CPR Certified</Text>
                        </View>
                        <View className="bg-blue-500 px-4 py-2 rounded-full" style={shadow}>
                            <Text className="text-white text-sm">First Aid</Text>
                        </View>
                    </View>
                </View>

                <View className="mb-10">
                    <Text className="text-lg font-semibold text-gray-800 mb-3">Performance Rating</Text>
                    <View className="bg-white p-4 rounded-xl" style={shadow}>
                        <View className="flex-row items-center mb-3">
                            <View className="flex-row">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Ionicons key={star} name="star" size={16} color="#FCD34D"/>
                                ))}
                            </View>
                            <Text className="text-gray-800 font-semibold ml-2">4.9</Text>
                        </View>
                        <Text className="text-gray-600 text-sm mb-4">Excellent · 38 completed tasks</Text>

                        <View style={{gap: 10}}>
                            {[
                                ["Punctuality", "96%"],
                                ["Communication", "94%"],
                                ["Skill level", "98%"],
                                ["Activity measures", "-"],
                                ["Last Active", "2 hours ago"],
                                ["Task Status", "On Duty"],
                                ["Completed Task", "100%"],
                            ].map(([label, value]) => (
                                <View key={label as string} className="flex-row justify-between">
                                    <Text className="text-gray-600 text-sm">{label}</Text>
                                    <Text className="text-gray-800 font-medium">{value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default VolunteerProfile
