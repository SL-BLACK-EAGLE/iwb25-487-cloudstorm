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
    // Same assets from previous pages
    header: require("../../assets/images/header-wave.png"),
    back: require("../../assets/icons/Chevron_Left.png"),
    location: require("../../assets/icons/Location.png"),
    add: require("../../assets/icons/Add.png"),
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function AddNewEvacuationCenter() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Form states
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

    // Keep header wave exact same aspect ratio
    const headerAR = useMemo(() => {
        const src = Image.resolveAssetSource(A.header);
        return src.width / src.height; // w/h
    }, []);

    const handleAddNewCenter = () => {
        // Validation
        if (!place || !location || !contact || !capacity) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }

        // Handle add new center logic here
        console.log("Add New Center");
        Alert.alert("Success", "New evacuation center added successfully!", [
            { text: "OK", onPress: () => router.back() }
        ]);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F3F5F7]">
            {/* ===== Header (Same as other pages) ===== */}
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
                        Add New Evacuation Center
                    </Text>
                </View>
            </ImageBackground>

            {/* ===== Body ===== */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}
                style={{ flex: 1 }}
            >
                {/* Form Fields */}
                <View className="px-6 mt-8">
                    {/* Place */}
                    <FormInput
                        label="Place:"
                        value={place}
                        onChangeText={setPlace}
                        placeholder="Enter place name"
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
                        keyboardType="phone-pad"
                    />

                    {/* Capacity */}
                    <FormInput
                        label="Capacity:"
                        value={capacity}
                        onChangeText={setCapacity}
                        placeholder="Enter capacity"
                        keyboardType="numeric"
                    />

                    {/* Meal Schedule */}
                    <View className="mt-6">
                        <Text className="text-[15px] font-semibold text-gray-800 mb-4">
                            Meal Schedule
                        </Text>

                        <View className="ml-4">
                            <CompactFormInput
                                label="Dinner:"
                                value={dinner}
                                onChangeText={setDinner}
                                placeholder="Enter dinner time"
                            />

                            <CompactFormInput
                                label="Breakfast:"
                                value={breakfast}
                                onChangeText={setBreakfast}
                                placeholder="Enter breakfast time"
                            />

                            <CompactFormInput
                                label="Lunch:"
                                value={lunch}
                                onChangeText={setLunch}
                                placeholder="Enter lunch time"
                            />
                        </View>
                    </View>

                    {/* Photos Section */}
                    <PhotoUploadSection />
                </View>

                {/* Add New Center Button */}
                <View className="px-6 mt-10 mb-6">
                    <TouchableOpacity
                        onPress={handleAddNewCenter}
                        className="bg-[#3072BF] py-2 rounded-xl h-[40px]"
                        style={{
                            shadowColor: "#3B82F6",
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.3,
                            shadowRadius: 16,
                            elevation: 8,
                        }}
                    >
                        <Text className="text-white text-[14px] font-bold text-center">
                            Add New Center
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ================= Components ================= */

function FormInput({ label, value, onChangeText, placeholder, hasLocationIcon, keyboardType = "default" }:any) {
    return (
        <View className="mb-5">
            <Text className="text-[14px] font-medium text-gray-700 mb-3">
                {label}
            </Text>
            <View className="relative">
                {hasLocationIcon && (
                    <View className="absolute right-4 top-0 bottom-0 justify-center z-10">
                        <Image
                            source={A.location}
                            style={{ width: 18, height: 18, tintColor: "#000000" }}
                        />
                    </View>
                )}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    className="bg-white px-4 py-4 rounded-xl text-[14px] border-2 border-[#3C8FEF]"
                    placeholderTextColor="#9CA3AF"
                    style={hasLocationIcon ? { paddingRight: 44 } : {}}
                />
            </View>
        </View>
    );
}

function FormTextArea({ label, value, onChangeText, placeholder }:any) {
    return (
        <View className="mb-5">
            <Text className="text-[14px] font-medium text-gray-700 mb-3">
                {label}
            </Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                className="bg-white px-4 py-4 rounded-xl text-[14px] border-2 border-[#3C8FEF]"
                placeholderTextColor="#9CA3AF"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                style={{ minHeight: 100 }}
            />
        </View>
    );
}

function CompactFormInput({ label, value, onChangeText, placeholder }:any) {
    return (
        <View className="flex-row items-center mb-4">
            <Text className="text-[14px] font-medium text-gray-700 w-24">
                {label}
            </Text>
            <View className="flex-1 ml-3">
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    className="bg-white px-4 py-4 rounded-xl text-[14px] border-2 border-[#3C8FEF]"
                    placeholderTextColor="#9CA3AF"
                />
            </View>
        </View>
    );
}

function RadioGroup({ label, value, onValueChange, options }:any) {
    return (
        <View className="mb-5">
            <Text className="text-[14px] font-medium text-gray-700 mb-4">
                {label}
            </Text>
            <View className="flex-row space-x-8 gap-24">
                {options.map((option:any) => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => onValueChange(option)}
                        className="flex-row items-center"
                    >
                        <View className="w-5 h-5 border-2 border-[#3C8FEF] rounded-full mr-3 items-center justify-center">
                            {value === option && (
                                <View className="w-2.5 h-2.5 bg-[#3C8FEF] rounded-full" />
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
        <View className="mt-6 mb-8">
            <Text className="text-[14px] font-medium text-gray-700 mb-4">
                Photos:
            </Text>
            <View className="flex-row justify-between">
                {[1, 2, 3].map((index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={handlePhotoUpload}
                        className="w-24 h-24 bg-white border-2  border-[#3C8FEF] rounded-xl items-center justify-center"
                        style={{
                            width: (SCREEN_WIDTH - 48 - 24) / 3, // (screen width - padding - gaps) / 3 images
                            height: (SCREEN_WIDTH - 48 - 24) / 3,
                        }}
                    >
                        <Image
                            source={A.add}
                            style={{
                                width: 60,
                                height: 60,
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
