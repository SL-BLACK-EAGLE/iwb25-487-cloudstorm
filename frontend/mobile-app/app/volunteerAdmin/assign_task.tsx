import React, { useState } from "react"
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"

const AssignTask: React.FC = () => {
    const [taskSearch, setTaskSearch] = useState("")
    const [volunteerSearch, setVolunteerSearch] = useState("")
    const [selectedTask, setSelectedTask] = useState<string>("")
    const [selectedVolunteer, setSelectedVolunteer] = useState<string>("")
    const [showTaskDropdown, setShowTaskDropdown] = useState(false)
    const [showVolunteerDropdown, setShowVolunteerDropdown] = useState(false)

    const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "error" }>({
        visible: false,
        message: "",
        type: "success",
    })

    const tasks = [
        "Emergency Food Distribution",
        "Debris Clean-up",
        "Medical Supply Delivery",
        "Water Supply Distribution",
        "Shelter Setup",
    ]
    const volunteers = ["Dimitra Palamartchouk", "Rashmika Gunathilaka", "John Smith", "Sarah Johnson", "Mike Wilson"]

    const filteredTasks = tasks.filter(t => t.toLowerCase().includes(taskSearch.toLowerCase()))
    const filteredVolunteers = volunteers.filter(v => v.toLowerCase().includes(volunteerSearch.toLowerCase()))

    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ visible: true, message, type })
        setTimeout(() => setToast(t => ({ ...t, visible: false })), 1800)
    }

    const handleAssign = () => {
        if (!selectedTask || !selectedVolunteer) {
            showToast("Select a task and a volunteer", "error")
            return
        }
        showToast("Task assigned successfully!", "success")
    }

    return (
        <View className="flex-1" style={{ backgroundColor: "#EAF6FF" }}>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="relative">
                    <View style={{ height: 100, overflow: "hidden" }}>
                        <Image
                            source={require("../../assets/images/donation_type_top_bg.png")}
                            resizeMode="stretch"
                            style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "110%", height: 100, alignSelf: "center" }}
                        />
                    </View>
                    <View className="absolute left-0 right-0 top-0 mt-4 px-4 pt-6">
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center" onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        <View className="absolute left-0 right-0 mt-6 items-center">
                            <Text className="text-white text-base font-semibold">Assign Task</Text>
                        </View>
                    </View>
                </View>

                <View className="px-6 pt-6 pb-10">
                    <View style={{ marginBottom: 24 }}>
                        <Text className="text-gray-800 text-lg font-medium mb-4">Select Task</Text>

                        <View
                            className="flex-row items-center bg-white rounded-xl px-4 py-3 border border-gray-200"
                            style={{ shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 }}
                        >
                            <Ionicons name="search-outline" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
                            <TextInput
                                placeholder="Search Task"
                                value={taskSearch}
                                onChangeText={setTaskSearch}
                                className="flex-1 text-gray-700 text-base"
                                placeholderTextColor="#9CA3AF"
                            />
                            <TouchableOpacity onPress={() => setShowTaskDropdown(v => !v)}>
                                <Ionicons name={showTaskDropdown ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>

                        {showTaskDropdown && (
                            <View
                                className="bg-white rounded-xl mt-2 border border-gray-200 overflow-hidden"
                                style={{ shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 }}
                            >
                                {filteredTasks.map((task, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => {
                                            setSelectedTask(task)
                                            setShowTaskDropdown(false)
                                        }}
                                        className="px-4 py-3 border-b border-gray-100"
                                    >
                                        <Text className="text-gray-800 text-base">{task}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        {!!selectedTask && (
                            <View
                                className="bg-white rounded-2xl mt-3 px-4 py-3 border border-gray-100"
                                style={{ shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 5 }}
                            >
                                <View className="flex-row items-start justify-between">
                                    <View className="flex-1 pr-3">
                                        <Text className="text-gray-900 font-semibold">{selectedTask}</Text>
                                        <Text className="text-gray-500 text-xs mt-1">Regional Hospital</Text>
                                        <Text className="text-gray-500 text-xs mt-1">8/15 volunteers</Text>
                                    </View>
                                    <TouchableOpacity activeOpacity={0.9} className="rounded-lg overflow-hidden self-start">
                                        <LinearGradient
                                            colors={["#3B82F6", "#2563EB"]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 }}
                                        >
                                            <Text className="text-white text-xs font-semibold">View Details</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>

                    <View style={{ marginBottom: 24 }}>
                        <Text className="text-gray-800 text-lg font-medium mb-4">Select Volunteer</Text>

                        <View
                            className="flex-row items-center bg-white rounded-xl px-4 py-3 border border-gray-200"
                            style={{ shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 }}
                        >
                            <Ionicons name="search-outline" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
                            <TextInput
                                placeholder="Search Volunteer"
                                value={volunteerSearch}
                                onChangeText={setVolunteerSearch}
                                className="flex-1 text-gray-700 text-base"
                                placeholderTextColor="#9CA3AF"
                            />
                            <TouchableOpacity onPress={() => setShowVolunteerDropdown(v => !v)}>
                                <Ionicons name={showVolunteerDropdown ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>

                        {showVolunteerDropdown && (
                            <View
                                className="bg-white rounded-xl mt-2 border border-gray-200 overflow-hidden"
                                style={{ shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 }}
                            >
                                {filteredVolunteers.map((v, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => {
                                            setSelectedVolunteer(v)
                                            setShowVolunteerDropdown(false)
                                        }}
                                        className="px-4 py-3 border-b border-gray-100"
                                    >
                                        <Text className="text-gray-800 text-base">{v}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        {!!selectedVolunteer && (
                            <View
                                className="bg-white rounded-2xl mt-3 px-4 py-3 border border-gray-100 flex-row items-center"
                                style={{ shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 5 }}
                            >
                                <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: "#E6F0FF" }}>
                                    <Ionicons name="person-outline" size={18} color="#2563EB" />
                                </View>
                                <Text className="text-gray-800 font-medium">{selectedVolunteer}</Text>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity activeOpacity={0.9} className="rounded-xl overflow-hidden" onPress={handleAssign}>
                        <LinearGradient
                            colors={["#3B82F6", "#2563EB"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ paddingVertical: 14, borderRadius: 12 }}
                        >
                            <Text className="text-white text-center text-lg font-semibold">Assign</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {toast.visible && (
                <View
                    pointerEvents="none"
                    style={{ position: "absolute", left: 16, right: 16, bottom: 32 }}
                >
                    <LinearGradient
                        colors={toast.type === "success" ? ["#34D399", "#059669"] : ["#FCA5A5", "#EF4444"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            borderRadius: 9999,
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            shadowColor: "#000",
                            shadowOpacity: 0.12,
                            shadowRadius: 12,
                            shadowOffset: { width: 0, height: 6 },
                            elevation: 6,
                        }}
                    >
                        <Ionicons
                            name={toast.type === "success" ? "checkmark-circle" : "alert-circle"}
                            size={18}
                            color="#fff"
                        />
                        <Text style={{ color: "#fff", fontWeight: "600", marginLeft: 8 }}>
                            {toast.message}
                        </Text>
                    </LinearGradient>
                </View>
            )}
        </View>
    )
}

export default AssignTask
