import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"

const FracturesTrauma = () => {
    return (
        <View className="flex-1 bg-blue-50">
            <View className="relative">
                <View style={{ height: 100, overflow: "hidden" }}>
                    <Image
                        source={require("../../assets/images/donation_type_top_bg.png")}
                        resizeMode="stretch"
                        style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "110%", height: 100 }}
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
                        <Text className="text-white text-base font-semibold">Fractures & Trauma</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
                <Text className="text-gray-800 text-lg font-bold mb-4">SUSPECTED FRACTURE</Text>

                <View className="bg-red-500 rounded-xl p-4 mb-6">
                    <View className="flex-row items-center mb-2">
                        <Text className="text-white text-lg mr-2">⚠️</Text>
                        <Text className="text-white text-lg font-bold">DO NOT MOVE IF:</Text>
                    </View>
                    <Text className="text-white text-base mb-1">• Spinal injury suspected</Text>
                    <Text className="text-white text-base mb-1">• Bone visible through skin</Text>
                    <Text className="text-white text-base mb-1"> (open fracture)</Text>
                    <Text className="text-white text-base">• Person is unconscious</Text>
                </View>

                <Text className="text-gray-800 text-lg font-bold mb-4">SAFE TO TREAT:</Text>

                <View className="bg-green-500 rounded-xl p-4 mb-4">
                    <Text className="text-white text-lg font-bold mb-3">STEP 1: IMMOBILIZE</Text>
                    <Text className="text-white text-base mb-1">• Use splint material</Text>
                    <Text className="text-white text-base mb-1">• Pad with soft items</Text>
                    <Text className="text-white text-base mb-1">• Secure above & below injury</Text>
                    <Text className="text-white text-base">• Don't tie too tight</Text>
                </View>

                <View className="bg-green-500 rounded-xl p-4 mb-6">
                    <Text className="text-white text-lg font-bold mb-3">STEP 2: ELEVATE & ICE</Text>
                    <Text className="text-white text-base mb-1">• Raise above heart</Text>
                    <Text className="text-white text-base">• Apply ice wrapped in cloth (20 min on/off)</Text>
                </View>

                <View className="bg-blue-500 rounded-xl p-4 mb-6">
                    <Text className="text-white text-lg font-bold mb-3">HEAD INJURY SIGNS:</Text>
                    <Text className="text-white text-base mb-1">• Confusion, vomiting</Text>
                    <Text className="text-white text-base mb-1">• Unequal pupils</Text>
                    <Text className="text-white text-base">• Loss of consciousness</Text>
                </View>

                <TouchableOpacity className="bg-blue-500 rounded-xl py-4 px-6 items-center">
                    <Text className="text-white text-lg font-semibold">WATCH VIDEO DEMO</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default FracturesTrauma
