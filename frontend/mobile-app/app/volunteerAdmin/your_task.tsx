"use client"

import React, { useState } from "react"
import {View, Text, TextInput, TouchableOpacity, ScrollView, Image} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import {router} from "expo-router";

const YourTasks = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeFilter, setActiveFilter] = useState("All")

    const filters = ["All", "Pending", "Accepted", "In progress", "Completed"]

    const tasks = [
        {
            id: 1,
            title: "Emergency Food Distribution",
            location: "Downtown Community Center",
            time: "Today 2-6 PM",
            volunteers: "8/15 volunteers",
            timeAgo: "2 hours ago",
            status: "Pending",
        },
        {
            id: 2,
            title: "Debris Clean-up",
            location: "Regional Hospital",
            time: "Today 2-6 PM",
            volunteers: "8/15 volunteers",
            timeAgo: "1 hours ago",
            status: "Accepted",
        },
        {
            id: 3,
            title: "Medical Supply Delivery",
            location: "Regional Hospital",
            time: "Today 2-6 PM",
            volunteers: "8/15 volunteers",
            timeAgo: "5 hours ago",
            status: "Completed",
        },
        {
            id: 4,
            title: "Medical Supply Delivery",
            location: "Regional Hospital",
            time: "Today 2-6 PM",
            volunteers: "8/15 volunteers",
            timeAgo: "5 hours ago",
            status: "In progress",
        },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending":
                return "bg-red-500"
            case "Accepted":
                return "bg-orange-500"
            case "Completed":
                return "bg-green-500"
            case "In progress":
                return "bg-blue-500"
            default:
                return "bg-gray-500"
        }
    }

    const getFilterButtonColor = (filter: string) => {
        if (activeFilter === filter) {
            switch (filter) {
                case "All":
                    return "bg-gray-500"
                case "Pending":
                    return "bg-red-500"
                case "Accepted":
                    return "bg-orange-500"
                case "In progress":
                    return "bg-blue-500"
                case "Completed":
                    return "bg-green-500"
                default:
                    return "bg-blue-500"
            }
        }
        return "bg-white border border-gray-300"
    }

    const getFilterTextColor = (filter: string) => {
        return activeFilter === filter ? "text-white" : "text-gray-700"
    }

    const filteredTasks =
        activeFilter === "All"
            ? tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
            : tasks.filter(
                (task) => task.status === activeFilter && task.title.toLowerCase().includes(searchQuery.toLowerCase()),
            )

    return (
        <View className="flex-1 bg-[#E8F5FB]">
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
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Ionicons name="chevron-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View className="absolute left-0 right-0 mt-6 items-center">
                        <Text className="text-white text-base font-semibold">Your Tasks</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 mt-4 relative z-20">
                <View className="bg-white rounded-xl px-4 py-3 mb-4 flex-row items-center shadow-sm">
                    <Ionicons name="search" size={20} color="#9CA3AF" />
                    <TextInput
                        className="flex-1 ml-3 text-gray-700"
                        placeholder="Search Your Tasks"
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                    <View className="flex-row space-x-3">
                        {filters.map((filter) => (
                            <TouchableOpacity
                                key={filter}
                                onPress={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-full ${getFilterButtonColor(filter)}`}
                            >
                                <Text className={`font-medium ${getFilterTextColor(filter)}`}>{filter}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <View className="gap-4 pb-6">
                    {filteredTasks.map((task) => (
                        <View key={task.id} className="bg-white rounded-xl p-4 shadow-sm">
                            <View className="flex-row justify-between items-start mb-3">
                                <View className="flex-1">
                                    <Text className="text-lg font-semibold text-gray-800 mb-1">{task.title}</Text>
                                    <Text className="text-gray-600 mb-2">{task.location}</Text>
                                </View>
                                <View className={`px-3 py-1 rounded-full ${getStatusColor(task.status)}`}>
                                    <Text className="text-white text-sm font-medium">{task.status}</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center mb-2">
                                <Ionicons name="time-outline" size={16} color="#6B7280" />
                                <Text className="text-gray-600 ml-2">{task.time}</Text>
                            </View>

                            <View className="flex-row items-center mb-3">
                                <Ionicons name="people-outline" size={16} color="#6B7280" />
                                <Text className="text-gray-600 ml-2">{task.volunteers}</Text>
                            </View>

                            <View className="flex-row justify-between items-center">
                                <Text className="text-gray-500 text-sm">{task.timeAgo}</Text>
                                <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-lg">
                                    <Text className="text-white font-medium">View Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default YourTasks
