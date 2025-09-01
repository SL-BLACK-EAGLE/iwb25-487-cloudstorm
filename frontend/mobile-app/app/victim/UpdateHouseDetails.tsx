import React, { useMemo, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    ImageBackground,
    Pressable,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const A = {
    // Same assets from other pages
    header: require("../../assets/images/header-wave.png"),
    back: require("../../assets/icons/Chevron_Left.png"),
    search: require("../../assets/icons/Search.png"),
    dropdown: require("../../assets/icons/ChevronDown.png"),
    location: require("../../assets/icons/Location.png"),
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function UpdateHouseDetails() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Form states
    const [searchText, setSearchText] = useState("");
    const [selectedHouse, setSelectedHouse] = useState("Select House");
    const [showDropdown, setShowDropdown] = useState(false);
    const [place, setPlace] = useState("");
    const [location, setLocation] = useState("");
    const [parking, setParking] = useState("");
    const [facilities, setFacilities] = useState("");
    const [contact, setContact] = useState("");
    const [duration, setDuration] = useState("");
    const [monthlyFee, setMonthlyFee] = useState("");

    // Sample temporary houses
    const temporaryHouses = [
        {
            name: "Temp Apartment",
            address: "Oak Street Complex",
            available: "3 days",
            duration: "3 months",
            fee: "$800/month",
            parking: "Available",
            type: "apartment"
        },
        {
            name: "Family House",
            address: "Pine Avenue",
            available: "5 days",
            duration: "6 months",
            fee: "$1200/month",
            parking: "Available",
            type: "house"
        },
        {
            name: "Studio Unit",
            address: "Maple Drive",
            available: "1 week",
            duration: "2 months",
            fee: "$600/month",
            parking: "Unavailable",
            type: "studio"
        }
    ];

    // Keep header wave exact same aspect ratio
    const headerAR = useMemo(() => {
        const src = Image.resolveAssetSource(A.header);
        return src.width / src.height; // w/h
    }, []);

    const handleHouseSelect = (house:any) => {
        setSelectedHouse(house.name);
        setShowDropdown(false);
        // Auto-populate some fields
        setPlace(house.name);
        setDuration(house.duration);
        setMonthlyFee(house.fee);
        setParking(house.parking);
    };

    const handleUpdateHouse = () => {
        // Validation
        if (!place || !location || !contact || !duration || !monthlyFee) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }

        // Handle update house logic here
        console.log("Update House Details");
        Alert.alert("Success", "House details updated successfully!", [
            { text: "OK", onPress: () => router.back() }
        ]);
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
                            style={{ width: 22, height: 22, tintColor: "#FFFFFF" }}
                        />
                    </Pressable>

                    <Text className="text-white text-[16px] font-semibold">
                        Update House Details
                    </Text>
                </View>
            </ImageBackground>

            {/* ===== Body ===== */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}
                style={{ flex: 1 }}
            >
                {/* Search Section */}
                <View className="px-6 mt-6">
                    <SearchInputWithDropdown
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder="Search House"
                        showDropdown={showDropdown}
                        onToggleDropdown={() => setShowDropdown(!showDropdown)}
                        houses={temporaryHouses}
                        onHouseSelect={handleHouseSelect}
                    />
                </View>

                {/* Selected House Info Card */}
                {selectedHouse !== "Select House" && (
                    <View className="px-6 mt-6">
                        <HouseInfoCard
                            house={temporaryHouses.find(h => h.name === selectedHouse)}
                        />
                    </View>
                )}

                {/* Form Fields */}
                <View className="px-6 mt-6">
                    {/* Place */}
                    <FormInput
                        label="Place :"
                        value={place}
                        onChangeText={setPlace}
                        placeholder="Enter place name"
                    />

                    {/* Location */}
                    <FormInput
                        label="Location :"
                        value={location}
                        onChangeText={setLocation}
                        placeholder="Enter location"
                        hasLocationIcon
                    />

                    {/* Parking Radio Group */}
                    <RadioGroup
                        label="Parking :"
                        value={parking}
                        onValueChange={setParking}
                        options={["Available", "Unavailable"]}
                    />

                    {/* Facilities */}
                    <FormTextArea
                        label="Facilities :"
                        value={facilities}
                        onChangeText={setFacilities}
                        placeholder="Enter facilities details"
                    />

                    {/* Contact */}
                    <FormInput
                        label="Contact :"
                        value={contact}
                        onChangeText={setContact}
                        placeholder="Enter contact information"
                        keyboardType="phone-pad"
                    />

                    {/* Duration */}
                    <FormInput
                        label="Duration :"
                        value={duration}
                        onChangeText={setDuration}
                        placeholder="Enter duration"
                    />

                    {/* Monthly Fee */}
                    <FormInput
                        label="Monthly Fee :"
                        value={monthlyFee}
                        onChangeText={setMonthlyFee}
                        placeholder="Enter monthly fee"
                        keyboardType="numeric"
                    />

                    {/* Photos Section */}
                    <PhotoUploadSection />
                </View>

                {/* Update Button */}
                <View className="px-6 mt-6 mb-6">
                    <TouchableOpacity
                        onPress={handleUpdateHouse}
                        className="bg-[#3072BF] py-4 rounded-2xl"
                        style={{
                            shadowColor: "#3072BF",
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.3,
                            shadowRadius: 16,
                            elevation: 8,
                        }}
                    >
                        <Text className="text-white text-[16px] font-semibold text-center">
                            Update House Details
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
                        style={{ width: 24, height: 24, tintColor: "#4D4B4B" }}
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
                            transform: [{ rotate: showDropdown ? '180deg' : '0deg' }]
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
                        shadowOffset: { width: 0, height: 2 },
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
                        shadowOffset: { width: 0, height: 4 },
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
                                key={index}
                                onPress={() => onHouseSelect(house)}
                                className={`px-4 py-3 ${
                                    index < houses.length - 1 ? 'border-b border-gray-100' : ''
                                }`}
                            >
                                <Text className="text-[14px] font-medium text-gray-800">
                                    {house.name}
                                </Text>
                                <Text className="text-[12px] text-gray-500 mt-1">
                                    {house.address} • {house.fee}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

function HouseInfoCard({ house }:any) {
    if (!house) return null;

    return (
        <View
            className="p-4 rounded-2xl"
            style={{
                backgroundColor: '#F97316', // Orange background matching Figma
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 6,
            }}
        >
            <Text className="text-white text-[16px] font-bold mb-1">{house.name}</Text>
            <Text className="text-white text-[14px] mb-1">{house.address}</Text>
            <Text className="text-white text-[12px] mb-1">Available: {house.available}</Text>
            <Text className="text-white text-[12px] mb-1">Duration: {house.duration}</Text>
            <Text className="text-white text-[12px]">{house.fee}</Text>
        </View>
    );
}

function FormInput({ label, value, onChangeText, placeholder, hasLocationIcon, keyboardType = "default" }:any) {
    return (
        <View className="mb-6">
            <Text className="text-[14px] font-medium text-gray-800 mb-3">
                {label}
            </Text>
            <View className="relative">
                {hasLocationIcon && (
                    <View className="absolute right-4 top-0 bottom-0 justify-center z-10">
                        <Image
                            source={A.location}
                            style={{ width: 20, height: 20, tintColor: "#000000" }}
                        />
                    </View>
                )}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    //@ts-ignore
                    keyboardType={keyboardType}
                    className="bg-white px-4 py-4 rounded-xl text-[14px]"
                    style={{
                        borderWidth: 2,
                        borderColor: '#3B82F6',
                        paddingRight: hasLocationIcon ? 44 : 16,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 3,
                    }}
                    placeholderTextColor="#9CA3AF"
                />
            </View>
        </View>
    );
}

function FormTextArea({ label, value, onChangeText, placeholder }:any) {
    return (
        <View className="mb-6">
            <Text className="text-[14px] font-medium text-gray-800 mb-3">
                {label}
            </Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                className="bg-white px-4 py-4 rounded-xl text-[14px]"
                style={{
                    borderWidth: 2,
                    borderColor: '#3B82F6',
                    minHeight: 100,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                }}
                placeholderTextColor="#9CA3AF"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />
        </View>
    );
}

function RadioGroup({ label, value, onValueChange, options }:any) {
    return (
        <View className="mb-6">
            <Text className="text-[14px] font-medium text-gray-800 mb-4">
                {label}
            </Text>
            <View className="flex-row space-x-8 gap-16">
                {options.map((option:any) => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => onValueChange(option)}
                        className="flex-row items-center"
                    >
                        <View className="w-6 h-6 border-2 border-blue-500 rounded-full mr-3 items-center justify-center">
                            {value === option && (
                                <View className="w-3 h-3 bg-blue-500 rounded-full" />
                            )}
                        </View>
                        <Text className="text-[14px] text-gray-700">{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

function PhotoUploadSection() {
    const handlePhotoUpload = () => {
        Alert.alert(
            "Add Photo",
            "Choose photo source",
            [
                { text: "Camera", onPress: () => console.log("Open camera") },
                { text: "Gallery", onPress: () => console.log("Open gallery") },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    return (
        <View className="mt-2 mb-8">
            <Text className="text-[14px] font-medium text-gray-800 mb-4">
                Photos :
            </Text>
            <View className="flex-row justify-between">
                {[1, 2, 3].map((index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={handlePhotoUpload}
                        className="bg-white rounded-xl items-center justify-center border-dashed"
                        style={{
                            width: (SCREEN_WIDTH - 48 - 24) / 3, // (screen width - padding - gaps) / 3 images
                            height: (SCREEN_WIDTH - 48 - 24) / 3,
                            borderWidth: 2,
                            borderColor: '#3B82F6',
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 3,
                        }}
                    >
                        <View className="w-8 h-8 items-center justify-center  ">
                            <Text className="text-[#3B82F6] text-[24px] font-light">+</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
