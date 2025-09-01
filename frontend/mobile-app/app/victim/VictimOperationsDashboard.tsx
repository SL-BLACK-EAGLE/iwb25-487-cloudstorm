import React, {useMemo} from "react";
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
import {Href, useRouter} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const A = {
    // Same header asset from existing components
    header: require("../../assets/images/header-wave.png"),
    back: require("../../assets/icons/Chevron_Left.png"),

    // Dashboard card icons/images (replace with your actual paths)
    evacuationCenter: require("../../assets/icons/EvacuationCenter.png"), // or your evacuation center icon
    temporaryHouse: require("../../assets/icons/TemporaryHouse.png"), // house icon as shown in figma
    emergencySupply: require("../../assets/icons/EmergencySupply.png"), // emergency bell icon as shown
    hospital: require("../../assets/icons/Hospital.png"), // hospital icon
};

const {width: SCREEN_WIDTH} = Dimensions.get("window");

export default function VictimOperationsDashboard() {
    const router = useRouter();


    // Dashboard cards data
    const dashboardCards = [
        {
            id: 1,
            title: "Manage Evacuation\nCenter",
            backgroundColor: "#6366F1", // Blue/Purple gradient start
            gradientColors: ["#6366F1", "#8B5CF6"],
            icon: A.evacuationCenter,
            route: "/victim/ManageEvacuationCenter",
        },
        {
            id: 2,
            title: "Manage Temporary\nHouse",
            backgroundColor: "#F97316", // Orange/Red gradient start
            gradientColors: ["#F97316", "#EF4444"],
            icon: A.temporaryHouse,
            route: "/victim/ManageTemporaryHouse",
        },
        {
            id: 3,
            title: "Emergency Supply\nRequest",
            backgroundColor: "#10B981", // Green gradient start
            gradientColors: ["#10B981", "#059669"],
            icon: A.emergencySupply,
            route: "/victim/EmergencySupplyRequest",
        },
        {
            id: 4,
            title: "Manage Hospital",
            backgroundColor: "#F59E0B", // Yellow/Orange gradient start
            gradientColors: ["#F59E0B", "#D97706"],
            icon: A.hospital,
            route: "/victim/ManageEvacuationCenter",
        },
    ];

    // Keep header wave exact same aspect ratio
    const headerAR = useMemo(() => {
        const src = Image.resolveAssetSource(A.header);
        return src.width / src.height; // w/h
    }, []);

    const handleCardPress = (route:any) => {
        router.push(route);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F3F5F7]">
            {/* ===== Header (Same pattern as other components) ===== */}
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
                            style={{width: 22, height: 22, tintColor: "#FFFFFF"}}
                        />
                    </Pressable>

                    <Text className="text-white text-[16px] font-semibold">
                        Victim Operations Dashboard
                    </Text>
                </View>
            </ImageBackground>

            {/* ===== Dashboard Content ===== */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 40}}
                style={{flex: 1}}
            >
                {/* Dashboard Cards Grid */}
                <View className="px-6 mt-8">
                    <View className="flex-row flex-wrap justify-between">
                        {dashboardCards.map((card, index) => (
                            <DashboardCard
                                key={card.id}
                                card={card}
                                onPress={() => handleCardPress(card.route)}
                                isLastRow={index >= 2} // Add margin for spacing
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ================= Components ================= */

function DashboardCard({card, onPress, isLastRow}:any) {
    const cardWidth = (SCREEN_WIDTH - 48 - 16) / 2; // Screen width - padding - gap between cards
    const cardHeight = cardWidth * 1.1; // Slightly taller than wide

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: cardWidth,
                height: cardHeight,
                marginBottom: isLastRow ? 0 : 24,
            }}
            activeOpacity={0.8}
        >
            <View
                className="flex-1 rounded-3xl p-4 justify-between items-center"
                style={{
                    backgroundColor: card.backgroundColor,
                    shadowColor: card.backgroundColor,
                    shadowOffset: {width: 0, height: 8},
                    shadowOpacity: 0.3,
                    shadowRadius: 16,
                    elevation: 12,
                }}
            >
                {/* Card Title */}
                <Text className="text-white text-[14px] font-semibold text-center leading-5">
                    {card.title}
                </Text>

                {/* Icon/Image Container */}
                <View className="flex-1 items-center justify-center mt-2">
                        <Image
                            source={card.icon}
                            style={{
                                width: 80,
                                height: 100,
                            }}
                            resizeMode="contain"
                        />
                </View>

                {/* Decorative Elements */}
                <View className="absolute top-2 right-2">
                    <View
                        className="w-6 h-6 rounded-full"
                        style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}
                    />
                </View>
                <View className="absolute top-6 right-8">
                    <View
                        className="w-3 h-3 rounded-full"
                        style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}


