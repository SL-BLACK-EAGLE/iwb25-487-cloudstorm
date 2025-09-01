import React, {useState} from "react"
import {View, Text, TouchableOpacity, ScrollView, TextInput, Image} from "react-native"
import {Ionicons} from "@expo/vector-icons"
import {router} from "expo-router"

const AvailableTask = () => {
    const [searchQuery, setSearchQuery] = useState("")

    const tasks = [
        {id: 1, title: "Emergency food distribution", location: "Ratnapura District", urgency: "High"},
        {id: 2, title: "Debris clearing", location: "Colombo District", urgency: "Medium"},
        {id: 3, title: "Flood damage delivery", location: "Galle District", urgency: "High"},
        {id: 4, title: "Medical aid distribution", location: "Kandy District", urgency: "Critical"},
        {id: 5, title: "Shelter setup assistance", location: "Matara District", urgency: "Medium"},
        {id: 6, title: "Water supply coordination", location: "Kurunegala District", urgency: "High"},
    ]

    const filteredTasks = tasks.filter(
        t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.location.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <View className="flex-1 bg-blue-50">
            <View className="relative">
                <View style={{height: 100, overflow: "hidden"}}>
                    <Image
                        source={require("../../assets/images/donation_type_top_bg.png")}
                        resizeMode="stretch"
                        style={{position: "absolute", left: 0, right: 0, bottom: 0, width: "110%", height: 100}}
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
                        <Text className="text-white text-base font-semibold">Available Task</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 -mt-4 relative z-10">
                <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3 mt-10">
                    <Ionicons name="search-outline" size={20} color="#9CA3AF"/>
                    <TextInput
                        className="flex-1 ml-3 text-gray-700"
                        placeholder="Search Task"
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <View className="pb-6 mt-10">
                    {filteredTasks.map(task => (
                        <View
                            key={task.id}
                            className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-blue-100"
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-1 mr-4">
                                    <Text className="text-gray-800 font-medium text-base mb-2">{task.title}</Text>

                                    <View className="flex-row items-center">
                                        <Ionicons name="location-outline" size={16} color="#6B7280"/>
                                        <Text className="text-gray-600 text-sm ml-1">{task.location}</Text>
                                    </View>

                                    <View style={{marginTop: 8, alignSelf: "flex-start"}}>
                                        <View
                                            className="px-2 py-1 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    task.urgency === "Critical" ? "#FEE2E2" :
                                                        task.urgency === "High" ? "#FFEDD5" :
                                                            "#FEF3C7",
                                            }}
                                        >
                                            <Text
                                                className="text-xs font-medium"
                                                style={{
                                                    color:
                                                        task.urgency === "Critical" ? "#B91C1C" :
                                                            task.urgency === "High" ? "#C2410C" :
                                                                "#A16207",
                                                }}
                                            >
                                                {task.urgency}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => router.push('/volunteerAdmin/manage_task')}
                                    className="bg-blue-500 px-4 py-2 rounded-lg">
                                    <Text className="text-white font-medium text-sm">View Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                {filteredTasks.length === 0 && (
                    <View className="bg-white rounded-xl p-8">
                        <Text className="text-gray-500 text-base text-center">
                            No tasks found matching your search.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default AvailableTask
