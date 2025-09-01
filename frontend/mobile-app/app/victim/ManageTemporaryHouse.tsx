import React, {useMemo, useState} from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {useRouter} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const A = {
    header: require("../../assets/images/header-wave.png"),
    back: require("../../assets/icons/Chevron_Left.png"),
    search: require("../../assets/icons/Search.png"),
    dropdown: require("../../assets/icons/ChevronDown.png"),
    delete: require("../../assets/icons/Delete.png"),
    // You can use the same card background or create a new one for temporary houses
    bgCard: require("../../assets/images/ManageEvacuationCenterCardBg.png"),
};

const {width: SCREEN_WIDTH} = Dimensions.get("window");

export default function ManageTemporaryHouse() {
    const router = useRouter();
    useSafeAreaInsets();
    const [searchText, setSearchText] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    // Sample temporary houses data
    const temporaryHouses = [
        {
            id: 1,
            type: "🏠 Temp Apartment",
            location: "📍 Oak Street Complex",
            availability: "📅 Available: 3 days",
            duration: "⏰ Duration: 3 months",
            cost: "💰 $800/month"
        },
        {
            id: 2,
            type: "🏠 Temp Apartment",
            location: "📍 Pine Avenue Complex",
            availability: "📅 Available: 5 days",
            duration: "⏰ Duration: 6 months",
            cost: "💰 $950/month"
        },
        {
            id: 3,
            type: "🏠 Temp House",
            location: "📍 Maple Street",
            availability: "📅 Available: 2 days",
            duration: "⏰ Duration: 4 months",
            cost: "💰 $1200/month"
        },
        {
            id: 4,
            type: "🏠 Temp Apartment",
            location: "📍 Cedar Park Complex",
            availability: "📅 Available: 7 days",
            duration: "⏰ Duration: 2 months",
            cost: "💰 $750/month"
        },
        {
            id: 5,
            type: "🏠 Temp House",
            location: "📍 Elm Street",
            availability: "📅 Available: 1 day",
            duration: "⏰ Duration: 5 months",
            cost: "💰 $1100/month"
        }
    ];

    // Filter houses based on search text
    const filteredHouses = temporaryHouses.filter(house =>
        house.type.toLowerCase().includes(searchText.toLowerCase()) ||
        house.location.toLowerCase().includes(searchText.toLowerCase())
    );

    // Keep header wave exact same aspect ratio
    const headerAR = useMemo(() => {
        const src = Image.resolveAssetSource(A.header);
        return src.width / src.height; // w/h
    }, []);

    const handleDeleteHouse = (houseId:any) => {
        console.log("Delete house:", houseId);
        // Handle delete logic here
    };

    const handleHouseSelect = (house:any) => {
        setSearchText(house.type);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F3F5F7]">
            {/* ===== Header ===== */}
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
                        Manage Temporary House
                    </Text>
                </View>
            </ImageBackground>

            {/* ===== Body with Fixed Layout ===== */}
            <View style={{flex: 1}}>
                {/* Fixed Search Section */}
                <View className="px-6 mt-6 mb-4">
                    <SearchInputWithDropdown
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder="Search House"
                        showDropdown={showDropdown}
                        onToggleDropdown={toggleDropdown}
                        houses={temporaryHouses}
                        onHouseSelect={handleHouseSelect}
                    />
                </View>

                {/* Scrollable Temporary Houses List */}
                <View style={{flex: 1}}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            paddingBottom: 20,
                        }}
                        style={{flex: 1}}
                    >
                        {filteredHouses.length === 0 ? (
                            <View className="bg-white p-6 rounded-2xl items-center">
                                <Text className="text-gray-500 text-[14px]">
                                    No temporary houses found
                                </Text>
                            </View>
                        ) : (
                            filteredHouses.map((house) => (
                                <TemporaryHouseCard
                                    key={house.id}
                                    house={house}
                                    onDelete={() => handleDeleteHouse(house.id)}
                                />
                            ))
                        )}
                    </ScrollView>
                </View>

                {/* Fixed Action Buttons at Bottom */}
                <View className="px-6 py-4 bg-[#F3F5F7] space-y-4 gap-4">
                    <TouchableOpacity
                        className="bg-[#3072BF] py-2 rounded-xl h-[40px]"
                        onPress={() => {
                           router.push('/victim/AddNewHouse')
                        }}
                    >
                        <Text className="text-white text-[14px] font-bold text-center">
                            Add New House
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="py-2 rounded-xl h-[40px] mb-2 bg-[#12AAD5]"
                        onPress={() => {
                            router.push('/victim/UpdateHouseDetails')
                        }}
                    >
                        <Text className="text-white text-[14px] font-bold text-center">
                            Update House Details
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

/* ================= Components ================= */

function SearchInputWithDropdown({
                                     value,
                                     onChangeText,
                                     placeholder,
                                     showDropdown,
                                     onToggleDropdown,
                                     houses,
                                     onHouseSelect
                                 }:any) {
    return (
        <View className="relative">
            {/* Search Input */}
            <View className="relative">
                <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
                    <Image
                        source={A.search}
                        style={{width: 24, height: 24, tintColor: "#4D4B4B"}}
                    />
                </View>
                <TouchableOpacity
                    className="absolute right-4 top-0 bottom-0 justify-center z-10"
                    onPress={onToggleDropdown}
                    hitSlop={10}
                >
                    <Image
                        source={A.dropdown}
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: "#4D4B4B",
                            transform: [{rotate: showDropdown ? '180deg' : '0deg'}]
                        }}
                    />
                </TouchableOpacity>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    className="bg-[#C8E3FC] pl-14 pr-14 py-4 rounded-2xl text-[14px]"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 3,
                    }}
                    placeholderTextColor="#4D4B4B"
                />
            </View>

            {/* Dropdown List */}
            {showDropdown && (
                <View
                    className="absolute top-full left-0 right-0 bg-white mt-2 rounded-2xl z-20 max-h-60"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {width: 0, height: 4},
                        shadowOpacity: 0.15,
                        shadowRadius: 12,
                        elevation: 8,
                    }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    >
                        {houses.map((house:any, index:any) => (
                            <TouchableOpacity
                                key={house.id}
                                onPress={() => onHouseSelect(house)}
                                className={`px-4 py-3 ${
                                    index < houses.length - 1 ? 'border-b border-gray-100' : ''
                                }`}
                            >
                                <Text className="text-[14px] font-medium text-gray-800">
                                    {house.type}
                                </Text>
                                <Text className="text-[12px] text-gray-500 mt-1">
                                    {house.location} • {house.cost}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

function TemporaryHouseCard({house, onDelete}:any) {
    return (
        <View className="mb-4">
            {/* Blue gradient card matching the Figma design */}
            <View
                className="rounded-2xl overflow-hidden h-[140px]"
                style={{
                    backgroundColor: '#6366F1',
                    shadowColor: '#6366F1',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.25,
                    shadowRadius: 16,
                    elevation: 10,
                }}
            >
                <View className="p-4 flex-row justify-between items-start h-full">
                    <View className="flex-1">
                        <Text className="text-white text-[14px] font-semibold mb-2">
                            {house.type}
                        </Text>
                        <Text className="text-white text-[12px] mb-1 opacity-90">
                            {house.location}
                        </Text>
                        <Text className="text-white text-[12px] mb-1 opacity-90">
                            {house.availability}
                        </Text>
                        <Text className="text-white text-[12px] mb-1 opacity-90">
                            {house.duration}
                        </Text>
                        <Text className="text-white text-[12px] font-medium">
                            {house.cost}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={onDelete}
                        className="ml-4 p-2"
                        hitSlop={10}
                    >
                        <Image
                            source={A.delete}
                            style={{width: 24, height: 24, tintColor: "#FFFFFF"}}
                        />
                    </TouchableOpacity>
                </View>

                {/* Decorative elements */}
                <View className="absolute top-2 right-2">
                    <View
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    />
                </View>
                <View className="absolute top-6 right-8">
                    <View
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    />
                </View>
            </View>
        </View>
    );
}
