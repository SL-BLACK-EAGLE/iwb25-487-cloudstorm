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
    bgCard: require("../../assets/images/ManageEvacuationCenterCardBg.png"),
};

const {width: SCREEN_WIDTH} = Dimensions.get("window");

export default function ManageEvacuationCenter() {
    const router = useRouter();
    useSafeAreaInsets();
    const [searchText, setSearchText] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    // Sample evacuation centers data
    const evacuationCenters = [
        {
            id: 1,
            name: "Lincoln High School",
            distance: "0.8 mi",
            status: "OPEN",
            capacity: "147/200",
            parking: "Parking Available",
            pets: "Pets: Welcome"
        },
        {
            id: 2,
            name: "Community Center",
            distance: "1.2 mi",
            status: "OPEN",
            capacity: "89/150",
            parking: "Parking Available",
            pets: "Pets: Welcome"
        },
        {
            id: 3,
            name: "Sports Complex",
            distance: "2.1 mi",
            status: "FULL",
            capacity: "300/300",
            parking: "No Parking",
            pets: "Pets: Not Allowed"
        },
        {
            id: 4,
            name: "City Hall",
            distance: "1.8 mi",
            status: "OPEN",
            capacity: "75/100",
            parking: "Limited Parking",
            pets: "Pets: Welcome"
        },
        {
            id: 5,
            name: "Recreation Center",
            distance: "3.2 mi",
            status: "OPEN",
            capacity: "200/250",
            parking: "Parking Available",
            pets: "Pets: Not Allowed"
        }
    ];

    // Filter centers based on search text
    const filteredCenters = evacuationCenters.filter(center =>
        center.name.toLowerCase().includes(searchText.toLowerCase()) ||
        center.status.toLowerCase().includes(searchText.toLowerCase())
    );

    // Keep header wave exact same aspect ratio
    const headerAR = useMemo(() => {
        const src = Image.resolveAssetSource(A.header);
        return src.width / src.height; // w/h
    }, []);

    const handleDeleteCenter = (centerId: any) => {
        console.log("Delete center:", centerId);
        // Handle delete logic here
    };

    const handleCenterSelect = (center: any) => {
        setSearchText(center.name);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F3F5F7]">
            {/* ===== Header (Same as existing components) ===== */}
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
                        Manage Evacuation Center
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
                        placeholder="Search Center"
                        showDropdown={showDropdown}
                        onToggleDropdown={toggleDropdown}
                        centers={evacuationCenters}
                        onCenterSelect={handleCenterSelect}
                    />
                </View>

                {/* Scrollable Evacuation Centers List */}
                <View style={{flex: 1}}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            paddingBottom: 20,
                        }}
                        style={{flex: 1}}
                    >
                        {filteredCenters.length === 0 ? (
                            <View className="bg-white p-6 rounded-2xl items-center">
                                <Text className="text-gray-500 text-[14px]">
                                    No evacuation centers found
                                </Text>
                            </View>
                        ) : (
                            filteredCenters.map((center) => (
                                <EvacuationCenterCard
                                    key={center.id}
                                    center={center}
                                    onDelete={() => handleDeleteCenter(center.id)}
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
                            // Navigate to Add New Evacuation Center
                            router.push('/victim/AddNewEvacuationCenter')
                        }}
                    >
                        <Text className="text-white text-[14px] font-bold text-center">
                            Add New Evacuation Center
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="py-2 rounded-xl h-[40px] mb-2 bg-[#12AAD5]"
                        onPress={() => {
                            router.push('/victim/UpdateEvacuationCenter')
                        }}
                    >
                        <Text className="text-white text-[14px] font-bold text-center">
                            Update Evacuation Center
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
                                     centers,
                                     onCenterSelect
                                 }: any) {
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
                        {centers.map((center: any, index: any) => (
                            <TouchableOpacity
                                key={center.id}
                                onPress={() => onCenterSelect(center)}
                                className={`px-4 py-3 ${
                                    index < centers.length - 1 ? 'border-b border-gray-100' : ''
                                }`}
                            >
                                <Text className="text-[14px] font-medium text-gray-800">
                                    {center.name}
                                </Text>
                                <Text className="text-[12px] text-gray-500 mt-1">
                                    {center.distance} • {center.status} • {center.capacity}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

function EvacuationCenterCard({center, onDelete}: any) {
    return (
        <ImageBackground
            source={A.bgCard}
            resizeMode="cover"
            className="mb-4 rounded-2xl overflow-hidden h-[128px]"
        >
            <View className="p-4 flex-row justify-between items-start rounded-2xl">
                <View className="flex-1">
                    <Text className="text-[14px] ml-2 font-manuale-semibold text-black mb-1">
                        {center.name}
                    </Text>
                    <Text className="text-[12px] ml-2 text-black mb-1">
                        {center.distance} • {center.status}
                    </Text>
                    <Text className="text-[12px] ml-2 text-black mb-1">
                        Capacity: {center.capacity}
                    </Text>
                    <Text className="text-[12px] ml-2 text-black mb-1">
                        {center.parking}
                    </Text>
                    <Text className="text-[12px] ml-2 text-black mb-2">
                        {center.pets}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={onDelete}
                    className="ml-4 p-2"
                    hitSlop={10}
                >
                    <Image
                        source={A.delete}
                        style={{width: 24, height: 24, tintColor: "#000"}}
                    />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}
