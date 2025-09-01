"use client"

import React, { useMemo, useState } from "react"
import {View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Image} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import {router} from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CompleteYourAssignment = () => {
    const insets = useSafeAreaInsets();
    const [note, setNote] = useState("")
    const [uploadedPhotos, setUploadedPhotos] = useState<boolean[]>([false, false, false])

    const allUploaded = useMemo(() => uploadedPhotos.every(Boolean), [uploadedPhotos])

    const handlePhotoUpload = (index: number) => {
        const next = [...uploadedPhotos]
        next[index] = !next[index]
        setUploadedPhotos(next)
    }

    const handleSubmit = () => {
        if (!allUploaded) {
            Alert.alert("Photos required", "Please upload all three photos before submitting.")
            return
        }
        Alert.alert("Submitted", "Your assignment has been submitted successfully.")
    }

    const handleCancel = () => {
        Alert.alert("Cancelled", "Assignment completion cancelled.")
    }

    return (
        <View className="flex-1" style={{ backgroundColor: "#E8F5FB" }}>
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
                        <Text className="text-white text-base font-semibold">Complete Your Assignment</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: (insets?.bottom ?? 0) + 120 }}
            >
                <View className="mb-8 mt-10">
                    <Text className="text-gray-700 text-base font-medium mb-3 text-center">Current Status</Text>

                    <View className="items-center">
                        <LinearGradient
                            colors={["#06B6D4", "#0891B2"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                width: "78%",
                                borderRadius: 22,
                                paddingVertical: 50,
                                paddingHorizontal: 20,
                                shadowColor: "#8CB9ED",
                                shadowOpacity: 0.25,
                                shadowRadius: 12,
                                shadowOffset: { width: 0, height: 6 },
                                elevation: 8,
                            }}
                        >
                            <Text className="text-white text-lg font-semibold text-center">In Progress</Text>
                        </LinearGradient>
                    </View>
                </View>

                {/* Upload Photos */}
                <View className="mb-8">
                    <Text className="text-gray-700 text-base font-medium mb-4">Upload Photos</Text>

                    <View className="flex-row justify-between mb-3">
                        {[0, 1, 2].map((i) => {
                            const selected = uploadedPhotos[i]
                            return (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => handlePhotoUpload(i)}
                                    style={{
                                        width: 84,
                                        height: 84,
                                        borderRadius: 12,
                                        backgroundColor: "#fff",
                                        borderWidth: 2,
                                        borderColor: selected ? "#10B981" : "#D1D5DB",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        shadowColor: "#000",
                                        shadowOpacity: 0.06,
                                        shadowRadius: 8,
                                        shadowOffset: { width: 0, height: 4 },
                                        elevation: 3,
                                    }}
                                    activeOpacity={0.9}
                                >
                                    <Ionicons
                                        name={selected ? "checkmark-done-circle" : "image-outline"}
                                        size={32}
                                        color={selected ? "#10B981" : "#9CA3AF"}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    <Text className="text-gray-600 text-xs text-center">
                        Please upload three images showing how you completed your assignment.
                    </Text>
                </View>

                {/* Add Note */}
                <View className="mb-8">
                    <Text className="text-gray-700 text-base font-medium mb-3">Add Note</Text>
                    <TextInput
                        className="bg-white rounded-xl border-2 border-blue-200 p-4 h-32 text-gray-800"
                        placeholder="Add your notes here..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                        textAlignVertical="top"
                        value={note}
                        onChangeText={setNote}
                    />
                </View>

                <View
                    className="absolute left-0 right-0 px-6"
                    style={{ bottom: (insets?.bottom ?? 0) + 12 }}
                >
                    <View className="gap-4">
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={handleSubmit}
                            disabled={!allUploaded}
                            style={{
                                borderRadius: 14,
                                overflow: "hidden",
                                opacity: allUploaded ? 1 : 0.6,
                                shadowColor: "#8CB9ED",
                                shadowOpacity: 0.25,
                                shadowRadius: 12,
                                shadowOffset: { width: 0, height: 6 },
                                elevation: 8,
                            }}
                        >
                            <LinearGradient
                                colors={["#60A5FA", "#3B82F6"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ paddingVertical: 14 }}
                            >
                                <Text className="text-white text-lg font-semibold text-center">Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={handleCancel}
                            style={{
                                borderRadius: 14,
                                overflow: "hidden",
                                shadowColor: "#8CB9ED",
                                shadowOpacity: 0.25,
                                shadowRadius: 12,
                                shadowOffset: { width: 0, height: 6 },
                                elevation: 8,
                            }}
                        >
                            <LinearGradient
                                colors={["#22D3EE", "#06B6D4"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ paddingVertical: 14 }}
                            >
                                <Text className="text-white text-lg font-semibold text-center">Cancel</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CompleteYourAssignment
