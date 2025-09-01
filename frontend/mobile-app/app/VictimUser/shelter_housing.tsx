import {View, Text, TouchableOpacity, Image} from "react-native"
import {router} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";


const shadow = {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
} as const;

const cardStyle = {
    borderRadius: 24,
    padding: 24,
    alignItems: "center" as const,
    ...shadow,
};

const ShelterHousing = () => {
    return (
        <View className="flex-1 bg-blue-50">
            {/* Header */}
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
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <View className="absolute left-0 right-0 mt-6 items-center">
                        <Text className="text-white text-base font-semibold">Shelter & Housing</Text>
                    </View>
                </View>
            </View>

            {/* Content */}
            <View className="flex-1 px-6 pt-8">
                <Text className="text-gray-800 text-base mb-8 leading-relaxed">
                    Life-threatening situation requires immediate help
                </Text>

                {/* Service Cards Grid */}
                <View className="flex-row flex-wrap justify-between">
                    {/* Immediate Shelter */}
                    <TouchableOpacity onPress={() => router.push('/VictimUser/immediate_shelter')} className="w-[48%] mb-6" activeOpacity={0.9}>
                        <LinearGradient
                            colors={["#FF6B8B", "#FF5D5D"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={cardStyle}
                        >
                            <View style={{borderRadius: 16, padding: 16, marginBottom: 16 }}>
                                <Text style={{ fontSize: 28, color: "#fb7185" }}>🏠</Text>
                            </View>
                        </LinearGradient>
                        <Text className="text-gray-800 text-sm font-bold text-center mt-3">IMMEDIATE SHELTER</Text>
                        <Text className="text-gray-600 text-xs text-center mt-1">(Available Now)</Text>
                    </TouchableOpacity>

                    {/* Nearest Evacuation Center */}
                    <TouchableOpacity onPress={() => router.push('/VictimUser/nearest_evacuation_center')} className="w-[48%] mb-6" activeOpacity={0.9}>
                        <LinearGradient
                            colors={["#FBBF24", "#F59E0B"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={cardStyle}
                        >
                            <View style={{ borderRadius: 16, padding: 16, marginBottom: 16 }}>
                                <Text style={{ fontSize: 28, color: "#f59e0b" }}>🏘️</Text>
                            </View>
                        </LinearGradient>
                        <Text className="text-gray-800 text-sm font-bold text-center mt-3">NEAREST</Text>
                        <Text className="text-gray-800 text-sm font-bold text-center">EVACUATION</Text>
                        <Text className="text-gray-800 text-sm font-bold text-center">CENTER</Text>
                    </TouchableOpacity>

                    {/* Temporary Housing */}
                    <TouchableOpacity onPress={() => router.push('/VictimUser/temporary_housing')} className="w-[48%] mb-6" activeOpacity={0.9}>
                        <LinearGradient
                            colors={["#22C55E", "#10B981"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={cardStyle}
                        >
                            <View style={{ borderRadius: 16, padding: 16, marginBottom: 16 }}>
                                <Text style={{ fontSize: 28, color: "#22C55E" }}>🏡</Text>
                            </View>
                        </LinearGradient>
                        <Text className="text-gray-800 text-sm font-bold text-center mt-3">TEMPORARY</Text>
                        <Text className="text-gray-800 text-sm font-bold text-center">HOUSING</Text>
                    </TouchableOpacity>

                    {/* Your Requests */}
                    <TouchableOpacity  className="w-[48%] mb-6" activeOpacity={0.9}>
                        <LinearGradient
                            colors={["#60A5FA", "#3B82F6"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={cardStyle}
                        >
                            <View style={{ borderRadius: 16, padding: 16, marginBottom: 16 }}>
                                <Text style={{ fontSize: 28, color: "#3B82F6" }}>💬</Text>
                            </View>
                        </LinearGradient>
                        <Text className="text-gray-800 text-sm font-bold text-center mt-3">Your Requests</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ShelterHousing
