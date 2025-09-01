import React, { useMemo, useState } from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";
import { User } from "react-native-feather"; // Using react-native-feather for people icon

const A = {
    // Same header asset from existing components
    header: require("../../assets/images/header-wave.png"),
    back: require("../../assets/icons/Chevron_Left.png"),
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function EmergencySupplyRequest() {
    const router = useRouter();
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Keep header wave exact same aspect ratio
    const headerAR = useMemo(() => {
        const src = Image.resolveAssetSource(A.header);
        return src.width / src.height; // w/h
    }, []);

    // Mock data for supply requests - you can replace with actual data
    const supplyRequests = [
        {
            id: 1,
            name: "Daniru Dahamneth",
            status: "pending",
            requestDate: "2025-08-16",
            items: ["Water", "Food", "Medical Supplies"],
        },
        {
            id: 2,
            name: "Daniru Dahamneth",
            status: "approved",
            requestDate: "2025-08-15",
            items: ["Blankets", "Food", "Water"],
        },
        {
            id: 3,
            name: "Daniru Dahamneth",
            status: "pending",
            requestDate: "2025-08-16",
            items: ["Medical Supplies", "Clothing"],
        },
    ];

    const handleRequestPress = (request:any) => {
        setSelectedRequest(request);
        // You can navigate to detail page or show modal
        // router.push(`/victim/SupplyRequestDetail/${request.id}`);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F3F5F7]">
            {/* ===== Header (Same pattern as dashboard) ===== */}
            <ImageBackground
                source={A.header}
                resizeMode="cover"
                className={'mt-[45px]'}
                style={{
                    width: SCREEN_WIDTH,
                    aspectRatio: headerAR,
                    borderBottomLeftRadius: 28,
                    borderBottomRightRadius: 28,
                }}
            >
                <View
                    style={{
                        paddingTop: 20,
                        paddingBottom: 14,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Pressable
                        onPress={() => router.back()}
                        className="absolute left-4 top-4 h-10 w-10 items-center justify-center"
                        hitSlop={10}
                    >
                        <Image
                            source={A.back}
                            style={{ width: 22, height: 22, tintColor: "#FFFFFF" }}
                        />
                    </Pressable>

                    <Text className="text-white text-[16px] font-semibold">
                        Emergency Supply Request
                    </Text>
                </View>
            </ImageBackground>

            {/* ===== Content ===== */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                style={{ flex: 1 }}
            >
                {/* Request Cards List */}
                <View className="px-6 mt-8">
                    {supplyRequests.map((request, index) => (
                        <SupplyRequestCard
                            key={request.id}
                            request={request}
                            onPress={() => handleRequestPress(request)}
                            isLast={index === supplyRequests.length - 1}
                        />
                    ))}
                </View>

                {/* Add New Request Button */}
                <View className="px-6 mt-6">
                    <TouchableOpacity
                        className="bg-[#FF6B4A] rounded-2xl py-4 items-center justify-center"
                        style={{
                            shadowColor: "#FF6B4A",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                            elevation: 8,
                        }}
                        activeOpacity={0.8}
                        onPress={() => {
                            // Navigate to create new request page
                            // router.push("/victim/CreateSupplyRequest");
                        }}
                    >
                        <Text className="text-white text-[16px] font-semibold">
                            + Add New Request
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ================= Components ================= */

function SupplyRequestCard({ request, onPress, isLast }:any) {
    const getStatusColor = (status:any) => {
        switch (status) {
            case "approved":
                return "#10B981"; // Green
            case "pending":
                return "#F59E0B"; // Yellow/Orange
            case "rejected":
                return "#EF4444"; // Red
            default:
                return "#FF6B4A"; // Default orange
        }
    };

    const getStatusText = (status:any) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{
                marginBottom: isLast ? 0 : 16,
            }}
        >
            <View
                className="bg-[#FF6B4A] rounded-2xl p-4 flex-row items-center"
                style={{
                    shadowColor: "#FF6B4A",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.25,
                    shadowRadius: 12,
                    elevation: 10,
                }}
            >
                {/* User Icon */}
                <View className="mr-4">
                    <View
                        className="w-12 h-12 rounded-full bg-white/20 items-center justify-center"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        {/* Simple User Icon using Text */}
                        <Text className="text-white text-[20px] font-bold">
                            👤
                        </Text>
                    </View>
                </View>

                {/* Request Info */}
                <View className="flex-1">
                    <Text className="text-white text-[16px] font-semibold mb-1">
                        {request.name}
                    </Text>

                    {/* Status Badge */}
                    <View className="flex-row items-center mb-2">
                        <View
                            className="px-3 py-1 rounded-full"
                            style={{
                                backgroundColor: getStatusColor(request.status),
                            }}
                        >
                            <Text className="text-white text-[12px] font-medium">
                                {getStatusText(request.status)}
                            </Text>
                        </View>
                    </View>

                    {/* Request Items */}
                    <Text className="text-white/80 text-[12px]">
                        Items: {request.items.join(", ")}
                    </Text>

                    {/* Request Date */}
                    <Text className="text-white/60 text-[11px] mt-1">
                        Requested: {request.requestDate}
                    </Text>
                </View>

                {/* Arrow Indicator */}
                <View className="ml-2">
                    <View
                        className="w-8 h-8 rounded-full items-center justify-center"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        <Text className="text-white text-[16px] font-bold">
                            →
                        </Text>
                    </View>
                </View>

                {/* Decorative Elements (same as dashboard cards) */}
                <View className="absolute top-3 right-3">
                    <View
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    />
                </View>
                <View className="absolute top-8 right-10">
                    <View
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}
