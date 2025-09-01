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
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const A = {
    // Same assets from disaster prediction page
    header: require("../../assets/images/header-wave.png"),
    back: require("../../assets/icons/Chevron_Left.png"),
    search: require("../../assets/icons/Search.png"),
    dropdown: require("../../assets/icons/ChevronDown.png"),
    location: require("../../assets/icons/Location.png"),
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function UpdateEvacuationCenter() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Form states
    const [searchText, setSearchText] = useState("");
    const [selectedCenter, setSelectedCenter] = useState("Select Center");
    const [showDropdown, setShowDropdown] = useState(false);
    const [place, setPlace] = useState("");
    const [location, setLocation] = useState("");
    const [parking, setParking] = useState("");
    const [meals, setMeals] = useState("");
    const [pets, setPets] = useState("");
    const [facilities, setFacilities] = useState("");
    const [contact, setContact] = useState("");
    const [capacity, setCapacity] = useState("");
    const [dinner, setDinner] = useState("");
    const [breakfast, setBreakfast] = useState("");
    const [lunch, setLunch] = useState("");

    // Sample evacuation centers
    const evacuationCenters = [
        {
            name: "Lincoln High School",
            distance: "0.8 mi",
            status: "OPEN",
            capacity: "147/200",
            parking: "Parking Available",
            pets: "Pets: Welcome"
        },
        {
            name: "Community Center",
            distance: "1.2 mi",
            status: "OPEN",
            capacity: "89/150",
            parking: "Parking Available",
            pets: "Pets: Welcome"
        },
        {
            name: "Sports Complex",
            distance: "2.1 mi",
            status: "FULL",
            capacity: "300/300",
            parking: "No Parking",
            pets: "Pets: Not Allowed"
        }
    ];

    // Keep header wave exact same aspect ratio
    const headerAR = useMemo(() => {
        const src = Image.resolveAssetSource(A.header);
        return src.width / src.height; // w/h
    }, []);

    const handleCenterSelect = (center:any) => {
        setSelectedCenter(center.name);
        setShowDropdown(false);
        // Auto-populate some fields
        setCapacity(center.capacity);
        setParking(center.parking.includes("Available") ? "Available" : "Unavailable");
        setPets(center.pets.includes("Welcome") ? "Available" : "Unavailable");
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F3F5F7]">
            {/* ===== Header (Same as disaster prediction) ===== */}
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
                        Update Evacuation Center
                    </Text>
                </View>
            </ImageBackground>

            {/* ===== Body ===== */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                style={{ flex: 1 }}
            >
                {/* Search Section */}
                <View className="px-6 mt-6">
                    <SearchInput
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder="Search Center"
                    />

                    <Text className="text-center text-[16px] text-black my-4">or</Text>

                    <DropdownSelect
                        value={selectedCenter}
                        onPress={() => setShowDropdown(!showDropdown)}
                        placeholder="Select Center"
                        showDropdown={showDropdown}
                        options={evacuationCenters}
                        onSelect={handleCenterSelect}
                    />
                </View>

                {/* Selected Center Info Card */}
                {selectedCenter !== "Select Center" && (
                    <View className="px-6 mt-4">
                        <CenterInfoCard
                            center={evacuationCenters.find(c => c.name === selectedCenter)}
                        />
                    </View>
                )}

                {/* Form Fields */}
                <View className="px-6 mt-6 space-y-4">
                    {/* Place */}
                    <FormInput
                        label="Place:"
                        value={place}
                        onChangeText={setPlace}
                        placeholder="Enter place"
                    />

                    {/* Location */}
                    <FormInput
                        label="Location:"
                        value={location}
                        onChangeText={setLocation}
                        placeholder="Enter location"
                        hasLocationIcon
                    />

                    {/* Radio Button Groups */}
                    <RadioGroup
                        label="Parking:"
                        value={parking}
                        onValueChange={setParking}
                        options={["Available", "Unavailable"]}
                    />

                    <RadioGroup
                        label="Meals:"
                        value={meals}
                        onValueChange={setMeals}
                        options={["Available", "Unavailable"]}
                    />

                    <RadioGroup
                        label="Pets:"
                        value={pets}
                        onValueChange={setPets}
                        options={["Available", "Unavailable"]}
                    />

                    {/* Facilities */}
                    <FormTextArea
                        label="Facilities:"
                        value={facilities}
                        onChangeText={setFacilities}
                        placeholder="Enter facilities details"
                    />

                    {/* Contact */}
                    <FormInput
                        label="Contact:"
                        value={contact}
                        onChangeText={setContact}
                        placeholder="Enter contact information"
                    />

                    {/* Capacity */}
                    <FormInput
                        label="Capacity:"
                        value={capacity}
                        onChangeText={setCapacity}
                        placeholder="Enter capacity"
                    />

                    {/* Meal Schedule */}
                    <View className="mt-4">
                        <Text className="text-[15px] font-semibold text-gray-800 mb-3">
                            Meal Schedule
                        </Text>

                        <View className="ml-4 gap-3 space-y-3">
                            <FormInput
                                label="Dinner:"
                                value={dinner}
                                onChangeText={setDinner}
                                placeholder="Enter dinner time"
                                compact
                            />

                            <FormInput
                                label="Breakfast:"
                                value={breakfast}
                                onChangeText={setBreakfast}
                                placeholder="Enter breakfast time"
                                compact
                            />

                            <FormInput
                                label="Lunch:"
                                value={lunch}
                                onChangeText={setLunch}
                                placeholder="Enter lunch time"
                                compact
                            />
                        </View>
                    </View>

                    {/* Photos Section */}
                    <PhotoUploadSection />
                </View>

                {/* Update Button */}
                <View className="px-6 mt-8">
                    <TouchableOpacity
                        className="bg-blue-600 py-4 rounded-2xl"
                        style={{
                            shadowColor: "#3B82F6",
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.3,
                            shadowRadius: 16,
                            elevation: 8,
                        }}
                        onPress={() => {
                            // Handle update logic here
                            console.log("Update Center");
                        }}
                    >
                        <Text className="text-white text-[16px] font-semibold text-center">
                            Update Center
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ================= Components ================= */

function SearchInput({ value, onChangeText, placeholder }:any) {
    return (
        <View className="relative">
            <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
                <Image
                    source={A.search}
                    style={{ width: 30, height: 30, tintColor: "#000" }}
                />
            </View>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                className="bg-[#C8E3FC] pl-16 pr-4 py-4 rounded-2xl text-[14px]"
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
    );
}

function DropdownSelect({ value, onPress, placeholder, showDropdown, options, onSelect }:any) {
    return (
        <View className="relative">
            <TouchableOpacity
                onPress={onPress}
                className="bg-white px-4 py-4 rounded-2xl flex-row items-center justify-between"
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                }}
            >
                <Text className={`text-[14px] ${value === placeholder ? 'text-gray-400' : 'text-gray-800'}`}>
                    {value}
                </Text>
                <Image
                    source={A.dropdown}
                    style={{
                        width: 26,
                        height: 26,
                        tintColor: "#000",
                        transform: [{ rotate: showDropdown ? '180deg' : '0deg' }]
                    }}
                />
            </TouchableOpacity>

            {/* Dropdown Options */}
            {showDropdown && (
                <View className="absolute top-full left-0 right-0 bg-white mt-2 rounded-2xl z-20"
                      style={{
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.15,
                          shadowRadius: 12,
                          elevation: 8,
                      }}
                >
                    {options.map((option:any, index:any) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onSelect(option)}
                            className="px-4 py-3 border-b border-gray-100"
                        >
                            <Text className="text-[14px] text-gray-800">{option.name}</Text>
                            <Text className="text-[12px] text-gray-500">{option.distance} • {option.status}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

function CenterInfoCard({ center }:any) {
    if (!center) return null;

    return (
        <View className="bg-white p-4 rounded-2xl"
              style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                  elevation: 6,
              }}
        >
            <Text className="text-[16px] font-bold text-gray-800 mb-2">{center.name}</Text>
            <Text className="text-[12px] text-gray-600 mb-1">{center.distance} • {center.status}</Text>
            <Text className="text-[12px] text-gray-600 mb-1">Capacity: {center.capacity}</Text>
            <Text className="text-[12px] text-gray-600 mb-1">{center.parking}</Text>
            <Text className="text-[12px] text-gray-600">{center.pets}</Text>
        </View>
    );
}

function FormInput({ label, value, onChangeText, placeholder, hasLocationIcon, compact }:any) {
    return (
        <View className={compact ? "flex-row items-center" : "mb-4"}>
            <Text className={`text-[14px] font-medium text-gray-700 ${compact ? 'w-20' : 'mb-2'}`}>
                {label}
            </Text>
            <View className={`relative ${compact ? 'flex-1 ml-2' : ''}`}>
                {hasLocationIcon && (
                    <View className="absolute right-4 top-0 bottom-0 justify-center z-10">
                        <Image
                            source={A.location}
                            style={{ width: 20, height: 20, tintColor: "#000" }}
                        />
                    </View>
                )}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    className="bg-white px-4 py-3 rounded-xl text-[14px] border-2 border-[#3B82F6]"
                    placeholderTextColor="#9CA3AF"
                    style={hasLocationIcon ? { paddingRight: 44 } : {}}
                />
            </View>
        </View>
    );
}

function FormTextArea({ label, value, onChangeText, placeholder }:any) {
    return (
        <View className="mb-4">
            <Text className="text-[14px] font-medium text-gray-700 mb-2">
                {label}
            </Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                className="bg-white px-4 py-3 rounded-xl text-[14px] border-2 border-[#3B82F6]"
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
        <View className="mb-4">
            <Text className="text-[14px] font-medium text-gray-700 mb-3">
                {label}
            </Text>
            <View className="flex-row space-x-6 gap-24">
                {options.map((option:any) => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => onValueChange(option)}
                        className="flex-row items-center"
                    >
                        <View className="w-5 h-5 border-2 border-[#3B82F6] rounded-full mr-2 items-center justify-center">
                            {value === option && (
                                <View className="w-2.5 h-2.5 bg-[#3B82F6] rounded-full" />
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
    return (
        <View className="mb-6 ">
            <Text className="text-[14px] font-medium text-gray-700 mb-3">
                Photos:
            </Text>
            <View className="flex-row space-x-3 gap-3">
                {[1, 2, 3].map((index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            width: (SCREEN_WIDTH - 48 - 24) / 3, // (screen width - padding - gaps) / 3 images
                            height: (SCREEN_WIDTH - 48 - 24) / 3,
                        }}
                        className="bg-white border-2 border-dashed border-[#3B82F6] rounded-xl items-center justify-center"
                    >
                        <Text className="text-[#3B82F6] text-[24px]">+</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
