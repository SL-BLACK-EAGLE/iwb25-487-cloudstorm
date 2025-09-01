import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { ArrowLeft } from "lucide-react"


const UserReliefServiceRequests = () => {
    return (
        <View className="flex-1 bg-slate-100">
            <View className="relative">
                <View className="bg-gradient-to-br from-cyan-400 to-blue-500 h-32 rounded-b-[40px]">
                    <View className="flex-row items-center justify-between px-6 pt-12">
                        <TouchableOpacity className="p-2">
                            <ArrowLeft size={24} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white text-lg font-semibold flex-1 text-center mr-10">
                            User Relief Service Requests
                        </Text>
                    </View>
                </View>

                <View className="absolute bottom-0 left-0 right-0 h-8 bg-slate-100 rounded-t-[40px]" />
            </View>

            <ScrollView className="flex-1 px-6 pt-6">
                <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                    <View className="flex-row justify-between items-center mb-4">
                        <View className="bg-red-500 px-3 py-1 rounded-full">
                            <Text className="text-white text-sm font-medium">Water Supply</Text>
                        </View>
                        <Text className="text-gray-500 text-sm">2 hours ago</Text>
                    </View>

                    <View className="space-y-3">
                        <View className="flex-row">
                            <Text className="text-gray-600 font-medium w-24">Your name:</Text>
                            <Text className="text-gray-800 flex-1">Rashmika Gunathilaka</Text>
                        </View>

                        <View className="flex-row">
                            <Text className="text-gray-600 font-medium w-24">Mobile:</Text>
                            <Text className="text-gray-800 flex-1">0701448908</Text>
                        </View>

                        <View className="flex-row">
                            <Text className="text-gray-600 font-medium w-24">Category:</Text>
                            <Text className="text-gray-800 flex-1">0701448908</Text>
                        </View>

                        <View className="flex-row">
                            <Text className="text-gray-600 font-medium w-24">Urgency Level:</Text>
                            <Text className="text-red-500 font-medium flex-1">High</Text>
                        </View>

                        <View className="flex-row">
                            <Text className="text-gray-600 font-medium w-24">Date:</Text>
                            <Text className="text-gray-800 flex-1">2024/10/05</Text>
                        </View>

                        <View className="flex-row">
                            <Text className="text-gray-600 font-medium w-24">Description:</Text>
                            <Text className="text-gray-800 flex-1">Water supply</Text>
                        </View>
                    </View>

                    <View className="flex-row gap-3 mt-6">
                        <TouchableOpacity className="flex-1 bg-teal-500 py-3 rounded-lg">
                            <Text className="text-white text-center font-medium">View More</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-1 bg-blue-500 py-3 rounded-lg">
                            <Text className="text-white text-center font-medium">Submitted</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="h-20" />
            </ScrollView>
        </View>
    )
}

export default UserReliefServiceRequests
