import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, TextInput,Image } from "react-native"
import { ChevronLeft, Mountain } from "lucide-react-native"
import { Ionicons } from "@expo/vector-icons"
import {router} from "expo-router";

const VerifyProcess = () => {
    const [note, setNote] = useState("")

    const handleApprove = () => {
        console.log("[v0] Task approved with note:", note)
    }

    const handleBack = () => {
        console.log("[v0] Navigate back")
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
                        <Text className="text-white text-base font-semibold">Verify Process</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
                <View className="mb-6">
                    <Text className="text-gray-900 text-xl font-bold mb-2">Emergency Food Distribution</Text>
                    <Text className="text-gray-600 text-base mb-1">Downtown Community center</Text>
                    <Text className="text-gray-600 text-base">4/5 volunteers</Text>
                </View>

                <View className="mb-6">
                    <Text className="text-gray-900 text-lg font-semibold mb-4">Images</Text>
                    <View className="flex-row justify-between">
                        {[1, 2, 3].map((index) => (
                            <View
                                key={index}
                                className="w-24 h-24 bg-white rounded-lg border border-gray-200 items-center justify-center shadow-sm"
                            >
                                <Mountain size={32} color="#9CA3AF" />
                            </View>
                        ))}
                    </View>
                </View>

                <View className="mb-8">
                    <Text className="text-gray-900 text-lg font-semibold mb-4">Note</Text>
                    <TextInput
                        value={note}
                        onChangeText={setNote}
                        placeholder="Add your notes here..."
                        multiline
                        numberOfLines={4}
                        className="bg-white border border-gray-200 rounded-lg p-4 text-gray-900 text-base min-h-[100px]"
                        style={{ textAlignVertical: "top" }}
                    />
                </View>

                <TouchableOpacity
                    onPress={handleApprove}
                    className="bg-blue-500 rounded-lg py-4 px-6 items-center mb-8 shadow-sm"
                >
                    <Text className="text-white text-lg font-semibold">Approved</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default VerifyProcess
