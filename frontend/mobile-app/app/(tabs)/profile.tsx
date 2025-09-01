import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native"
import {Ionicons} from "@expo/vector-icons"
import {router} from "expo-router";

const ProfileScreen = () => {
    return (
        <ScrollView className="flex-1 bg-[#E8F5FB]">
            <View className="relative">
                <View className="h-48 mt-2 mx-2 relative">
                    <Image
                        source={require("../../assets/images/blue-glasses.png")}
                        className="w-full"
                        resizeMode="cover"
                    />
                    <View className="absolute mt-10 top-0 left-1/2 -translate-x-1/2 p-4">
                        <Text className="text-white text-xl font-semibold text-center">User Profile</Text>
                    </View>
                </View>

                <View className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <View className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <View
                            className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
                            <Image
                                source={require("../../assets/images/profile-avator.png")}
                                className="w-20 h-20 rounded-full"
                                resizeMode="cover"
                            />
                        </View>
                    </View>
                </View>
            </View>

            <View className="flex-1 px-6 pt-16 mt-20">
                <View className="gap-4 p-4 rounded-2xl">
                    <TouchableOpacity onPress={() => router.push('/VictimUser/victim_dashboard')} className="w-full bg-[#FF6B6B] rounded-2xl p-4 flex-row items-center shadow-sm">
                        <View className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                            <Ionicons name="person-outline" size={18} color="white"/>
                        </View>
                        <Text className="text-white text-lg font-medium">Your Profile Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/profile/notification')} className="w-full bg-[#6C7CE7] rounded-2xl p-4 flex-row items-center shadow-sm">
                        <View className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                            <Ionicons name="notifications-outline" size={18} color="white"/>
                        </View>
                        <Text className="text-white text-lg font-medium">Notifications</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/profile/emergency_contact')} className="w-full bg-[#4ECDC4] rounded-2xl p-4 flex-row items-center shadow-sm">
                        <View className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                            <Ionicons name="people-outline" size={18} color="white"/>
                        </View>
                        <Text className="text-white text-lg font-medium">Emergency Contacts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/profile/reset_password')} className="w-full bg-[#FFB347] rounded-2xl p-4 flex-row items-center shadow-sm">
                        <View className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                            <Ionicons name="settings-outline" size={18} color="white"/>
                        </View>
                        <Text className="text-white text-lg font-medium">Reset Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  className="w-full bg-[#FF69B4] rounded-2xl p-4 flex-row items-center shadow-sm">
                        <View className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                            <Ionicons name="log-out-outline" size={18} color="white"/>
                        </View>
                        <Text className="text-white text-lg font-medium">Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    )
}

export default ProfileScreen
