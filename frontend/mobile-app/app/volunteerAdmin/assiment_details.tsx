import React, {useState} from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {router} from "expo-router";

const shadow = {
    shadowColor: "#8CB9ED",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
    elevation: 8,
};

const AssimentDetails: React.FC = () => {
    const insets = useSafeAreaInsets();
    const [transport, setTransport] = useState<"own" | "public">("own");
    const [notes, setNotes] = useState("");

    const onConfirm = () => {
        Alert.alert("Confirmed ✅", `Transport: ${transport}\nNotes: ${notes || "-"}`);
    };

    const onCancel = () => {
        Alert.alert("Cancelled", "You can review again anytime.");
    };

    return (
        <View className="flex-1" style={{backgroundColor: "#EAF6FF"}}>
            <View
                className="relative"
                style={{height: 500, paddingTop: (insets?.top ?? 0) + 8, overflow: "hidden"}}
            >

                <Image
                    source={require("../../assets/images/top_bg.png")}
                    resizeMode="cover"
                    style={{
                        position: "absolute",
                        right: -10,
                        top: 0,
                    }}
                />

                <View className="flex-row items-center" style={{paddingHorizontal: 16, marginTop: -15}}>
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                        hitSlop={{top: 0, bottom: 8, left: 8, right: 8}}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={24} color="#fff"/>
                    </TouchableOpacity>
                </View>

                <View
                    pointerEvents="none"
                    className="items-center"
                    style={{position: "absolute", left: 0, right: 0, top: (insets?.top ?? 0) - 15}}
                >
                    <Text className="text-white text-lg font-semibold">Assignment Match</Text>
                </View>
            </View>

            <ScrollView
                style={{position: "absolute", top: 100, left: 0, right: 0, bottom: 0}}
                contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 24}}
                showsVerticalScrollIndicator={false}
            >
                <View className="items-center mb-4 -mt-10">
                    <View className="w-16 h-16 rounded-full items-center justify-center mb-2 p-6"
                          style={{backgroundColor: "#37e776"}}>
                        <Ionicons name="checkmark" size={30} color="#fff"/>
                    </View>
                    <Text className="text-base font-bold text-gray-900">Almost There!</Text>
                    <Text className="text-gray-600 text-center text-sm">Review your assignment details</Text>
                </View>

                <Text className="text-gray-900 font-semibold mb-3">Emergency Food Distribution</Text>

                <LinearGradient
                    colors={["#30f586", "#077e52"]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    className="self-center mb-6"
                    style={[{borderRadius: 16, padding: 14, marginBottom: 18, width: "85%"}, shadow]}
                >
                    <View className="bg-white/12 rounded-xl px-4 py-3">
                        <Text className="text-white font-semibold">City Center Community Hall</Text>
                        <View className="mt-3 space-y-1.5">
                            <View className="flex-row items-center">
                                <Ionicons name="time-outline" size={16} color="#fff"/>
                                <Text className="text-white ml-2">Today: 2:00 PM - 6:00 PM</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons name="person-outline" size={16} color="#fff"/>
                                <Text className="text-white ml-2">Contact: Sarah Johnson</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons name="call-outline" size={16} color="#CFFAFE"/>
                                <Text className="text-white ml-2">+65 1234 5678</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                <Text className="text-gray-900 font-semibold mb-2">Transportation Method</Text>
                <View className="flex-row items-center mb-16 mt-4 gap-4">
                    <TouchableOpacity className="flex-row items-center mr-8" onPress={() => setTransport("own")}>
                        <Ionicons
                            name={transport === "own" ? "radio-button-on" : "radio-button-off"}
                            size={18}
                            color={transport === "own" ? "#111827" : "#9CA3AF"}
                        />
                        <Text className="ml-2 text-gray-800">Own Vehicles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center" onPress={() => setTransport("public")}>
                        <Ionicons
                            name={transport === "public" ? "radio-button-on" : "radio-button-off"}
                            size={18}
                            color={transport === "public" ? "#111827" : "#9CA3AF"}
                        />
                        <Text className="ml-2 text-gray-800">Public Transport</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-gray-900 font-semibold mb-2 mt-10">Special Notes (Optional)</Text>
                <TextInput
                    multiline
                    textAlignVertical="top"
                    placeholder="Text area for additional information"
                    placeholderTextColor="#9CA3AF"
                    value={notes}
                    onChangeText={setNotes}
                    className="bg-white rounded-xl px-4 py-3 mb-6 border border-blue-300"
                    style={{height: 120}}
                />

                <View style={shadow} className="rounded-3xl overflow-hidden mb-3">
                    <LinearGradient colors={["#60A5FA", "#3B82F6"]} start={{x:0,y:0}} end={{x:1,y:0}}>
                        <TouchableOpacity
                            onPress={onConfirm}
                            activeOpacity={0.9}
                            className="w-full items-center justify-center p-4"
                        >
                            <Text className="text-white text-lg font-semibold">
                                Confirm & Accept Assignment
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                <View style={shadow} className="rounded-3xl overflow-hidden">
                    <LinearGradient colors={["#22D3EE", "#06B6D4"]} start={{x:0,y:0}} end={{x:1,y:0}}>
                        <TouchableOpacity
                            onPress={onCancel}
                            activeOpacity={0.9}
                            className="w-full items-center justify-center p-4"
                        >
                            <Text className="text-white text-lg font-semibold">Cancel</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

            </ScrollView>
        </View>
    );
};

export default AssimentDetails;
