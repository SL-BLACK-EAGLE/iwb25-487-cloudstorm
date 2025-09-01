import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import {router} from "expo-router";

const SevereBleeding = () => {
    return (
        <View className="flex-1 bg-gray-100">
            {/* Header */}
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
                        <Text className="text-white text-base font-semibold">Severe Bleeding</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
                {/* Critical Header */}
                <Text className="text-black text-lg font-bold mb-6">CRITICAL: STOP BLEEDING</Text>

                {/* Step 1 */}
                <Text className="text-black text-base font-semibold mb-4">STEP 1: DIRECT PRESSURE</Text>

                <View className="bg-red-500 rounded-lg p-4 mb-6">
                    <Text className="text-white text-center font-semibold text-base leading-6">
                        Press FIRMLY on{"\n"}wound{"\n"}Use clean cloth/gauze{"\n"}DO NOT remove{"\n"}debris
                    </Text>
                </View>

                {/* Step 2 */}
                <Text className="text-black text-base font-semibold mb-4">STEP 2: ELEVATION</Text>

                <View className="mb-6">
                    <Text className="text-black text-sm mb-2">• Raise injured area above heart level if possible</Text>
                    <Text className="text-black text-sm">• Keep applying pressure</Text>
                </View>

                {/* Step 3 */}
                <Text className="text-black text-base font-semibold mb-4">STEP 3: PRESSURE POINTS</Text>

                <View className="mb-6">
                    <Text className="text-black text-sm font-medium mb-2">If bleeding continues:</Text>
                    <Text className="text-black text-sm">• Press on artery above wound (toward heart)</Text>
                </View>

                {/* Tourniquet Warning */}
                <View className="flex-row items-start mb-6">
                    <Ionicons name="warning" size={20} color="#F59E0B" className="mr-2 mt-1" />
                    <View className="flex-1">
                        <Text className="text-black text-sm font-bold">TOURNIQUET (Last resort)</Text>
                    </View>
                </View>

                <View className="mb-8">
                    <Text className="text-black text-sm font-medium mb-2">Only if life-threatening:</Text>
                    <Text className="text-black text-sm mb-1">• 2-4 inches above wound</Text>
                    <Text className="text-black text-sm">• Note time applied</Text>
                </View>

                {/* Video Demo Button */}
                <TouchableOpacity className="bg-blue-500 rounded-lg py-4 px-6 items-center">
                    <Text className="text-white text-base font-semibold">WATCH VIDEO DEMO</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default SevereBleeding
