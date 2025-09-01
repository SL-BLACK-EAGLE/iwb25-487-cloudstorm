import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { router } from "expo-router"

const MyProfile = () => {
    const [dob, setDob] = useState(new Date("2002-10-05"));
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [role, setRole] = useState("DONOR");
    const [showRolePicker, setShowRolePicker] = useState(false);

    const [language, setLanguage] = useState("English");
    const [showLangPicker, setShowLangPicker] = useState(false);

    const roleOptions = ["DONOR", "RECIPIENT", "ADMIN"];
    const langOptions = ["English", "Sinhala", "Tamil"];

    return (
        <ScrollView className="flex-1 bg-[#E8F5FB]">
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
                            <Text className="text-white text-xl font-semibold">Your Profile</Text>
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

            <View className="flex-1 px-6 pt-20 mt-10">
                <View className="bg-red-500 self-start px-3 py-1 rounded mb-8">
                    <Text className="text-white text-xs font-bold">URGENT</Text>
                </View>

                <View className="gap-y-6">
                    <View>
                        <Text className="text-gray-700 text-sm font-medium mb-3">Select Your Role :</Text>
                        <TouchableOpacity
                            onPress={() => setShowRolePicker(true)}
                            className="bg-white border border-gray-300 rounded-lg p-4 flex-row justify-between items-center"
                        >
                            <Text className="text-gray-700">{role}</Text>
                            <Ionicons name="chevron-down" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row gap-x-4">
                        <View className="flex-1">
                            <Text className="text-gray-700 text-sm font-medium mb-3">First name :</Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg p-4 text-gray-700"
                                value="Rashmika"
                                placeholder="First name"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-700 text-sm font-medium mb-3">Last name :</Text>
                            <TextInput
                                className="bg-white border border-gray-300 rounded-lg p-4 text-gray-700"
                                value="Gunathilaka"
                                placeholder="Last name"
                            />
                        </View>
                    </View>

                    <View>
                        <Text className="text-gray-700 text-sm font-medium mb-3">Mobile :</Text>
                        <TextInput
                            className="bg-white border border-gray-300 rounded-lg p-4 text-gray-700"
                            value="0701448908"
                            placeholder="Mobile number"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-700 text-sm font-medium mb-3">Gender :</Text>
                        <TouchableOpacity className="bg-white border border-gray-300 rounded-lg p-4 flex-row justify-between items-center">
                            <Text className="text-gray-700">Male</Text>
                            <Ionicons name="chevron-down" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text className="text-gray-700 text-sm font-medium mb-3">Date of birth :</Text>
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            className="bg-white border border-gray-300 rounded-lg p-4 flex-row justify-between items-center"
                        >
                            <Text className="text-gray-700">{dob.toISOString().split("T")[0]}</Text>
                            <Ionicons name="calendar-outline" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text className="text-gray-700 text-sm font-medium mb-3">Language :</Text>
                        <TouchableOpacity
                            onPress={() => setShowLangPicker(true)}
                            className="bg-white border border-gray-300 rounded-lg p-4 flex-row justify-between items-center"
                        >
                            <Text className="text-gray-700">{language}</Text>
                            <Ionicons name="chevron-down" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text className="text-gray-700 text-sm font-medium mb-3">Time Zone :</Text>
                        <TextInput
                            className="bg-white border border-gray-300 rounded-lg p-4 text-gray-700"
                            value="GMT+5:30"
                            placeholder="Time zone"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-700 text-sm font-medium mb-3">Emergency Contact :</Text>
                        <TextInput
                            className="bg-white border border-gray-300 rounded-lg p-4 text-gray-700"
                            value="0701448908"
                            placeholder="Emergency contact"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <TouchableOpacity className="bg-[#1BA3D6] rounded-xl p-4 mt-10 mb-10">
                        <Text className="text-white text-center text-lg font-semibold">Update Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={dob}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setDob(selectedDate);
                    }}
                />
            )}

            <Modal visible={showRolePicker} transparent animationType="slide">
                <Pressable className="flex-1 bg-black/40" onPress={() => setShowRolePicker(false)}>
                    <View className="mt-auto bg-white rounded-t-2xl p-6">
                        <Text className="text-lg font-semibold mb-4">Select Role</Text>
                        {roleOptions.map((item) => (
                            <Pressable
                                key={item}
                                onPress={() => {
                                    setRole(item);
                                    setShowRolePicker(false);
                                }}
                                className="p-4 border-b border-gray-200"
                            >
                                <Text className="text-gray-800">{item}</Text>
                            </Pressable>
                        ))}
                        <Pressable onPress={() => setShowRolePicker(false)} className="p-4">
                            <Text className="text-center text-red-500 font-semibold">Cancel</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>

            <Modal visible={showLangPicker} transparent animationType="slide">
                <Pressable className="flex-1 bg-black/40" onPress={() => setShowLangPicker(false)}>
                    <View className="mt-auto bg-white rounded-t-2xl p-6">
                        <Text className="text-lg font-semibold mb-4">Select Language</Text>
                        {langOptions.map((item) => (
                            <Pressable
                                key={item}
                                onPress={() => {
                                    setLanguage(item);
                                    setShowLangPicker(false);
                                }}
                                className="p-4 border-b border-gray-200"
                            >
                                <Text className="text-gray-800">{item}</Text>
                            </Pressable>
                        ))}
                        <Pressable onPress={() => setShowLangPicker(false)} className="p-4">
                            <Text className="text-center text-red-500 font-semibold">Cancel</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </ScrollView>
    );
};

export default MyProfile;
