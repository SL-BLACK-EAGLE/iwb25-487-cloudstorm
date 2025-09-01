import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";

const BurnsElectrical = () => {
    return (
        <View className="flex-1 bg-blue-100">
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
                        <Text className="text-white text-base font-semibold">Burns & Electrical</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
                <Text className="text-gray-800 text-lg font-bold mb-4">BURN TREATMENT:</Text>

                <Text className="text-gray-800 text-base font-semibold mb-3">STEP 1: COOL THE BURN</Text>

                <View className="bg-red-500 rounded-xl p-4 mb-6 shadow-lg">
                    <Text className="text-white text-sm font-medium leading-relaxed">
                        Cool running water{"\n"}
                        10-20 minutes{"\n"}
                        NOT ice directly{"\n"}
                        Remove from heat source first
                    </Text>
                </View>

                <View className="bg-green-500 rounded-xl p-4 mb-6 shadow-lg">
                    <Text className="text-white text-base font-bold mb-2">STEP 2: PROTECT</Text>
                    <Text className="text-white text-sm font-medium">• Loosely cover with clean, dry cloth</Text>
                    <Text className="text-white text-sm font-medium">• Do NOT break blisters</Text>
                    <Text className="text-white text-sm font-medium">• Do NOT apply ointments</Text>
                </View>

                <View className="bg-blue-500 rounded-xl p-4 mb-4 shadow-lg">
                    <Text className="text-white text-base font-bold mb-2">ELECTRICAL BURNS:</Text>
                    <View className="flex-row items-center">
                        <Text className="text-yellow-300 text-lg mr-2">⚠️</Text>
                        <View className="flex-1">
                            <Text className="text-yellow-300 text-sm font-bold">DANGER</Text>
                            <Text className="text-white text-sm font-medium">DO NOT TOUCH{"\n"}until power is OFF</Text>
                        </View>
                    </View>
                </View>

                <View className="bg-orange-500 rounded-xl p-4 mb-6 shadow-lg">
                    <Text className="text-white text-base font-bold mb-3">ELECTRICAL SAFETY:</Text>
                    <Text className="text-white text-sm font-medium mb-1">• Turn off power source</Text>
                    <Text className="text-white text-sm font-medium mb-1">• Use wooden/plastic tool to move victim</Text>
                    <Text className="text-white text-sm font-medium mb-3">• Check for breathing</Text>

                    <Text className="text-white text-sm font-bold mb-1">STORM ELECTRICAL RISKS:</Text>
                    <Text className="text-white text-sm font-medium mb-1">• Downed power lines</Text>
                    <Text className="text-white text-sm font-medium mb-1">• Flooded electrical</Text>
                    <Text className="text-white text-sm font-medium">• Lightning strikes</Text>
                </View>

                <TouchableOpacity className="bg-blue-600 rounded-xl py-4 px-6 shadow-lg">
                    <Text className="text-white text-center text-base font-bold">WATCH VIDEO DEMO</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default BurnsElectrical
