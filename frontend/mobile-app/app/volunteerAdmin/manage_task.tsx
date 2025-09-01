import React, {useState} from "react"
import {View, Text, TouchableOpacity, ScrollView, Image} from "react-native"
import {Ionicons} from "@expo/vector-icons"
import {router} from "expo-router";

const ManageTask = () => {
    const [volunteers, setVolunteers] = useState([
        {id: 1, name: "Dimitra Palamartchouk", status: "assigned"},
        {id: 2, name: "Dimitra Palamartchouk", status: "assigned"},
        {id: 3, name: "Dimitra Palamartchouk", status: "pending"},
    ])

    const taskSteps = [
        {step: 1, label: "Pending", status: "completed", color: "bg-red-500"},
        {step: 2, label: "Accepted", status: "completed", color: "bg-yellow-500"},
        {step: 3, label: "In Progress", status: "completed", color: "bg-blue-500"},
        {step: 4, label: "Verification", status: "completed", color: "bg-purple-500"},
        {step: 5, label: "Completed", status: "pending", color: "bg-gray-400"},
    ]

    const handleVolunteerAction = (volunteerId: number, action: string) => {
        if (action === "remove") {
            setVolunteers(volunteers.filter((v) => v.id !== volunteerId))
        } else if (action === "assign") {
            setVolunteers(volunteers.map((v) => (v.id === volunteerId ? {...v, status: "assigned"} : v)))
        }
    }

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
                        <Text className="text-white text-base font-semibold">Manage Task</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 -mt-4 relative z-20">
                <View className="mb-6 mt-10">
                    <Text className="text-xl font-bold text-gray-800 mb-1">Emergency Food Distribution</Text>
                    <Text className="text-gray-600 mb-1">Downtown Community Center</Text>
                    <Text className="text-gray-600">8/15 volunteers</Text>
                </View>

                <View className="mb-6">
                    <Text className="text-lg font-semibold text-gray-800 mb-4">Task Status</Text>

                    <View className="bg-white rounded-2xl p-6 shadow-sm">
                        {taskSteps.map((step, index) => {
                            const isLast = index === taskSteps.length - 1
                            const isDone = step.status === "completed" || step.status === "current"
                            const connectorColor = isDone ? "#60A5FA" : "#E5E7EB"

                            return (
                                <View key={step.step} className="flex-row" style={{ marginBottom: isLast ? 0 : 16 }}>
                                    <View style={{ width: 32, alignItems: "center" }}>
                                        <View className={`w-8 h-8 rounded-full ${step.color} items-center justify-center`}>
                                            {isDone && <Ionicons name="checkmark" size={16} color="#fff" />}
                                        </View>

                                        {!isLast && (
                                            <View
                                                style={{
                                                    width: 2,
                                                    height: 28,
                                                    backgroundColor: connectorColor,
                                                    marginTop: 4,
                                                }}
                                            />
                                        )}
                                    </View>

                                    <View className="flex-1 pl-3">
                                        <Text className="text-xs text-gray-500">STEP {step.step}</Text>
                                        <Text className="text-base font-semibold text-gray-800 leading-tight">
                                            {step.label}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>

                <View className="mb-6">
                    <View className="items-center mb-3">
                        <TouchableOpacity
                            onPress={() => router.push('/volunteerAdmin/verify_process')}
                            activeOpacity={0.85}
                            className="px-4 py-3 rounded-full bg-white border"
                            style={{ borderColor: "#19A7E0" }}
                        >
                            <Text className="text-black text-sm font-medium text-center">Verify Process</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row">
                        <TouchableOpacity
                            activeOpacity={0.85}
                            className="flex-1 mr-3 px-4 py-3 rounded-full bg-white border"
                            style={{ borderColor: "#19A7E0" }}
                        >
                            <Text className="text-black font-medium text-center">Cancelled</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.85}
                            className="flex-1 px-4 py-3 rounded-full bg-white border"
                            style={{ borderColor: "#19A7E0" }}
                        >
                            <Text className="text-black font-medium text-center">On hold</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-lg font-semibold text-gray-800 mb-4">Enrolled Volunteers</Text>
                    {volunteers.map((volunteer) => (
                        <View key={volunteer.id}
                              className="bg-white rounded-xl p-4 mb-3 shadow-sm flex-row items-center">
                            <View className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                <Ionicons name="person" size={20} color="white"/>
                            </View>
                            <View className="flex-1">
                                <Text className="text-base font-medium text-gray-800">{volunteer.name}</Text>
                            </View>
                            <TouchableOpacity
                                className={`px-4 py-2 rounded-lg ${volunteer.status === "assigned" ? "bg-red-500" : "bg-blue-500"}`}
                                onPress={() =>
                                    handleVolunteerAction(volunteer.id, volunteer.status === "assigned" ? "remove" : "assign")
                                }
                            >
                                <Text className="text-white text-sm font-medium">
                                    {volunteer.status === "assigned" ? "Remove" : "Assign"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default ManageTask
