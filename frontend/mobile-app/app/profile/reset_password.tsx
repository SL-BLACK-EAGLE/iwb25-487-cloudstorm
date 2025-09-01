"use client"

import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import {router} from "expo-router";

const ResetPassword = () => {
    const [currentPassword, setCurrentPassword] = useState("123456")
    const [newPassword, setNewPassword] = useState("")
    const [reEnterPassword, setReEnterPassword] = useState("")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showReEnterPassword, setShowReEnterPassword] = useState(false)

    const handleSavePassword = () => {
        console.log("Password save requested")
    }

    return (
        <View className="flex-1 bg-slate-100">
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
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="chevron-back" size={22} color="#fff" />
                        </TouchableOpacity>

                        <View className="absolute left-0 right-0 items-center mt-8">
                            <Text className="text-white text-xl font-semibold">Change Password</Text>
                        </View>
                    </View>
                </View>

                {/* Overlapping avatar */}
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

            <ScrollView className="flex-1 px-6 pt-20 mt-8" showsVerticalScrollIndicator={false}>
                <Text className="text-black text-lg font-semibold mb-6">Change Password</Text>

                <View className="mb-4">
                    <Text className="text-gray-700 text-sm mb-2">Current password:</Text>
                    <View className="relative">
                        <TextInput
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            secureTextEntry={!showCurrentPassword}
                            className="bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 text-gray-800"
                            placeholder="Enter current password"
                        />
                        <TouchableOpacity
                            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-3"
                        >
                            <Ionicons name={showCurrentPassword ? "eye-off" : "eye"} size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mb-4">
                    <Text className="text-gray-700 text-sm mb-2">New password:</Text>
                    <View className="relative">
                        <TextInput
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={!showNewPassword}
                            className="bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 text-gray-800"
                            placeholder="Enter new password"
                        />
                        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-3">
                            <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mb-8">
                    <Text className="text-gray-700 text-sm mb-2">Re-Enter password:</Text>
                    <View className="relative">
                        <TextInput
                            value={reEnterPassword}
                            onChangeText={setReEnterPassword}
                            secureTextEntry={!showReEnterPassword}
                            className="bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 text-gray-800"
                            placeholder="••••••••••"
                        />
                        <TouchableOpacity
                            onPress={() => setShowReEnterPassword(!showReEnterPassword)}
                            className="absolute right-3 top-3"
                        >
                            <Ionicons name={showReEnterPassword ? "eye-off" : "eye"} size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleSavePassword}
                    className="bg-blue-500 rounded-lg py-4 px-8 items-center shadow-sm mb-8"
                >
                    <Text className="text-white text-base font-semibold">Save Password</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default ResetPassword
