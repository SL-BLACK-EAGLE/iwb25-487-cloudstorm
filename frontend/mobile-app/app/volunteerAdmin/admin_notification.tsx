import { View, Text, TouchableOpacity, ScrollView, TextInput,Image } from "react-native"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import {router} from "expo-router";

const AdminNotifications = () => {
    const [searchQuery, setSearchQuery] = useState("")

    const notifications = [
        {
            id: 1,
            title: "Emergency Food Distribution",
            location: "Downtown Community Center",
            details: "Volunteer alert has assignment",
            date: "25/5/2023",
            priority: "URGENT",
            priorityColor: "bg-red-500",
        },
        {
            id: 2,
            title: "Debris Clean-up",
            location: "Regional Hospital",
            details: "Volunteer alert has assignment",
            date: "25/5/2023",
            priority: "MEDIUM",
            priorityColor: "bg-orange-500",
        },
        {
            id: 3,
            title: "Medical Supply Delivery",
            location: "Regional Hospital",
            details: "Volunteer alert has assignment",
            date: "25/5/2023",
            priority: "LOW",
            priorityColor: "bg-green-500",
        },
    ]

    const filteredNotifications = notifications.filter(
        (notification) =>
            notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notification.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <View className="flex-1 bg-blue-50">
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
                        <Text className="text-white text-base font-semibold">Admin Notifications</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
                <View className="bg-white rounded-xl px-4 py-3 mb-6 flex-row items-center shadow-sm">
                    <Ionicons name="search" size={20} color="#9CA3AF" />
                    <TextInput
                        className="flex-1 ml-3 text-gray-700 text-base"
                        placeholder="Search Notifications"
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <View>
                    {filteredNotifications.map((n, idx) => {
                        const isLast = idx === filteredNotifications.length - 1
                        return (
                            <TouchableOpacity
                                key={n.id}
                                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                                style={{ marginBottom: isLast ? 0 : 16 }}
                                activeOpacity={0.8}
                            >
                                <View className="flex-row justify-between items-start mb-3">
                                    <Text className="text-gray-900 text-base font-semibold flex-1 mr-3">
                                        {n.title}
                                    </Text>
                                    <View className={`${n.priorityColor} px-3 py-1 rounded-full`}>
                                        <Text className="text-white text-xs font-medium">{n.priority}</Text>
                                    </View>
                                </View>

                                <Text className="text-gray-600 text-sm mb-2">{n.location}</Text>
                                <Text className="text-gray-500 text-sm mb-3">{n.details}</Text>
                                <Text className="text-gray-400 text-xs">{n.date}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                {filteredNotifications.length === 0 && (
                    <View className="flex-1 items-center justify-center py-12">
                        <Ionicons name="notifications-off-outline" size={48} color="#9CA3AF" />
                        <Text className="text-gray-500 text-base mt-4">No notifications found</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default AdminNotifications
